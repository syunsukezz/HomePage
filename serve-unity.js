const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5173;

// 静的ファイル配信のヘッダー調整
app.use((req, res, next) => {
  // 絶対パスでファイル名を判定
  const url = req.url.split('?')[0];
  if (url.endsWith('.wasm') || url.endsWith('.wasm.gz')) {
    res.setHeader('Content-Type', 'application/wasm');
  } else if (url.endsWith('.data') || url.endsWith('.data.gz')) {
    res.setHeader('Content-Type', 'application/octet-stream');
  } else if (url.endsWith('.js') || url.endsWith('.js.gz') || url.endsWith('.framework.js') || url.endsWith('.framework.js.gz')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (url.endsWith('.br')) {
    // Brotli が使われる場合
    res.setHeader('Content-Type', 'application/javascript');
  }

  if (url.endsWith('.gz')) {
    res.setHeader('Content-Encoding', 'gzip');
  }
  if (url.endsWith('.br')) {
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
