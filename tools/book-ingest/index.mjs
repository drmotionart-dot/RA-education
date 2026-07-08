#!/usr/bin/env node
/**
 * Book Ingestion CLI — Extract, Propose, Review, Commit.
 *
 * Usage:
 *   node index.mjs extract --manifest manifest.csv --out reviews/
 *   node index.mjs commit   --review reviews/review_TIMESTAMP.json [--dry-run]
 *   node index.mjs validate --manifest manifest.csv
 *   node index.mjs taxonomy                              # dump all known branches
 */

import { readFile, readdir } from 'fs/promises';
import { resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

import { loadTaxonomy, validateBranch, getAllBranches, getEmptyBranches, hasExistingContent } from './taxonomy.mjs';
import { extractPages, destroyOcrWorker } from './extract.mjs';
import { propose, classifyMixedBook } from './proposer.mjs';
import { writeReview, parseReview } from './output.mjs';
import { commitApproved, dryRun } from './commit.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = resolve(__dirname, 'pages');
const REVIEWS_DIR = resolve(__dirname, 'reviews');

// ── Help ──

function printHelp() {
  console.log(`
Book Ingestion CLI — v1.0.0

COMMANDS:

  extract  Extract text from PDFs and generate a review file.
           Usage: node index.mjs extract --folder <path> --manifest <csv> [--out <dir>]
             --folder    Path to folder containing PDF files
             --manifest  Path to CSV: filename,specialty,branch
             --out       Output directory for review file (default: reviews/)

  commit   Commit approved entries to lessons.js.
           Usage: node index.mjs commit --review <path> [--dry-run]
             --review   Path to a review.json file
             --dry-run  Show what would be added without writing

  validate  Validate a manifest CSV against the known taxonomy.
            Usage: node index.mjs validate --manifest <csv>

  taxonomy  Print the complete branch taxonomy (150 branches).
            Usage: node index.mjs taxonomy

  help      Show this message.
`);
}

// ── CSV Parser ──

async function parseCsv(filePath) {
  const rows = [];
  const stream = createReadStream(filePath, 'utf-8');
  const rl = createInterface({ input: stream, crlfDelay: Infinity });
  let firstLine = true;
  for await (const line of rl) {
    if (!line.trim()) continue;
    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    if (parts.length < 3) continue;
    // Skip header row if first column doesn't look like a filename
    if (firstLine) {
      firstLine = false;
      // Heuristic: header row won't have a file extension in col 1
      if (!parts[0].includes('.') || parts[0].toLowerCase() === 'filename') continue;
    }
    rows.push({ filename: parts[0], specialty: parts[1], branch: parts[2] });
  }
  return rows;
}

// ── Validate Command ──

async function cmdValidate(manifestPath) {
  const rows = await parseCsv(manifestPath);
  let valid = 0, invalid = 0;
  for (const row of rows) {
    // Mixed books don't need a specific branch validation
    if (row.branch.toLowerCase() === 'mixed') {
      valid++;
      continue;
    }
    const result = validateBranch(row.specialty, row.branch);
    if (result.valid) {
      valid++;
    } else {
      console.error(`  ✗ ${row.filename}: ${result.error}`);
      invalid++;
    }
  }
  console.log(`\n${valid} valid, ${invalid} invalid out of ${rows.length} entries.`);
  process.exit(invalid > 0 ? 1 : 0);
}

// ── Taxonomy Command ──

function cmdTaxonomy() {
  const tax = loadTaxonomy();
  console.log('\nDOCTOR SPECIALTIES:');
  for (const [spec, branches] of Object.entries(tax.doctor)) {
    console.log(`  ${spec} (${branches.length} branches):`);
    for (const b of branches) {
      const flag = hasExistingContent(b) ? ' ✓ has lessons' : '';
      console.log(`    - ${b}${flag}`);
    }
  }
  console.log('\nNURSE SPECIALTIES:');
  for (const [spec, branches] of Object.entries(tax.nurse)) {
    console.log(`  ${spec} (${branches.length} branches):`);
    for (const b of branches) {
      const flag = hasExistingContent(b) ? ' ✓ has lessons' : '';
      console.log(`    - ${b}${flag}`);
    }
  }
  console.log(`\nTotal: ${getAllBranches().length} branches (${getEmptyBranches().length} empty, ${[...new Set(getAllBranches().filter(b => hasExistingContent(b)))].length} with content)`);
}

// ── Extract Command ──

async function cmdExtract(folderPath, manifestPath, outDir) {
  const rows = await parseCsv(manifestPath);
  console.log(`\nProcessing ${rows.length} books...\n`);

  const proposals = [];
  let processed = 0;

  for (const row of rows) {
    processed++;
    const pdfPath = resolve(folderPath, row.filename);
    console.log(`[${processed}/${rows.length}] ${row.filename} → ${row.specialty} / ${row.branch}`);

    // Read PDF
    let pdfBuffer;
    try {
      pdfBuffer = await readFile(pdfPath);
    } catch {
      console.error(`  ✗ Could not read file: ${pdfPath}`);
      proposals.push({
        filename: row.filename,
        specialty: row.specialty,
        branch: row.branch,
        has_existing_content: hasExistingContent(row.branch),
        error: 'File not found',
        approved: null,
      });
      continue;
    }

    // Validate branch (skip for mixed books)
    if (row.branch.toLowerCase() !== 'mixed') {
      const validation = validateBranch(row.specialty, row.branch);
      if (!validation.valid) {
        console.error(`  ✗ ${validation.error}`);
        proposals.push({
          filename: row.filename,
          specialty: row.specialty,
          branch: row.branch,
          has_existing_content: hasExistingContent(row.branch),
          error: validation.error,
          approved: null,
        });
        continue;
      }
    }

    // Extract text
    const bookSlug = basename(row.filename, extname(row.filename)).replace(/[^a-zA-Z0-9_-]/g, '_');
    const { pages, stats } = await extractPages(pdfBuffer, PAGES_DIR, bookSlug);
    console.log(`    Pages: ${stats.digital} digital, ${stats.ocr} OCR, ${stats.flagged} flagged`);

    // Propose lessons (mixed or standard)
    if (row.branch.toLowerCase() === 'mixed') {
      const mixedProposals = classifyMixedBook(row.filename, row.specialty, pages, stats);
      proposals.push(...mixedProposals);
      console.log(`    → Classified as ${mixedProposals.length} branches:`);
      for (const mp of mixedProposals) {
        console.log(`      ${mp.branch} (score: ${mp.classification_score || 'N/A'})`);
      }
    } else {
      const proposal = propose({ ...row, pages, stats });
      proposals.push(proposal);
    }
  }

  // Write review file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const reviewPath = await writeReview(outDir || REVIEWS_DIR, proposals, timestamp);
  console.log(`\nReview file written → ${reviewPath}`);
  console.log('Edit this file, then run: node index.mjs commit --review ' + reviewPath);

  // Cleanup
  await destroyOcrWorker();
}

// ── Commit Command ──

async function cmdCommit(reviewPath, isDryRun) {
  const entries = await parseReview(reviewPath);
  const total = entries.length;
  const approved = entries.filter(e => e.approved === true).length;
  const rejected = entries.filter(e => e.approved === false).length;
  const pending = entries.filter(e => e.approved !== true && e.approved !== false).length;

  console.log(`\nReview summary: ${total} entries, ${approved} approved, ${rejected} rejected, ${pending} pending\n`);

  if (approved === 0) {
    console.log('No approved entries to commit.');
    return;
  }

  if (isDryRun) {
    const stats = dryRun(entries);
    console.log('DRY RUN — no changes written.');
    console.log(`Would add: ${stats.new_branches} new branches, ${stats.new_lessons} new lessons`);
    console.log(`Would skip: ${stats.skipped} duplicates`);
    return;
  }

  const stats = commitApproved(entries);
  console.log(`Committed: ${stats.added_branches} new branches, ${stats.added_lessons} new lessons`);
  console.log(`Skipped: ${stats.skipped_duplicates} duplicates`);
  console.log(`\nNext step: npm run seed (in backend/)`);
}

// ── CLI Dispatch ──

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
    printHelp();
    return;
  }

  const cmd = args[0];
  const parsed = parseArgs(args.slice(1));

  switch (cmd) {
    case 'extract':
      if (!parsed.folder || !parsed.manifest) {
        console.error('Error: --folder and --manifest are required for extract');
        process.exit(1);
      }
      await cmdExtract(parsed.folder, parsed.manifest, parsed.out);
      break;

    case 'commit':
      if (!parsed.review) {
        console.error('Error: --review is required for commit');
        process.exit(1);
      }
      await cmdCommit(parsed.review, parsed['dry-run'] === 'true');
      break;

    case 'validate':
      if (!parsed.manifest) {
        console.error('Error: --manifest is required for validate');
        process.exit(1);
      }
      await cmdValidate(parsed.manifest);
      break;

    case 'taxonomy':
      cmdTaxonomy();
      break;

    default:
      console.error(`Unknown command: ${cmd}`);
      printHelp();
      process.exit(1);
  }
}

/**
 * Poor man's arg parser: --key value or --flag
 */
function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        result[key] = args[i + 1];
        i++;
      } else {
        result[key] = 'true';
      }
    }
  }
  return result;
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
