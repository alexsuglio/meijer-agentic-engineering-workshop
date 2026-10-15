import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
async function walk(directory) {
  const paths = [];
  for (const entry of await readdir(join(root, directory), { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path));
    else if (entry.isFile() && path.endsWith('.md')) paths.push(path);
  }
  return paths;
}
try {
  const paths = ['README.md', ...await walk('docs'), ...await walk('.github')];
  for (const path of paths) {
    const text = await readFile(join(root, path), 'utf8');
    const prose = text.replace(/```[\s\S]*?```/g, '');
    for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^[a-z]+:/i.test(target)) continue;
      await access(resolve(root, dirname(path), decodeURIComponent(target)));
    }
    if (path.endsWith('.instructions.md')) {
      if (!/^---\r?\napplyTo: ".+"\r?\n---/m.test(text)) throw new Error(`Missing applyTo frontmatter: ${path}`);
    }
    if (path.endsWith('SKILL.md') || path.endsWith('.agent.md')) {
      if (!/^---\r?\nname: .+\r?\ndescription: .+\r?\n/m.test(text)) throw new Error(`Missing name/description frontmatter: ${path}`);
    }
  }
  const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
  for (const script of ['setup:check', 'test', 'test:lab1', 'test:lab2', 'test:lab3', 'verify', 'solutions', 'validate:matrix', 'docs:check']) {
    if (!pkg.scripts[script]) throw new Error(`Missing documented script: ${script}`);
  }
  console.log(`PASS ${paths.length} Markdown files: local linked paths, customization frontmatter, documented script names.`);
  console.log('Manual checks still required: anchor navigation, external URLs, exact client controls, command execution, and printed page counts.');
} catch (error) {
  console.error(`Documentation check failed: ${error.message}`);
  process.exitCode = 1;
}
