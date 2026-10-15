import { spawnSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
async function files(directory) {
  const result = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(path));
    else if (entry.isFile() && path.endsWith('.js')) result.push(path);
  }
  return result;
}
function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${args.join(' ')} failed (status ${result.status}, signal ${result.signal ?? 'none'})`);
}
try {
  for (const path of ['server.js', ...(await Promise.all(['src', 'public', 'data', 'scripts', 'test', 'acceptance', 'solutions'].map(files))).flat()]) {
    run(['--check', path]);
  }
  run(['--test', ...await files('test')]);
  run(['scripts/check-docs.js']);
  console.log('PASS syntax, baseline tests and local documentation checks. Acceptance, real browser and print checks are separate.');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
