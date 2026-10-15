import { spawnSync } from 'node:child_process';
import { access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let failed = false;
function check(label, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: ${detail}`);
  if (!ok) failed = true;
}
check('Node', Number(process.versions.node.split('.')[0]) === 24, `${process.version}; workshop target is Node 24 LTS`);
const git = spawnSync('git', ['--version'], { encoding: 'utf8' });
check('Git', !git.error && git.status === 0, git.error?.message ?? (git.stdout.trim() || git.stderr.trim()));
const agent = process.env.npm_config_user_agent ?? '';
const manager = /^(npm|pnpm)\/([^\s]+)/.exec(agent);
if (manager) {
  check('Selected package manager', manager[1] !== 'pnpm' || manager[2].split('.')[0] === '10', `${manager[1]} ${manager[2]}; the other package manager is not required`);
} else {
  console.log('INFO Package manager not detected: run npm run setup:check or pnpm run setup:check to report it.');
}
for (const file of ['package.json', 'public/index.html', 'data/products.js', 'src/stock.js', 'solutions/manifest.json']) {
  try {
    await access(resolve(root, file));
    check(file, true, 'present');
  } catch (error) {
    check(file, false, error.message);
  }
}
console.log(`Checkout: ${root}`);
console.log('MANUAL: sign in and confirm Copilot entitlement/policies in VS Code, CLI and desktop app. No authentication was tested.');
console.log('MANUAL: start the server and open http://127.0.0.1:3000. This check does not inspect browser rendering.');
process.exitCode = failed ? 1 : 0;
