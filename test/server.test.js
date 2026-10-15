import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createServer } from '../server.js';

test('HTTP serves the local app but not repository/private files', async t => {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const [path, content] of [
    ['/', 'FreshCart Ops'], ['/health', 'FreshCart Ops ready'],
    ['/app.js', 'renderCatalog'], ['/styles.css', '.product-grid'],
    ['/data/products.js', 'OAT-001'], ['/src/stock.js', 'availableQuantity']
  ]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    assert.ok((await response.text()).includes(content), path);
  }
  for (const path of ['/package.json', '/.git/config', '/docs/setup.md', '/missing.js', '/src/%2e%2e%2fpackage.json']) {
    const response = await fetch(origin + path);
    assert.ok([400, 404].includes(response.status), path);
  }
  const malformed = await fetch(origin + '/%ZZ');
  assert.equal(malformed.status, 400);
  const post = await fetch(origin + '/', { method: 'POST' });
  assert.equal(post.status, 405);
  const head = await fetch(origin + '/', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  assert.match(head.headers.get('content-security-policy'), /default-src 'self'/);
});
