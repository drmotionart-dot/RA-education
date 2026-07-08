import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

/**
 * Write a review.json file for a batch of book proposals.
 * 
 * @param {string} reviewsDir - Path to reviews/ directory
 * @param {object[]} proposals - Array of proposal objects from proposer.mjs
 * @param {string} slug - Unique identifier for this review batch (e.g., timestamp or book name)
 * @returns {Promise<string>} Path to the written file
 */
export async function writeReview(reviewsDir, proposals, slug) {
  await mkdir(reviewsDir, { recursive: true });

  const review = {
    generated_at: new Date().toISOString(),
    total_books: proposals.length,
    instructions: {
      review_steps: [
        '1. Set "approved" to true/false for each book entry',
        '2. Edit or remove proposed_new lesson titles/descriptions as needed',
        '3. For entries with needs_manual_transcription: manually transcribe the flagged pages',
        '4. Add "written_lesson: String" to any lesson where you want rich text content from the book',
        '5. Set "approved: null" entries to true (keep) or false (discard)',
      ],
      commit_command: 'After saving this file, run: node index.mjs commit --review reviews/review_TIMESTAMP.json',
    },
    entries: proposals,
  };

  const filePath = resolve(reviewsDir, `review_${slug}.json`);
  await writeFile(filePath, JSON.stringify(review, null, 2), 'utf-8');
  return filePath;
}

/**
 * Parse a review.json file after human editing.
 * Validates that the structure is intact and returns the entries.
 */
export async function parseReview(filePath) {
  const { readFileSync } = await import('fs');
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  if (!data.entries || !Array.isArray(data.entries)) {
    throw new Error('Invalid review file: missing entries array');
  }
  return data.entries;
}
