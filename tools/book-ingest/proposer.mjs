import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { hasExistingContent, BRANCHES_WITH_LESSONS, classifyText } from './taxonomy.mjs';
import { segmentByHeadings } from './segments.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const LESSONS_PATH = resolve(__dirname, '../../backend/seed/lessons.js');

/**
 * Load existing lessons from lessons.js.
 * Returns Map<branch_name, lessons[]>.
 */
function loadExistingLessons() {
  const code = readFileSync(LESSONS_PATH, 'utf-8');
  const lessons = eval(code.replace('export const seedLessons = ', ''));
  const map = new Map();
  for (const entry of lessons) {
    map.set(entry.branch_name, entry.lessons);
  }
  return map;
}

/**
 * For a branch that already has lessons (9 branches), map extracted book
 * chapters to either an existing lesson or a proposed new one.
 * 
 * @param {string} branchName
 * @param {{ page: number, text: string }[]} pages
 * @returns {{ existing_match: number, proposed: { title, description, order, source_pages }[] }}
 */
function mapExistingBranch(branchName, pages) {
  const existingLessons = loadExistingLessons().get(branchName) || [];
  const existingTitles = new Set(existingLessons.map(l => l.title.toLowerCase()));

  const result = {
    branch_name: branchName,
    existing_lessons: existingLessons.map(l => ({
      title: l.title,
      description: l.description,
      matched_pages: findMatchingPages(l.title, l.description, pages),
      resources: l.resources,
    })),
    proposed_new: [],
  };

  // Propose new lessons from text that doesn't match existing titles
  const proposed = proposeFromContent(branchName, pages, existingTitles);
  result.proposed_new = proposed;

  return result;
}

/**
 * For branches with no existing content, propose lesson titles from the book text.
 * 
 * @param {{ page: number, text: string }[]} pages
 * @returns {{ title, description, order, source_pages }[]}
 */
function proposeEmptyBranch(branchName, pages) {
  return proposeFromContent(branchName, pages, new Set());
}

/**
 * Analyze book pages and propose lesson titles.
 * Uses simple heuristics: chapter headings, topic sentences, section breaks.
 */
function proposeFromContent(branchName, pages, existingTitles) {
  const proposed = [];
  let order = 1;

  // Concatenate all text for analysis
  const allText = pages.map(p => p.text).join('\n\n');
  const paragraphs = allText
    .split(/\n\n+/)
    .filter(p => p.trim().length > 50);

  if (paragraphs.length === 0) return proposed;

  // Try to detect chapter/section headings (all caps or numbered headings)
  const headingLines = [];
  for (const para of paragraphs) {
    const lines = para.split('\n').filter(l => l.trim());
    for (const line of lines) {
      const t = line.trim();
      // All-caps heading or numbered heading like "1. Management"
      if (
        (t === t.toUpperCase() && t.length > 10 && t.length < 100) ||
        /^\d+[\.\)]\s+[A-Z\u0600-\u06FF]/.test(t) ||
        /^Chapter\s+\d+/i.test(t)
      ) {
        headingLines.push(t);
      }
    }
  }

  // If we found clear headings, use them
  if (headingLines.length >= 3) {
    for (const h of headingLines) {
      const title = cleanTitle(h);
      if (!title || existingTitles.has(title.toLowerCase())) continue;
      if (proposed.some(p => p.title === title)) continue;
      if (title.length < 5 || title.length > 120) continue;

      // Find the paragraph(s) under this heading
      const sectionText = findSectionForHeading(h, paragraphs);
      proposed.push({
        title,
        description: sectionText
          ? sectionText.slice(0, 200) + (sectionText.length > 200 ? '...' : '')
          : `${branchName} lesson covering ${title.toLowerCase()}.`,
        order: order++,
        source_pages: findSourcePages(h, pages),
      });
    }
    return proposed;
  }

  // Fallback: use paragraph topic sentences
  const MIN_PROPOSED = 3;
  const MAX_PROPOSED = 6;
  const seen = new Set(existingTitles);

  for (const para of paragraphs) {
    if (proposed.length >= MAX_PROPOSED) break;
    const firstSentence = para.split(/[.!?\n]/)[0].trim();
    if (!firstSentence || firstSentence.length < 15 || firstSentence.length > 100) continue;

    const title = firstSentence.replace(/^The\s+/i, '').replace(/^This\s+chapter\s+/i, '').trim();
    if (!title || seen.has(title.toLowerCase())) continue;
    if (proposed.some(p => p.title === title)) continue;

    proposed.push({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: firstSentence.slice(0, 150) + (firstSentence.length > 150 ? '...' : ''),
      order: order++,
      source_pages: [],
    });
    seen.add(title.toLowerCase());
  }

  // Pad with generic titles if too few proposals
  const genericTitles = [
    'Introduction to ' + branchName,
    'Core Concepts in ' + branchName,
    'Advanced Topics in ' + branchName,
    'Clinical Applications of ' + branchName,
    'Practical Skills for ' + branchName,
  ];
  for (const gt of genericTitles) {
    if (proposed.length >= MIN_PROPOSED) break;
    if (existingTitles.has(gt.toLowerCase())) continue;
    if (proposed.some(p => p.title === gt)) continue;
    proposed.push({ title: gt, description: `Key concepts and clinical skills in ${branchName}.`, order: order++, source_pages: [] });
  }

  return proposed;
}

/**
 * Find which existing lesson(s) a page chunk matches.
 */
function findMatchingPages(lessonTitle, lessonDesc, pages) {
  const keywords = (lessonTitle + ' ' + lessonDesc).toLowerCase().split(/\s+/).filter(w => w.length > 4);
  const matched = [];
  for (const page of pages) {
    const text = page.text.toLowerCase();
    const matchCount = keywords.filter(k => text.includes(k)).length;
    if (matchCount >= 2) {
      matched.push(page.page);
    }
  }
  return matched;
}

/**
 * Find the text following a heading in the paragraphs array.
 */
function findSectionForHeading(heading, paragraphs) {
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].includes(heading) && i + 1 < paragraphs.length) {
      return paragraphs[i + 1];
    }
  }
  return null;
}

/**
 * Find which source pages a heading appears on.
 */
function findSourcePages(heading, pages) {
  const lower = heading.toLowerCase().slice(0, 40);
  return pages.filter(p => p.text.toLowerCase().includes(lower)).map(p => p.page);
}

/**
 * Clean a heading into a nice lesson title.
 */
function cleanTitle(raw) {
  return raw
    .replace(/^Chapter\s+\d+[\s:]*/i, '')
    .replace(/^\d+[\.\)]\s*/, '')
    .replace(/[#*_]/g, '')
    .trim();
}

/**
 * Main proposal function for a single book entry.
 * 
 * @param {object} bookEntry - { filename, specialty, branch, pages, stats, book_text? }
 * @returns {object} Proposal object ready for review.json
 */
export function propose(bookEntry) {
  const { branch, pages } = bookEntry;
  const hasContent = hasExistingContent(branch);

  let branchData;
  if (hasContent) {
    branchData = mapExistingBranch(branch, pages);
  } else {
    const proposed = proposeEmptyBranch(branch, pages);
    branchData = {
      branch_name: branch,
      existing_lessons: [],
      proposed_new: proposed,
    };
  }

  return {
    filename: bookEntry.filename,
    specialty: bookEntry.specialty,
    branch: bookEntry.branch,
    has_existing_content: hasContent,
    has_content_gaps: bookEntry.stats.flagged > 0,
    needs_manual_transcription: bookEntry.pages.some(p => p.needs_manual_transcription),
    extraction_stats: bookEntry.stats,
    branch_data: branchData,
    approved: null, // Set by human reviewer
  };
}

/**
 * Handle a book marked as "mixed": segment by headings, classify each segment,
 * aggregate by branch, generate lesson proposals per branch.
 *
 * Returns an array of proposal entries (one per detected branch with aggregate score > 0.15).
 *
 * @param {string} filename
 * @param {string} specialty — from CSV (may be empty for mixed books)
 * @param {{ page: number, text: string }[]} pages
 * @param {{ digital: number, ocr: number, flagged: number, total: number }} stats
 * @returns {object[]}
 */
export function classifyMixedBook(filename, specialty, pages, stats) {
  const segments = segmentByHeadings(pages);
  const hasContentIssues = stats.flagged > 0 || pages.some(p => p.needs_manual_transcription);

  if (segments.length === 0) {
    // Fallback: classify the whole book as one blob
    const allText = pages.map(p => p.text).join(' ');
    const guesses = classifyText(allText, 3);
    if (guesses.length === 0) {
      return [{
        filename, specialty: specialty || '(unclassified)', branch: '(unable to classify)',
        has_existing_content: false, has_content_gaps: hasContentIssues,
        needs_manual_transcription: pages.some(p => p.needs_manual_transcription),
        extraction_stats: stats,
        error: 'Could not classify any branch from book content',
        approved: null,
      }];
    }
    return guesses.map(guess => ({
      filename,
      specialty: guess.specialty,
      branch: guess.branch,
      is_mixed: true,
      classification_score: guess.score,
      classified_segments: ['entire book'],
      classification_details: { keyword_matches: guess.keyword_matches, root_matches: guess.root_matches },
      has_existing_content: hasExistingContent(guess.branch),
      has_content_gaps: hasContentIssues,
      needs_manual_transcription: pages.some(p => p.needs_manual_transcription),
      extraction_stats: stats,
      branch_data: {
        branch_name: guess.branch,
        existing_lessons: [],
        proposed_new: proposeFromContent(guess.branch, pages, new Set()),
      },
      approved: null,
    }));
  }

  // Classify each segment individually
  const segmentClassifications = segments.map(seg => {
    const guesses = classifyText(seg.text, 2);
    return { ...seg, guesses };
  });

  // Aggregate: group segments by their top guess, sum scores
  const branchAgg = new Map();
  for (const sc of segmentClassifications) {
    if (sc.guesses.length === 0) continue;
    const top = sc.guesses[0];
    if (!branchAgg.has(top.branch)) {
      branchAgg.set(top.branch, {
        branch: top.branch, specialty: top.specialty, category: top.category,
        totalScore: 0, segments: [], allKeywordMatches: new Set(), allRootMatches: new Set(),
      });
    }
    const entry = branchAgg.get(top.branch);
    entry.totalScore += top.score;
    entry.segments.push({ heading: sc.heading, pages: `${sc.start_page}-${sc.end_page}` });
    top.keyword_matches.forEach(k => entry.allKeywordMatches.add(k));
    top.root_matches.forEach(r => entry.allRootMatches.add(r));
  }

  // Sort by aggregate score descending, filter by threshold
  const sorted = [...branchAgg.values()]
    .map(e => ({ ...e, avgScore: e.totalScore / segmentClassifications.length }))
    .filter(e => e.avgScore > 0.15)
    .sort((a, b) => b.avgScore - a.avgScore);

  if (sorted.length === 0) {
    return [{
      filename, specialty: specialty || '(unclassified)', branch: '(unable to classify)',
      has_existing_content: false, has_content_gaps: hasContentIssues,
      error: `Segmented into ${segments.length} sections but no branch scored above 0.15 threshold`,
      segment_details: segmentClassifications.map(s =>
        `${s.heading}: ${s.guesses.map(g => `${g.branch}(${g.score})`).join(', ')}`
      ),
      approved: null,
    }];
  }

  // Generate proposals for each detected branch
  return sorted.map(agg => {
    // Collect the pages that belong to the matched segments
    const segmentPageRanges = agg.segments.map(s => {
      const [start, end] = s.pages.split('-').map(Number);
      return { start, end };
    });
    const branchPages = pages.filter(p =>
      segmentPageRanges.some(r => p.page >= r.start && p.page <= r.end)
    );
    const usablePages = branchPages.length > 0 ? branchPages : pages;

    return {
      filename,
      specialty: agg.specialty,
      branch: agg.branch,
      is_mixed: true,
      classification_score: Math.round(agg.avgScore * 100) / 100,
      classified_segments: agg.segments.map(s => `${s.heading} (pages ${s.pages})`),
      classification_details: {
        keyword_matches: [...agg.allKeywordMatches],
        root_matches: [...agg.allRootMatches],
      },
      has_existing_content: hasExistingContent(agg.branch),
      has_content_gaps: hasContentIssues,
      needs_manual_transcription: pages.some(p => p.needs_manual_transcription),
      extraction_stats: stats,
      branch_data: {
        branch_name: agg.branch,
        existing_lessons: [],
        propose_new: proposeFromContent(agg.branch, usablePages, new Set()),
      },
      approved: null,
    };
  });
}
