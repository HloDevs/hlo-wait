import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read raw data files directly for independent testing
const reservedList = [
  'rook', 'hlo', 'donum', 'ravi', 'packiam', 'krishna', 'radha', 'links', 'dots',
  'recruit', 'dossier', 'gtm', 'pulse', 'signal', 'ranker'
];

const restrictedWords = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../lib/handles/data/restricted-words.json'), 'utf-8')
);

console.log(`\n========================================`);
console.log(`🧪 Hlo Handle Governance Verification`);
console.log(`========================================\n`);

// 1. Verify restricted list count
console.log(`1. Testing restricted word count...`);
console.log(`   Total restricted entries: ${restrictedWords.length}`);
assert(restrictedWords.length >= 2000, `Expected at least 2000 words, got ${restrictedWords.length}`);
console.log(`   ✅ PASS: Restricted entries >= 2000 (actual: ${restrictedWords.length})`);

// 2. Test imports and runtime module via Node
import('../lib/handles/index.ts').then((handlesModule) => {
  const { validateHandle, isHandleReserved, isHandleRestricted, getRestrictedWordsCount } = handlesModule;

  console.log(`\n2. Testing memory loaded count...`);
  const loadedCount = getRestrictedWordsCount();
  assert(loadedCount >= 2000, `Loaded count must be >= 2000, got ${loadedCount}`);
  console.log(`   ✅ PASS: Memory-loaded restricted count is ${loadedCount}`);

  console.log(`\n3. Testing required Reserved Handles...`);
  for (const name of reservedList) {
    const res = validateHandle(name);
    assert.strictEqual(res.status, 'RESERVED', `Handle '${name}' should be RESERVED`);
    assert.strictEqual(res.isValid, false, `Handle '${name}' should not be valid for reservation`);
    assert(isHandleReserved(name), `isHandleReserved('${name}') should return true`);
    console.log(`   ✅ Reserved handle '${name}' successfully blocked with: "${res.error}"`);
  }

  console.log(`\n4. Testing System Route Handles...`);
  const systemRoutes = ['api', 'admin', 'login', 'oauth', 'settings', 'dashboard', 'static', 'root', 'webhook'];
  for (const route of systemRoutes) {
    const res = validateHandle(route);
    assert.strictEqual(res.status, 'RESTRICTED', `System route '${route}' should be RESTRICTED`);
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(isHandleRestricted(route).restricted, true);
    console.log(`   ✅ System route '${route}' blocked as restricted`);
  }

  console.log(`\n5. Testing Bad Words and Profanities...`);
  const profanities = ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'nigger', 'faggot', 'whore', 'nazi'];
  for (const word of profanities) {
    const res = validateHandle(word);
    assert.strictEqual(res.status, 'RESTRICTED', `Profanity '${word}' should be RESTRICTED`);
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(isHandleRestricted(word).restricted, true);
    console.log(`   ✅ Profanity '${word}' blocked`);
  }

  console.log(`\n6. Testing Explicit Misspellings of bad words...`);
  const misspellings = [
    'fuk', 'fukk', 'b1tch', 'sh1t', 'a55hole', 'p0rn', 'fuuuck', 'shiiiit'
  ];
  for (const evasive of misspellings) {
    const res = validateHandle(evasive);
    assert.strictEqual(res.status, 'RESTRICTED', `Misspelling '${evasive}' should be RESTRICTED`);
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(isHandleRestricted(evasive).restricted, true);
    console.log(`   ✅ Explicit misspelling '${evasive}' blocked`);
  }

  console.log(`\n7. Testing Real Names (Ensuring NO false-positive restrictions)...`);
  const realNames = ['cassie', 'titus', 'anita', 'alex', 'jordan99', 'sarah', 'techie', 'pixelart', 'stellar', 'runner42'];
  for (const name of realNames) {
    const res = validateHandle(name);
    assert.strictEqual(res.status, 'VALID', `Legitimate name '${name}' should be VALID`);
    assert.strictEqual(res.isValid, true);
    console.log(`   ✅ Legitimate name '${name}' is allowed without false restriction`);
  }

  console.log(`\n8. Testing Invalid Syntax Handles...`);
  const invalidSyntax = ['a', 'ab', 'user@domain', 'hello world', 'a'.repeat(35), 'name_with_underscore'];
  for (const badSyntax of invalidSyntax) {
    const res = validateHandle(badSyntax);
    assert.strictEqual(res.status, 'INVALID_SYNTAX', `Input '${badSyntax}' should be INVALID_SYNTAX`);
    assert.strictEqual(res.isValid, false);
    console.log(`   ✅ Invalid syntax '${badSyntax}' rejected with: "${res.error}"`);
  }

  console.log(`\n9. Benchmarking performance across 10,000 checks...`);
  const startTime = performance.now();
  const testSet = ['alex', 'rook', 'fuck', 'b1tch', 'admin', 'jordan99', 'hlo', 'p0rn', 'random123', 'shiiiit', 'cassie'];
  const iterations = 10000;
  for (let i = 0; i < iterations; i++) {
    const word = testSet[i % testSet.length];
    validateHandle(word);
  }
  const totalMs = performance.now() - startTime;
  console.log(`   ⏱️ Executed ${iterations} handle validations in ${totalMs.toFixed(2)}ms (${(totalMs / iterations * 1000).toFixed(2)} µs / check)`);
  assert(totalMs < 200, `Benchmark took too long: ${totalMs}ms`);

  console.log(`\n🎉 ALL TESTS PASSED SUCCESSFULLY! Enterprise Handle Governance is operational.\n`);
}).catch((err) => {
  console.error('\n❌ Test execution failed:', err);
  process.exit(1);
});
