import { spawnSync } from 'node:child_process';
import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview, applySolution } from './solutions.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const labs = ['availability', 'pricing', 'substitutions'];
const excluded = new Set(['.git', 'node_modules', '.workshop-backups', 'coverage', 'test-results', 'playwright-report']);
function run(cwd, files, expectedPass, label) {
  const result = spawnSync(process.execPath, ['--test', '--test-reporter=tap', ...files], { cwd, encoding: 'utf8', timeout: 120000 });
  if (result.error) throw result.error;
  const output = result.stdout + result.stderr;
  const passed = result.status === 0;
  const failures = output.match(/^not ok /gm)?.length ?? 0;
  const assertions = output.match(/^\s+code: 'ERR_ASSERTION'/gm)?.length ?? 0;
  if (passed !== expectedPass || result.signal || (!passed && (result.status !== 1 || failures === 0 || assertions !== failures))) {
    throw new Error(`${label}: expected ${expectedPass ? 'PASS' : 'assertion FAIL'}, got ${result.status}\n${output}`);
  }
  console.log(`${label}: ${passed ? 'PASS' : 'EXPECTED ASSERTION FAIL'}`);
}
try {
  const baseline = (await readdir(join(root, 'test'))).filter(name => name.endsWith('.test.js')).map(name => `test/${name}`);
  for (let mask = 0; mask < 8; mask++) {
    const copy = await mkdtemp(join(tmpdir(), `freshcart matrix ${mask}-`));
    try {
      for (const entry of await readdir(root, { withFileTypes: true })) {
        if (excluded.has(entry.name)) continue;
        if (entry.isSymbolicLink()) throw new Error(`Refusing symlink in source tree: ${entry.name}`);
        await cp(join(root, entry.name), join(copy, entry.name), { recursive: true, dereference: false });
      }
      for (let index = 0; index < 3; index++) {
        if (mask & (1 << index)) await applySolution(await preview(copy, `lab${index + 1}`), { confirmed: true });
      }
      const combination = [1, 2, 4].map(bit => mask & bit ? '1' : '0').join('');
      run(copy, baseline, true, `${combination} baseline`);
      for (let index = 0; index < 3; index++) {
        run(copy, [`acceptance/${labs[index]}.test.js`], Boolean(mask & (1 << index)), `${combination} lab${index + 1}`);
      }
    } finally {
      await rm(copy, { recursive: true, force: true });
    }
  }
  console.log('PASS all 8 combinations in disposable copies. Active starter source was not changed.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
