import icon from './Resource/icon.png'
import darinImage from './Resource/Darin/Darin.jpg'
import noobShogi from './Resource/noob-shogi.jpg'
import queryChan from './Resource/Query-Chan.webp'
import humanBullet from './Resource/HumanBullet.webp'
import constellationMachine from './Resource/constellationMachine.png'

// サイトの正規のオリジン(canonical・OGP・sitemapで共通)
export const SITE_ORIGIN = 'https://www.syunsukezz.com'
export const SITE_TITLE = "Syunsukezz's Home Page"

export interface SeoMeta {
  description: string;
  image: string; // OGP画像(Viteが解決したURL)
}

// ルート(パス)ごとのmeta情報。パスは main.ts のルート定義と一致させる
export const seoMeta: Record<string, SeoMeta> = {
  'Home.html': {
    description: 'Syunsukezzのポートフォリオサイト。Unityのゲーム、p5.js、顔投影などの作品をブラウザで遊べる形で紹介しています。',
    image: icon,
  },
  'about.html': {
    description: 'このサイトについて。syunsukezzが作成したゲームや作品を紹介するサイトで、Vite・TypeScriptで作られています。',
    image: icon,
  },
  '舵のまにまに.html': {
    description: '学生チャレンジプロジェクトの一環としてTGS2025で展示された作品「舵のまにまに」。光る柄を持って回さないと方向転換できない船で、タイムアタックをするゲーム。',
    image: darinImage,
  },
  'Query-chan.html': {
    description: 'Unityで作ったアクションゲーム「Query-Chan Quest!!」。鏡の向きを変えてレーザーを緑の箱に当てよう。ブラウザでそのまま遊べます。',
    image: queryChan,
  },
  'HumanBullet.html': {
    description: 'Unityで作ったレースゲーム「Human Bullet」。コース上をバウンドするモードと飛行するモードを切り替えてゴールを目指す。コースも自作できます。',
    image: humanBullet,
  },
  'ミリしら将棋.html': {
    description: 'TGS2023に展示したUnity製の将棋ゲーム(のようなもの)「ミリしら将棋」。ブラウザのマウス操作で遊べます。',
    image: noobShogi,
  },
  'ConstellationMachine.html': {
    description: 'p5.jsで作った星座を描くプログラム「Constellation Machine」。マウスクリックで星が生まれ、星同士が線で結ばれます。',
    image: constellationMachine,
  },
}

export function pageTitle(path: string): string {
  if (path === 'Home.html') return SITE_TITLE
  return `${path.replace('.html', '')} | ${SITE_TITLE}`
}

export function pageUrl(path: string): string {
  return `${SITE_ORIGIN}/${encodeURI(path)}`
}

function absoluteImage(src: string): string {
  return src.startsWith('http') ? src : SITE_ORIGIN + (src.startsWith('/') ? '' : '/') + src
}

function setHead(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function metaByName(name: string, content: string) {
  setHead(`meta[name="${name}"]`, () => {
    const m = document.createElement('meta'); m.setAttribute('name', name); return m
  }, 'content', content)
}
function metaByProperty(property: string, content: string) {
  setHead(`meta[property="${property}"]`, () => {
    const m = document.createElement('meta'); m.setAttribute('property', property); return m
  }, 'content', content)
}

// document.title / description / canonical / OGP / robots を現在のルートに合わせる。
// 静的出力(prerender)とクライアント遷移の両方で呼ばれる
export function applySeo(path: string, found: boolean) {
  const robots = document.head.querySelector('meta[name="robots"]')
  if (!found) {
    document.title = `404 Not Found | ${SITE_TITLE}`
    metaByName('robots', 'noindex')
    // 404ページがHomeの重複と見なされないよう，canonicalは付けない
    document.head.querySelector('link[rel="canonical"]')?.remove()
    document.head.querySelector('meta[property="og:url"]')?.remove()
    return
  }
  robots?.remove()
  const meta = seoMeta[path] ?? seoMeta['Home.html']
  const title = pageTitle(path)
  const url = pageUrl(path)
  const image = absoluteImage(meta.image)
  document.title = title
  metaByName('description', meta.description)
  setHead('link[rel="canonical"]', () => {
    const l = document.createElement('link'); l.setAttribute('rel', 'canonical'); return l
  }, 'href', url)
  metaByProperty('og:title', title)
  metaByProperty('og:description', meta.description)
  metaByProperty('og:url', url)
  metaByProperty('og:image', image)
  metaByName('twitter:title', title)
  metaByName('twitter:description', meta.description)
  metaByName('twitter:image', image)
  metaByName('twitter:card', 'summary')
}
