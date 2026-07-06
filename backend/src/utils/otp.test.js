import { normalizeMobileNumber } from './otp.js';

const EXPECTED = '+201012345678';
let passed = 0;
let failed = 0;

function test(label, input, expected) {
  const result = normalizeMobileNumber(input);
  if (result === expected) {
    console.log(`  PASS  ${label} → ${result}`);
    passed++;
  } else {
    console.log(`  FAIL  ${label} → got "${result}", expected "${expected}"`);
    failed++;
  }
}

console.log('\nnormalizeMobileNumber tests:\n');

test('local format (01012345678)', '01012345678', EXPECTED);
test('already normalized (+201012345678)', '+201012345678', EXPECTED);
test('missing plus (201012345678)', '201012345678', EXPECTED);
test('00-prefixed (00201012345678)', '00201012345678', EXPECTED);
test('spaces (010 1234 5678)', '010 1234 5678', EXPECTED);
test('dashes (010-1234-5678)', '010-1234-5678', EXPECTED);
test('idempotency (already normalized ×2)', normalizeMobileNumber(EXPECTED), EXPECTED);
test('weird spacing (+20 10 1234 5678)', '+20 10 1234 5678', EXPECTED);

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
