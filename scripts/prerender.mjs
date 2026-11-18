// ビルド後に実行する静的出力スクリプト(SEO用)。
// ビルド済みのバンドルを jsdom で各URLごとに実行し，描画結果のHTMLを dist/ に書き出す。
// あわせて sitemap.xml を生成する。使い方: node scripts/prerender.mjs (npm run build から呼ばれる)
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

const ORIGIN = 'https://www.syunsukezz.com'
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const scriptSrc = template.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1]
if (!scriptSrc) throw new Error('dist/index.html にモジュールスクリプトが見つかりません')
const bundle = readFileSync(join(dist, scriptSrc), 'utf8')

// 指定パスのページをバンドルで描画し，{ html, routePaths } を返す
function render(pathname) {
  const dom = new JSDOM(template, {
    url: ORIGIN + pathname,
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  })
  const w = dom.window
  // jsdomに無いAPIの代用(音・メディアクエリ・スクロール)
  w.Audio = class { play() { return Promise.resolve() } pause() {} }
  w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
  w.scrollTo = () => {}
  w.eval(bundle)
  const doc = w.document
  // 外部の読み込みスクリプト(コメント欄など)は静的HTMLに残さない(クライアントが再度実行する)
  doc.querySelectorAll('.Content script').forEach(s => s.remove())
  const routePaths = w.__ROUTE_PATHS__
  const html = dom.serialize()
  w.close()
  return { html, routePaths }
}

const home = render('/Home.html')
const paths = home.routePaths
const outputs = new Map()
for (const path of paths) {
  outputs.set(path, path === 'Home.html' ? home.html : render('/' + encodeURI(path)).html)
}
for (const [path, html] of outputs) writeFileSync(join(dist, path), html)
writeFileSync(join(dist, 'index.html'), home.html)
writeFileSync(join(dist, '404.html'), render('/__not-found__').html)

const urls = paths.map(p => `  <url>\n    <loc>${ORIGIN}/${encodeURI(p)}</loc>\n  </url>`).join('\n')
writeFileSync(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)

console.log(`prerendered ${paths.length} pages + 404.html + sitemap.xml`)
