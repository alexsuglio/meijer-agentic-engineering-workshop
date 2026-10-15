import { createHash, randomUUID } from 'node:crypto';
import { lstat, mkdir, readFile, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const allowed = {
  lab1: ['src/availability.js'],
  lab2: ['src/pricing.js'],
  lab3: ['src/substitutions.js', 'public/substitution-panel.js']
};
const hash = content => createHash('sha256').update(content).digest('hex');
export function safeRelative(path) {
  if (typeof path !== 'string' || !path || isAbsolute(path) || path.includes('\\') || path.includes('\0') ||
      path.includes(':') || path.split('/').some(part => !part || part === '.' || part === '..')) {
    throw new Error(`Unsafe manifest path: ${String(path)}`);
  }
  return path;
}
async function checkedFile(root, path) {
  safeRelative(path);
  let current = root;
  const parts = path.split('/');
  for (let index = 0; index < parts.length; index++) {
    current = join(current, parts[index]);
    const stat = await lstat(current);
    if (stat.isSymbolicLink()) throw new Error(`Symlink refused: ${path}`);
    if (index === parts.length - 1 ? !stat.isFile() : !stat.isDirectory()) {
      throw new Error(`Expected regular path: ${path}`);
    }
  }
  return current;
}
export async function preview(root, lab) {
  if (!Object.hasOwn(allowed, lab)) throw new Error('Choose exactly lab1, lab2, or lab3');
  root = await realpath(root);
  const manifest = JSON.parse(await readFile(await checkedFile(root, 'solutions/manifest.json'), 'utf8'));
  if (JSON.stringify(Object.keys(manifest).sort()) !== JSON.stringify(Object.keys(allowed).sort())) {
    throw new Error('Unexpected manifest lab set');
  }
  for (const [name, targets] of Object.entries(allowed)) {
    const entries = manifest[name];
    if (!Array.isArray(entries) || entries.length !== targets.length) throw new Error(`Invalid ${name} manifest`);
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      if (!entry || Object.keys(entry).sort().join(',') !== 'source,target') throw new Error('Invalid manifest entry');
      safeRelative(entry.target);
      safeRelative(entry.source);
      if (entry.target !== targets[index] || entry.source !== `solutions/${name}/${targets[index]}`) {
        throw new Error('Manifest must use the fixed workshop source/target allowlist');
      }
    }
  }
  const changes = [];
  for (const entry of manifest[lab]) {
    const before = await readFile(await checkedFile(root, entry.target));
    const after = await readFile(await checkedFile(root, entry.source));
    changes.push({ ...entry, before, after, beforeHash: hash(before), afterHash: hash(after), changed: !before.equals(after) });
  }
  return { root, lab, changes };
}
export async function applySolution(plan, { confirmed = false } = {}) {
  if (!confirmed) throw new Error('Explicit confirmation required; no files changed');
  const latest = await preview(plan.root, plan.lab);
  if (latest.changes.some((entry, index) =>
    entry.beforeHash !== plan.changes[index]?.beforeHash || entry.afterHash !== plan.changes[index]?.afterHash)) {
    throw new Error('Files changed since preview; inspect a new preview before applying');
  }
  const changes = latest.changes.filter(entry => entry.changed);
  if (!changes.length) return { changed: false, backup: null };
  const backups = join(plan.root, '.workshop-backups');
  try {
    await mkdir(backups);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  const stat = await lstat(backups);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('Backup path must be a real directory, not a symlink');
  const backup = join(backups, `${plan.lab}-${new Date().toISOString().replaceAll(':', '-')}-${randomUUID()}`);
  await mkdir(backup);
  for (const entry of changes) {
    const path = join(backup, entry.target);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, entry.before, { flag: 'wx' });
  }
  await writeFile(join(backup, 'receipt.json'), JSON.stringify({
    lab: plan.lab,
    files: changes.map(({ target, beforeHash, afterHash }) => ({ target, beforeHash, afterHash }))
  }, null, 2) + '\n', { flag: 'wx' });
  const written = [];
  try {
    for (const entry of changes) {
      const target = await checkedFile(plan.root, entry.target);
      if (hash(await readFile(target)) !== entry.beforeHash) throw new Error(`Concurrent edit detected: ${entry.target}`);
      const temporary = `${target}.freshcart-${randomUUID()}.tmp`;
      try {
        await writeFile(temporary, entry.after, { flag: 'wx' });
        await checkedFile(plan.root, entry.target);
        if (hash(await readFile(target)) !== entry.beforeHash) throw new Error(`Concurrent edit detected: ${entry.target}`);
        await rename(temporary, target);
        written.push(entry.target);
      } finally {
        await rm(temporary, { force: true });
      }
    }
  } catch (error) {
    throw new Error(`Apply stopped: ${error.message}. Files already replaced: ${written.join(', ') || 'none'}. Original files are backed up at ${backup}. Compare and restore manually; no automatic rollback was attempted.`);
  }
  return { changed: true, backup };
}

async function main() {
  const [lab, ...flags] = process.argv.slice(2).filter(argument => argument !== '--');
  if (flags.some(flag => !['--preview', '--apply', '--yes'].includes(flag)) ||
      (flags.includes('--preview') && flags.includes('--apply')) ||
      (flags.includes('--yes') && !flags.includes('--apply'))) {
    throw new Error('Usage: npm run solutions -- lab1|lab2|lab3 [--preview | --apply [--yes]]');
  }
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const plan = await preview(root, lab);
  console.log(`Preview ${lab} in ${root}`);
  for (const entry of plan.changes) console.log(`${entry.changed ? 'REPLACE' : 'UNCHANGED'} ${entry.target}\n  ${entry.beforeHash} -> ${entry.afterHash}`);
  console.log('Only listed files are in scope. Existing edits in those files will be backed up before replacement.');
  if (!flags.includes('--apply')) {
    console.log('Preview only. To apply, rerun with --apply and type YES; --yes is explicit noninteractive consent.');
    return;
  }
  let confirmed = flags.includes('--yes');
  if (!confirmed) {
    if (!process.stdin.isTTY) throw new Error('No interactive input. Preview first; use --apply --yes only if you approve replacing these files');
    const input = createInterface({ input: process.stdin, output: process.stdout });
    try { confirmed = (await input.question('Type YES to back up and replace the listed files: ')) === 'YES'; }
    finally { input.close(); }
  }
  if (!confirmed) {
    console.log('Cancelled. No files changed.');
    return;
  }
  const result = await applySolution(plan, { confirmed });
  console.log(result.changed ? `Applied ${lab}. Backup: ${result.backup}` : 'Already identical. No files or backups changed.');
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
