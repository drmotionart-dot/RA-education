import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const LESSONS_PATH = resolve(__dirname, '../../backend/seed/lessons.js');

/**
 * Load existing lessons.js content.
 * Returns { entries: object[] }
 */
function loadLessonsFile() {
  const code = readFileSync(LESSONS_PATH, 'utf-8');
  const match = code.match(/export const seedLessons\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Could not find seedLessons export in lessons.js');
  }
  const entries = eval(match[1]);
  return { entries };
}

/**
 * Build a dedup key from branch_name + title (lowercased, normalized).
 */
function dedupKey(branchName, title) {
  return `${branchName}::${title.toLowerCase().trim()}`;
}

/**
 * Commit approved entries from a review file into lessons.js.
 * 
 * For each approved book entry:
 *   - If the branch has existing_lessons: append proposed_new lessons that don't
 *     conflict with existing titles.
 *   - If the branch has no existing lessons: create a new branch entry with all
 *     proposed lessons.
 *   - If a lesson has written_lesson, include it in the lesson data.
 * 
 * @param {object[]} entries - The entries array from the review.json (approved: true only)
 * @returns {object} { added_branches: number, added_lessons: number, skipped_duplicates: number }
 */
export function commitApproved(entries) {
  const { entries: existingEntries } = loadLessonsFile();
  const existingDedup = new Set(
    existingEntries.flatMap(e => e.lessons.map(l => dedupKey(e.branch_name, l.title)))
  );

  const newBranchEntries = [];
  let addedLessons = 0;
  let skippedDuplicates = 0;

  // Only process approved entries
  const approvedEntries = entries.filter(e => e.approved === true);

  for (const entry of approvedEntries) {
    if (!entry.branch_data || !entry.branch_data.proposed_new) continue;

    const { branch, branch_data } = entry;
    const proposedLessons = branch_data.proposed_new.filter(p => {
      const key = dedupKey(branch, p.title);
      if (existingDedup.has(key)) {
        skippedDuplicates++;
        return false;
      }
      existingDedup.add(key);
      return true;
    });

    if (proposedLessons.length === 0) continue;

    // Check if this branch already exists in current data
    const existingBranch = existingEntries.find(e => e.branch_name === branch);

    if (existingBranch) {
      // Append to existing branch
      const maxOrder = existingBranch.lessons.reduce((max, l) => Math.max(max, l.order || 0), 0);
      for (let i = 0; i < proposedLessons.length; i++) {
        const p = proposedLessons[i];
        const lesson = {
          title: p.title,
          description: p.description || `Lesson covering ${p.title.toLowerCase()}.`,
          duration_minutes: 45,
          order: maxOrder + i + 1,
          tags: extractTags(p.title, branch),
          resources: p.resources || [],
        };
        if (p.written_lesson) lesson.written_lesson = p.written_lesson;
        existingBranch.lessons.push(lesson);
        addedLessons++;
      }
    } else {
      // Create new branch entry
      const lessons = proposedLessons.map((p, i) => {
        const lesson = {
          title: p.title,
          description: p.description || `Lesson covering ${p.title.toLowerCase()}.`,
          duration_minutes: 45,
          order: i + 1,
          tags: extractTags(p.title, branch),
          resources: p.resources || [],
        };
        if (p.written_lesson) lesson.written_lesson = p.written_lesson;
        return lesson;
      });
      newBranchEntries.push({ branch_name: branch, lessons });
      addedLessons += lessons.length;
    }
  }

  // Write back to lessons.js
  const allEntries = [...existingEntries, ...newBranchEntries];
  const newCode = `/*\n  Seed lessons — 3 per branch, each with embedded resources.\n  Branch _ids are filled in at seed time by run.js.\n*/\nexport const seedLessons = ${JSON.stringify(allEntries, null, 2)};\n`;
  writeFileSync(LESSONS_PATH, newCode, 'utf-8');

  return {
    added_branches: newBranchEntries.length,
    added_lessons: addedLessons,
    skipped_duplicates: skippedDuplicates,
  };
}

/**
 * Rough tag extraction from title + branch name.
 */
function extractTags(title, branch) {
  const words = [...new Set(
    (title + ' ' + branch)
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['this', 'that', 'with', 'from', 'have', 'been', 'into', 'over', 'their'].includes(w))
  )];
  return words.slice(0, 5);
}

/**
 * Quick summary of what will be committed (dry run).
 */
export function dryRun(entries) {
  const { entries: existingEntries } = loadLessonsFile();
  const existingDedup = new Set(
    existingEntries.flatMap(e => e.lessons.map(l => dedupKey(e.branch_name, l.title)))
  );

  const approved = entries.filter(e => e.approved === true);
  const stats = { new_branches: 0, new_lessons: 0, skipped: 0 };

  for (const entry of approved) {
    if (!entry.branch_data?.proposed_new) continue;
    const existingBranch = existingEntries.find(e => e.branch_name === entry.branch);
    if (!existingBranch) {
      stats.new_branches++;
    }
    const newOnes = entry.branch_data.proposed_new.filter(p => !existingDedup.has(dedupKey(entry.branch, p.title)));
    stats.skipped += entry.branch_data.proposed_new.length - newOnes.length;
    stats.new_lessons += newOnes.length;
  }

  return stats;
}
