import http from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const mounts = { public: resolve(root, 'public'), src: resolve(root, 'src'), data: resolve(root, 'data') };
const contained = (base, target) => {
  const path = relative(base, target);
  return path !== '..' && !path.startsWith(`..${sep}`) && !isAbsolute(path);
};

export function createServer() {
  return http.createServer(async (req, res) => {
    const send = (status, text) => {
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(req.method === 'HEAD' ? undefined : text);
    };
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.setHeader('Allow', 'GET, HEAD');
      return send(405, 'Method not allowed');
    }
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      return send(400, 'Invalid request path');
    }
    if (pathname.includes('\0') || pathname.includes('\\') || pathname.split('/').includes('..')) {
      return send(400, 'Invalid request path');
    }
    if (pathname === '/health') return send(200, 'FreshCart Ops ready');
    const parts = pathname.split('/').filter(Boolean);
    const mount = ['src', 'data'].includes(parts[0]) ? parts.shift() : 'public';
    const base = mounts[mount];
    const target = resolve(base, parts.join('/') || 'index.html');
    if (!contained(base, target) || !types[extname(target)]) return send(404, 'Not found');
    try {
      const actual = await realpath(target);
      if (!contained(await realpath(base), actual)) return send(404, 'Not found');
      const body = await readFile(actual);
      res.writeHead(200, {
        'Content-Type': `${types[extname(actual)]}; charset=utf-8`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'"
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) {
      if (['ENOENT', 'EISDIR', 'ENOTDIR'].includes(error.code)) return send(404, 'Not found');
      console.error('Static file error:', error);
      send(500, 'Unable to read local file');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('PORT must be an integer from 1 to 65535.');
    process.exitCode = 1;
  } else {
    const server = createServer();
    server.on('error', error => {
      console.error(`FreshCart could not start on 127.0.0.1:${port}: ${error.message}`);
      process.exitCode = 1;
    });
    server.listen(port, '127.0.0.1', () => {
      console.log(`FreshCart Ops: http://127.0.0.1:${port}\nServing checkout: ${root}\nStop with Ctrl+C before switching practice copies.`);
    });
  }
}
