import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview, applySolution, safeRelative } from '../scripts/solutions.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
async function fixture(t) {
  const path = await mkdtemp(join(tmpdir(), 'freshcart recovery space-'));
  t.after(() => rm(path, { recursive: true, force: true }));
  for (const directory of ['src', 'public', 'solutions']) await cp(join(root, directory), join(path, directory), { recursive: true });
  return path;
}
test('recovery: preview/refusal are read-only; application backs up edits and preserves unrelated labs', async t => {
  const path = await fixture(t);
  const target = join(path, 'src/availability.js');
  const original = Buffer.from('// participant change\n' + await readFile(target, 'utf8'));
  await writeFile(target, original);
  const pricing = await readFile(join(path, 'src/pricing.js'));
  const before = await readdir(path);
  const plan = await preview(path, 'lab1');
  await assert.rejects(applySolution(plan), /confirmation/);
  assert.deepEqual(await readdir(path), before);
  assert.deepEqual(await readFile(target), original);
  const result = await applySolution(plan, { confirmed: true });
  assert.ok(result.changed);
  assert.deepEqual(await readFile(join(result.backup, 'src/availability.js')), original);
  assert.deepEqual(await readFile(join(path, 'src/pricing.js')), pricing);
  assert.deepEqual(await readFile(target), await readFile(join(path, 'solutions/lab1/src/availability.js')));
  const repeated = await applySolution(await preview(path, 'lab1'), { confirmed: true });
  assert.deepEqual(repeated, { changed: false, backup: null });
});
test('recovery: stale preview refuses overwrite', async t => {
  const path = await fixture(t);
  const plan = await preview(path, 'lab2');
  await writeFile(join(path, 'src/pricing.js'), '// newer work\n');
  await assert.rejects(applySolution(plan, { confirmed: true }), /changed since preview/);
  assert.equal(await readFile(join(path, 'src/pricing.js'), 'utf8'), '// newer work\n');
});
test('recovery: unsafe paths and altered allowlists are rejected', async t => {
  for (const path of ['../secret', '/tmp/secret', 'C:/secret', 'src\\bad', 'src/../bad', 'src//bad', 'src/./bad', 'src/\0bad']) {
    assert.throws(() => safeRelative(path), /Unsafe/);
  }
  const path = await fixture(t);
  const manifestPath = join(path, 'solutions/manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  manifest.lab1[0].target = '../outside';
  await writeFile(manifestPath, JSON.stringify(manifest));
  await assert.rejects(preview(path, 'lab1'), /Unsafe/);
  await assert.rejects(preview(path, 'all'), /exactly/);
});
test('recovery: symlinked target is refused without touching its destination', async t => {
  const path = await fixture(t);
  const target = join(path, 'src/availability.js');
  const outside = join(path, 'do-not-touch.js');
  await writeFile(outside, '// preserved\n');
  await rm(target);
  try {
    await symlink(outside, target, 'file');
  } catch (error) {
    if (process.platform === 'win32' && error.code === 'EPERM') {
      t.skip('Windows symlink privilege unavailable; manual symlink refusal check remains required');
      return;
    }
    throw error;
  }
  await assert.rejects(preview(path, 'lab1'), /Symlink/);
  assert.equal(await readFile(outside, 'utf8'), '// preserved\n');
});
test('recovery: lab3 backs up and replaces both helper and UI only', async t => {
  const path = await fixture(t);
  const stock = await readFile(join(path, 'src/stock.js'));
  await writeFile(join(path, 'src/substitutions.js'), '// local helper edit\n');
  await writeFile(join(path, 'public/substitution-panel.js'), '// local UI edit\n');
  const result = await applySolution(await preview(path, 'lab3'), { confirmed: true });
  assert.equal(await readFile(join(result.backup, 'src/substitutions.js'), 'utf8'), '// local helper edit\n');
  assert.equal(await readFile(join(result.backup, 'public/substitution-panel.js'), 'utf8'), '// local UI edit\n');
  assert.deepEqual(await readFile(join(path, 'src/stock.js')), stock);
});
