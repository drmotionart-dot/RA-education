/**
 * CI regression test: verify no survey-graph target pairs exceed similarity threshold.
 *
 * Usage:  node scripts/verify-no-collisions.mjs
 *         DEBUG=1 node scripts/verify-no-collisions.mjs   (verbose output)
 *         COLLISION_THRESHOLD=0.9 node scripts/verify-no-collisions.mjs
 *
 * Exit code 0 = pass (all pairs below threshold or on allowlist)
 * Exit code 1 = fail (one or more pairs exceed threshold and not on allowlist)
 *
 * Allowlist: pairs documented as genuinely similar (Gulf-state neighbours,
 * structurally identical processes). Only add here after explicit
 * agreement that forced separation would be artificial.
 */

import { fileURLToPath, pathToFileURL } from 'url';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { computeAxisWeights, computeEuclideanSimilarity, computeCosineSimilarity } from '../src/utils/scoring.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const ALLOWLIST = {};

const GRAPHS = [
  { label: 'Doctor Specialty', file: resolve(ROOT, 'seed/survey/survey-specialty-doctor.expanded.js'), key: 'doctor_specialty_graph', src: resolve(ROOT, 'seed/survey/survey-specialty-doctor.js') },
  { label: 'Nurse Specialty',  file: resolve(ROOT, 'seed/survey/survey-specialty-nurse.expanded.js'),  key: 'nurse_specialty_graph',  src: resolve(ROOT, 'seed/survey/survey-specialty-nurse.js') },
  { label: 'Doctor Path',      file: resolve(ROOT, 'seed/survey/survey-path-doctor.expanded.js'),       key: 'doctor_path_graph',      src: resolve(ROOT, 'seed/survey/survey-path-doctor.js') },
  { label: 'Nurse Path',       file: resolve(ROOT, 'seed/survey/survey-path-nurse.expanded.js'),        key: 'nurse_path_graph',       src: resolve(ROOT, 'seed/survey/survey-path-nurse.js') },
];

const THRESHOLD = parseFloat(process.env.COLLISION_THRESHOLD || '0.95');
const STRICT_COSINE = !!process.env.STRICT_COSINE;
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
  let totalEuclidean = 0;
  let totalCosine = 0;

  for (const { label, file, key, src } of GRAPHS) {
    const mod = await import(pathToFileURL(file).href);
    const graph = mod[key];
    const axes = graph.axes;
    const targetVectors = graph.target_vectors;
    const weights = computeAxisWeights(targetVectors, axes);

    let eucFailures = 0;
    let cosFailures = 0;

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
        const euc = computeEuclideanSimilarity(vecA, vecB, axes, weights);
        const cos = computeCosineSimilarity(vecA, vecB, axes, weights);
        const pairKey = makeKey(a.specialty_name, b.specialty_name);
        const allowed = isAllowed(label, pairKey);

        if (euc >= THRESHOLD && !allowed) {
          console.log(`[FAIL][EUCLIDEAN] ${label}: ${(euc * 100).toFixed(2)}%  ${a.specialty_name}  ↔  ${b.specialty_name}`);
          eucFailures++;
          totalEuclidean++;
        }

        if (euc >= THRESHOLD && !allowed) {
          console.log(`[FAIL][EUCLIDEAN] ${label}: ${(euc * 100).toFixed(2)}%  ${a.specialty_name}  ↔  ${b.specialty_name}`);
          eucFailures++;
          totalEuclidean++;
        } else if (debug && euc >= THRESHOLD && allowed) {
          console.log(`[OK][EUCLIDEAN] ${label}: ${(euc * 100).toFixed(2)}% ${pairKey} (allowlisted)`);
        }

        if (cos >= THRESHOLD && !allowed) {
          const tag = STRICT_COSINE ? '[FAIL]' : '[WARN]';
          const suffix = STRICT_COSINE ? '' : ' (cosine-only)';
          console.log(`${tag}[COSINE] ${label}: ${(cos * 100).toFixed(2)}%  ${a.specialty_name}  ↔  ${b.specialty_name}${suffix}`);
          cosFailures++;
          totalCosine++;
        } else if (debug && cos >= THRESHOLD && allowed) {
          console.log(`[OK][COSINE] ${label}: ${(cos * 100).toFixed(2)}% ${pairKey} (allowlisted)`);
        }
      }
    }

    const combined = eucFailures + cosFailures;
    if (eucFailures > 0) {
      console.log(`  → ${label}: ${eucFailures} Euclidean collision(s) ≥ ${THRESHOLD * 100}%`);
    }
    if (cosFailures > 0) {
      console.log(`  → ${label}: ${cosFailures} Cosine warning(s) ≥ ${THRESHOLD * 100}%${STRICT_COSINE ? ' [FAILING]' : ' [info only]'}`);
    }
    if (eucFailures === 0 && cosFailures === 0 && debug) {
      console.log(`[PASS] ${label}: 0 collisions (both metrics)`);
    }
  }

  if (totalEuclidean > 0) {
    console.log(`\n❌ FAILED: ${totalEuclidean} Euclidean collision(s) — exit 1`);
    process.exit(1);
  }
  if (STRICT_COSINE && totalCosine > 0) {
    console.log(`\n❌ FAILED (STRICT_COSINE): ${totalCosine} Cosine collision(s) — exit 1`);
    process.exit(1);
  }
  if (totalCosine > 0) {
    console.log(`\n⚠️  ${totalCosine} Cosine-only warning(s) — not failing (set STRICT_COSINE=1 to enforce)`);
  }
  console.log(`✅ Euclidean clean — zero Euclidean collisions ≥ ${THRESHOLD * 100}%`);
}

main().catch((e) => { console.error('Script error:', e); process.exit(1); });
