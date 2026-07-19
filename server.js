const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const publicDir = path.join(__dirname, 'web');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

async function handleRequest(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = url.pathname;

    if (pathname === '/') {
      pathname = '/login';
    }

    if (pathname === '/login' || pathname === '/products' || pathname === '/cart' || pathname === '/dashboard' || pathname === '/checkout') {
      const filePath = path.join(publicDir, `${pathname.slice(1)}.html`);
      const contents = await fs.readFile(filePath);
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(contents);
      return;
    }

    const filePath = path.join(publicDir, pathname);
    const contents = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(contents);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

const server = http.createServer(handleRequest);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
