/**
 * CI regression test: verify no survey-graph target pairs exceed 0.95 similarity.
 *
 * Usage:  node scripts/verify-no-collisions.mjs
 *         DEBUG=1 node scripts/verify-no-collisions.mjs   (verbose output)
 *
 * Exit code 0 = pass (all pairs < 0.95 or on allowlist)
 * Exit code 1 = fail (one or more pairs ≥ 0.95 and not on allowlist)
 *
 * Allowlist: pairs documented as genuinely similar (Gulf-state neighbours,
 * structurally identical processes). Only add here after explicit
 * agreement that forced separation would be artificial.
 */

import { fileURLToPath, pathToFileURL } from 'url';
import { resolve, dirname } from 'path';
import { computeAxisWeights, computeEuclideanSimilarity } from '../src/utils/scoring.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// -- Allowlist of known-exception pairs (graph → ["A ↔ B"])
// These are documented as genuinely similar pathways where forcing
// differentiation would be artificial.
const ALLOWLIST = {
  // (none currently — all pairs are below 0.95 with real differentiation)
};

const GRAPHS = [
  { label: 'Doctor Specialty', file: resolve(ROOT, 'seed/survey/survey-specialty-doctor.expanded.js'), key: 'doctor_specialty_graph' },
  { label: 'Nurse Specialty',  file: resolve(ROOT, 'seed/survey/survey-specialty-nurse.expanded.js'),  key: 'nurse_specialty_graph' },
  { label: 'Doctor Path',      file: resolve(ROOT, 'seed/survey/survey-path-doctor.expanded.js'),       key: 'doctor_path_graph' },
  { label: 'Nurse Path',       file: resolve(ROOT, 'seed/survey/survey-path-nurse.expanded.js'),        key: 'nurse_path_graph' },
];

const THRESHOLD = 0.95;
const debug = !!process.env.DEBUG;

function makeKey(a, b) {
  return [a, b].sort().join(' ↔ ');
}

function isAllowed(graphLabel, key) {
  const list = ALLOWLIST[graphLabel];
  if (!list) return false;
  return list.some((entry) => makeKey(entry[0], entry[1]) === key);
}

async function main() {
  let totalFailures = 0;

  for (const { label, file, key } of GRAPHS) {
    const mod = await import(pathToFileURL(file).href);
    const graph = mod[key];
    const axes = graph.axes;
    const targetVectors = graph.target_vectors;
    const weights = computeAxisWeights(targetVectors, axes);

    let graphFailures = 0;

    for (let i = 0; i < targetVectors.length; i++) {
      for (let j = i + 1; j < targetVectors.length; j++) {
        const a = targetVectors[i];
        const b = targetVectors[j];
        const vecA = {};
        const vecB = {};
        for (const axis of axes) {
          vecA[axis] = a.axes?.[axis] ?? 0.5;
          vecB[axis] = b.axes?.[axis] ?? 0.5;
        }
        const sim = computeEuclideanSimilarity(vecA, vecB, axes, weights);

        if (sim >= THRESHOLD) {
          const pairKey = makeKey(a.specialty_name, b.specialty_name);
          if (isAllowed(label, pairKey)) {
            if (debug) {
              console.log(`[OK] ${label}: ${(sim * 100).toFixed(2)}% ${pairKey} (allowlisted)`);
            }
            continue;
          }
          console.log(`[FAIL] ${label}: ${(sim * 100).toFixed(2)}%  ${a.specialty_name}  ↔  ${b.specialty_name}`);
          graphFailures++;
          totalFailures++;
        }
      }
    }

    if (graphFailures > 0) {
      console.log(`  → ${label}: ${graphFailures} collision(s) ≥ ${THRESHOLD * 100}%`);
    } else if (debug) {
      console.log(`[PASS] ${label}: 0 collisions`);
    }
  }

  if (totalFailures > 0) {
    console.log(`\n❌ FAILED: ${totalFailures} collision(s) across all graphs`);
    process.exit(1);
  } else {
    console.log('✅ All graphs clean — zero collisions ≥ 95%');
  }
}

main().catch((e) => { console.error('Script error:', e); process.exit(1); });
