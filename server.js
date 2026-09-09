const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function getFilePath(urlPath) {
  // Remove query params or hashes
  const cleanPath = decodeURI(urlPath.split('?')[0].split('#')[0]);
  let filePath = path.join(ROOT_DIR, cleanPath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    return null;
  }

  // If path is a directory or ends in /, look for index.html
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const indexHtml = path.join(filePath, 'index.html');
      if (fs.existsSync(indexHtml)) {
        return indexHtml;
      }
    } else {
      return filePath;
    }
  }

  // Try appending .html (e.g. /recording -> /recording.html or /recording/index.html)
  if (fs.existsSync(filePath + '.html')) {
    return filePath + '.html';
  }

  const nestedIndex = path.join(filePath, 'index.html');
  if (fs.existsSync(nestedIndex)) {
    return nestedIndex;
  }

  return null;
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const resolvedPath = getFilePath(req.url);

  if (resolvedPath && fs.existsSync(resolvedPath)) {
    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(resolvedPath).pipe(res);
  } else {
    // 404 handler
    const notFoundPath = path.join(ROOT_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  🚀 Local Dev Server running at:`);
  console.log(`  > Local:   http://localhost:${PORT}/`);
  console.log(`  > Studio:  http://localhost:${PORT}/recording/`);
  console.log(`  > Pricing: http://localhost:${PORT}/pricing/\n`);
});
