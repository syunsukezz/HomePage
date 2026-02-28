const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5173;

// 静的ファイル配信のヘッダー調整（precompressed を検出して返す）
app.use((req, res, next) => {
  const urlPath = req.url.split('?')[0];
  const acceptEnc = (req.headers['accept-encoding'] || '');
  const publicFile = path.join(__dirname, 'public', decodeURIComponent(urlPath));

  // Brotli が使えるなら .br を優先して返す
  if (!urlPath.endsWith('.br') && acceptEnc.includes('br') && fs.existsSync(publicFile + '.br')) {
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Vary', 'Accept-Encoding');
    // Content-Type 推測（必要に応じて拡張）
    if (urlPath.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm');
    else if (urlPath.endsWith('.data')) res.setHeader('Content-Type', 'application/octet-stream');
    else res.setHeader('Content-Type', 'application/javascript');
    return res.sendFile(publicFile + '.br');
  }

  // gzip が使えるなら .gz を返す
  if (!urlPath.endsWith('.gz') && acceptEnc.includes('gzip') && fs.existsSync(publicFile + '.gz')) {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Vary', 'Accept-Encoding');
    if (urlPath.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm');
    else if (urlPath.endsWith('.data')) res.setHeader('Content-Type', 'application/octet-stream');
    else res.setHeader('Content-Type', 'application/javascript');
    return res.sendFile(publicFile + '.gz');
  }

  // 既存の明示的拡張子向けヘッダ設定（リクエストが *.br/*.gz の場合など）
  if (urlPath.endsWith('.wasm') || urlPath.endsWith('.wasm.gz')) {
    res.setHeader('Content-Type', 'application/wasm');
  } else if (urlPath.endsWith('.data') || urlPath.endsWith('.data.gz')) {
    res.setHeader('Content-Type', 'application/octet-stream');
  } else if (urlPath.endsWith('.js') || urlPath.endsWith('.js.gz') || urlPath.endsWith('.framework.js') || urlPath.endsWith('.framework.js.gz')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (urlPath.endsWith('.br')) {
    res.setHeader('Content-Type', 'application/javascript');
  }

  if (urlPath.endsWith('.gz')) {
    res.setHeader('Content-Encoding', 'gzip');
  }
  if (urlPath.endsWith('.br')) {
    res.setHeader('Content-Encoding', 'br');
  }

  next();
});

// public ディレクトリをルートにマウント
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    // 追加ヘッダ（必要なら調整）
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
}));

app.listen(port, () => console.log(`Unity static server running at http://localhost:${port}`));
