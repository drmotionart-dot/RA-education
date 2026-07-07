/**
 * Sync target_vectors from expanded files back to source files.
 * The expanded files have the correct vectors (after manual edits).
 * The source files must be updated so the generator doesn't overwrite them.
 */
import { fileURLToPath, pathToFileURL } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PAIRS = [
  { src: 'seed/survey/survey-specialty-doctor.js',        expanded: 'seed/survey/survey-specialty-doctor.expanded.js',        key: 'doctor_specialty_graph' },
  { src: 'seed/survey/survey-specialty-nurse.js',         expanded: 'seed/survey/survey-specialty-nurse.expanded.js',          key: 'nurse_specialty_graph' },
  { src: 'seed/survey/survey-path-doctor.js',             expanded: 'seed/survey/survey-path-doctor.expanded.js',               key: 'doctor_path_graph' },
  { src: 'seed/survey/survey-path-nurse.js',              expanded: 'seed/survey/survey-path-nurse.expanded.js',                key: 'nurse_path_graph' },
];

for (const { src, expanded, key } of PAIRS) {
  const srcPath  = resolve(ROOT, src);
  const expPath  = resolve(ROOT, expanded);
  const srcURL   = pathToFileURL(srcPath).href;
  const expURL   = pathToFileURL(expPath).href;

  const srcContent = readFileSync(srcPath, 'utf-8');
  const expContent = readFileSync(expPath, 'utf-8');

  // Parse the expanded file to get the target_vectors
  const expMod = await import(expURL);
  const expData = expMod[key];
  const targetVectors = expData.target_vectors;
  const tvJson = JSON.stringify(targetVectors, null, 2);

  // Replace the target_vectors section in the source file
  const startMarker = 'target_vectors:';
  const startIdx = srcContent.indexOf(startMarker);
  if (startIdx === -1) {
    console.error(`[SKIP] ${src}: no target_vectors found`);
    continue;
  }

  // Find where the target_vectors value ends (the next top-level key or closing brace)
  // We need to find the matching closing bracket
  const valStart = srcContent.indexOf('[', startIdx);
  if (valStart === -1) {
    console.error(`[SKIP] ${src}: no array start after target_vectors`);
    continue;
  }

  // Find the matching closing bracket
  let depth = 0;
  let valEnd = valStart;
  for (let i = valStart; i < srcContent.length; i++) {
    if (srcContent[i] === '[') depth++;
    else if (srcContent[i] === ']') depth--;
    if (depth === 0) { valEnd = i + 1; break; }
  }

  const before = srcContent.slice(0, valStart);
  const after  = srcContent.slice(valEnd);

  const newContent = before + tvJson + after;
  writeFileSync(srcPath, newContent, 'utf-8');
  console.log(`[OK] ${src}: target_vectors synced (${targetVectors.length} entries)`);
}

console.log('\nDone. Run generate-graphs.mjs to regenerate expanded files.');
