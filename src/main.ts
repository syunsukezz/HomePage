import './style.css'
import Humburger from 'bootstrap-icons/icons/list.svg'
import mainHTML from './Pages/main.html?raw'
import { loadGalleryItems } from './Gallery/Gallery'
import { galleryItems } from './Gallery/MainPageGallery'
import { createPageContent } from './Pages/pageContent'
import { darinContent } from './Pages/darin'
import clickSound from './Resource/maou_se_sound_pc01.mp3'
import menuSound from './Resource/maou_se_sound_switch02.mp3'
import visitSound from './Resource/maou_se_sound10.mp3'
import bgm from './Resource/bgm.m4a'
import { aboutContent } from './Pages/about'

const SITE_TITLE = "Syunsukezz's Home Page";

type route = {
    path: string;
    content: HTMLElement;
    postLoad?: () => void;  
  }[];
let routes: route = [
  {
    path: 'Home.html',
    content: (() => {
      const div = document.createElement('div');
      div.innerHTML = mainHTML;
      return div;
    })(),
    postLoad: () => {
      loadGalleryItems(galleryItems);
    }
  },
  { 
    path: 'about.html',
    content: createPageContent(aboutContent) 
  },
  {
    path: '舵のまにまに.html',
    content: createPageContent(darinContent)
  },
  {
    path:'Query-chan.html',
    content: (() => {
      const div = document.createElement('div');
      div.innerHTML = `<h2>Query-chan Quest!!</h2><p>大学のプログラミング演習で作ったゲーム。<kbd><kbd>F</kbd></kbd>キーで鏡の向きを変えて緑の箱にレーザーを当てよう。操作性が劣悪。</p><iframe
      src="/Unity/Query-Chan Quest!!/index.html"
      allow="fullscreen"
    ></iframe>
    <div class="Credit">楽曲: 魔王魂 <a href="https://maou.audio/">https://maou.audio/</a></div>
    `
  
    ;
      return div;
    })()
  },
  {
    path:'HumanBullet.html',
    content: (() => {
      const div = document.createElement('div');
      div.innerHTML = `<h2>Human Bullet</h2><p>大学のプログラミング演習で作った作品。まずコースを作らないと遊べない。”コースを作る”からエディタ画面に行って”説明書を見る”をクリックしよう</p><iframe
      src="/Unity/humanBullet/index.html"
      allow="fullscreen"></iframe>
    <div class="Credit">楽曲、効果音: 魔王魂 <a href="https://maou.audio/">https://maou.audio/</a></div>
    `
    
    ;
      return div;
    })()
  },
  
  {
    path:'ミリしら将棋.html',
    content: (() => {
      const div = document.createElement('div');
      div.innerHTML = `<h2>ミリしら将棋</h2><p>1年生の時にTGS2023に展示した作品。</p>
      <a href="https://www.4gamer.net/games/999/G999905/20230922047/">ゲームが4gamerに掲載されました - https://www.4gamer.net/games/999/G999905/20230922047/</a>
      <iframe
      src="/Unity/ミリしら将棋/index.html"
      allow="fullscreen"></iframe>
    <h3>初期のプロトタイプ</h3>
    <iframe src="https://scratch.mit.edu/projects/865640338/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen style="height: 402px;"></iframe>
    `;
      return div;
    })()
  },
  {
    path:'ConstellationMachine.html',
    content: (() => {
      const div = document.createElement('div');
      div.innerHTML = `<h2>Constellation Machine</h2><p>大学の授業で作った作品。p5.jsで作成された、星座を描くプログラム。</p><iframe
      src="/p5.js/ConstellationMachine/index.html"
      allow="fullscreen"></iframe>`;
      return div;
    })()
  }

]

// 自サイト内のゲーム(Unity/p5.js)のiframeは重いので，クリックされるまで読み込まない。
// 読み込み済みのiframeも，この関数を再度呼ぶとボタン状態に戻る(ページ離脱時にゲームを止めるため)
function lazifyIframes(container: HTMLElement) {
  const heading = container.querySelector('h2')?.textContent ?? 'ゲーム';
  container.querySelectorAll<HTMLIFrameElement>('iframe').forEach(frame => {
    const src = frame.getAttribute('src') ?? '';
    if (!src.startsWith('/')) return; // Scratchなど外部の埋め込みは対象外
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'LazyEmbed';
    btn.dataset.src = src;
    btn.dataset.title = `${heading}のゲーム画面`;
    btn.textContent = '▶ クリックして読み込む';
    frame.replaceWith(btn);
  });
}
function loadLazyEmbed(btn: HTMLElement) {
  const frame = document.createElement('iframe');
  frame.src = btn.dataset.src ?? '';
  frame.title = btn.dataset.title ?? '';
  frame.allow = 'fullscreen';
  btn.replaceWith(frame);
}
routes.forEach(r => lazifyIframes(r.content));
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('.LazyEmbed');
  if (btn) loadLazyEmbed(btn);
});
let currentContent: HTMLElement | null = null;
//alert(navigator.userAgent);


// 音(BGM・効果音)のON/OFF。初回は自動再生ポリシーを避けるためOFFで始め，状態はlocalStorageに保存する
const SOUND_KEY = 'soundEnabled';
function loadSoundEnabled(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) === '1';
  } catch {
    return false;
  }
}
let soundEnabled = loadSoundEnabled();

const bgmAudio = new Audio(bgm);
bgmAudio.preload = "none"; // ONにするまで読み込まない
bgmAudio.volume = 0.2;
bgmAudio.loop = true;

function playSe(audio: HTMLAudioElement) {
  if (!soundEnabled) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function playBgm() {
  if (soundEnabled && bgmAudio.paused) {
    bgmAudio.play().catch(() => {});
  }
}

function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  try {
    localStorage.setItem(SOUND_KEY, enabled ? '1' : '0');
  } catch {
    // 保存できなくても動作には影響しない
  }
  if (enabled) {
    playBgm();
  } else {
    bgmAudio.pause();
  }
  updateSoundButton();
}

function updateSoundButton() {
  const btn = document.querySelector<HTMLButtonElement>('#soundToggle');
  if (!btn) return;
  btn.textContent = soundEnabled ? '🔊 音: ON' : '🔇 音: OFF';
  btn.setAttribute('aria-pressed', String(soundEnabled));
}


// ここで、mainHTML と galleryItems を使用して、ページの初期コンテンツを設定します。
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
     <script async defer src="https://buttons.github.io/buttons.js"></script>
    <div class="Header" role="link" tabindex="0" aria-label="ホームへ戻る">
      <h1 style="display:flex; align-items: center;"><img src=icon.png class="Icon" alt=""></img><span id="title">Syunsukezz's Home Page</span></h1>
    </div>
    
    <div class="Content">
      
    </div>
    <button id="soundToggle" type="button" aria-label="BGMと効果音のON/OFF"></button>
    <nav id="mainNav" aria-label="メインメニュー">
      <button id="hamburger" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="mainNav"><img id="hamburgerIcon" alt=""></button>

    </nav>
    <footer>
        ページの効果音：<a href="https://maou.audio/">魔王魂</a>
        <p>Copyright © 2026 Syunsukezz. All rights reserved.</p>
        <address>
            mail:<span id="mailLink">(JavaScriptを有効にするか、下のGitHub Issueからご連絡ください)</span> 
            
        </address>
        this page is created using <a href="https://vitejs.dev/">Vite</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>.
        If you find any bugs or mistakes, or if you have any suggestions, please report them. 
        <!-- Place this tag where you want the button to render. -->
        <a class="github-button" href="https://github.com/syunsukezz/Homepage/issues" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue syunsukezz/Homepage on GitHub">Issue</a>
    </footer>
`
document.querySelector('#hamburgerIcon')?.setAttribute('src', Humburger)

// メールアドレスはHTML/JSに連続した文字列で置かず，実行時に組み立ててスパム収集ボット対策にする
const mailLink = document.querySelector<HTMLElement>('#mailLink');
if (mailLink) {
  const addr = ['syunsuke', 'syunsukezz.com'].join(String.fromCharCode(64));
  const a = document.createElement('a');
  a.href = 'mailto:' + addr;
  a.textContent = addr;
  mailLink.replaceWith(a);
}
const header = document.querySelector<HTMLElement>('.Header');
header?.addEventListener('click', () => {
  RouteTo('Home.html')
});
header?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') RouteTo('Home.html');
});

// ナビの開閉: ボタンのクリック/タップ・Enter/Space，マウスのホバー，Escで閉じる
const navEl = document.querySelector<HTMLElement>('nav')!;
const hamburger = document.querySelector<HTMLButtonElement>('#hamburger')!;
function setNavOpen(open: boolean) {
  navEl.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
}
hamburger.addEventListener('click', () => setNavOpen(!navEl.classList.contains('open')));
const canHover = window.matchMedia('(hover: hover)');
navEl.addEventListener('mouseenter', () => { if (canHover.matches) setNavOpen(true); });
navEl.addEventListener('mouseleave', () => {
  if (canHover.matches && !navEl.contains(document.activeElement)) setNavOpen(false);
});
navEl.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    setNavOpen(false);
    hamburger.focus();
  }
});
// メニューの外をタップ/フォーカスしたら閉じる
document.addEventListener('click', (e) => {
  if (!navEl.contains(e.target as Node)) setNavOpen(false);
});
navEl.addEventListener('focusout', (e) => {
  if (!navEl.contains(e.relatedTarget as Node | null)) setNavOpen(false);
});

// コールバックの設定
let nav = document.querySelector('nav')
routes.forEach(element => {
    let link = document.createElement('a');
    link.href = element.path;
    link.textContent = element.path.replace('.html', '').toUpperCase();
    link.addEventListener('click', (event) => {
        event.preventDefault();
        setNavOpen(false);
        RouteTo(element.path);
    });
    nav?.appendChild(link);

  
});
updateSoundButton();
document.querySelector('#soundToggle')?.addEventListener('click', (event) => {
  // 文書全体のクリック効果音と二重に鳴らさない
  event.stopPropagation();
  setSoundEnabled(!soundEnabled);
});
let audio = new Audio(clickSound);
document.addEventListener('click', () => {
  playSe(audio);
  // 前回ONにしていた場合，最初のクリック(ユーザー操作)でBGMを再開する
  playBgm();
});
let menuAudio = new Audio(menuSound);
let cullentHoveredItem: HTMLElement | null = null;
document.addEventListener('mouseover', (e) => {
    let ep = e.target as HTMLElement;
    if(ep.closest(".GalleryItem")&& ep.closest(".GalleryItem") !== cullentHoveredItem) {
      playSe(menuAudio);
      cullentHoveredItem = ep.closest(".GalleryItem") as HTMLElement;
    }
    else if(!ep.closest(".GalleryItem"))
    {
      cullentHoveredItem = null;
    }
} );

LoadContent(location.href);
// 戻る/進むで履歴が変わったら，リロードせず表示だけ切り替える
window.addEventListener('popstate', () => {
  LoadContent(location.href);
  window.scrollTo(0, 0);
});










// 関数定義
// ルートのパス(例: about.html)からタブに表示するタイトルを作る
function pageTitle(path: string): string {
  if (path === 'Home.html') return SITE_TITLE;
  return `${path.replace('.html', '')} | ${SITE_TITLE}`;
}
// ページをリロードせずに遷移する(履歴はpushStateで積む．BGMも途切れない)
export function RouteTo(path:string) {
  const url = '/' + encodeURI(path);
  const same = decodeURI(location.pathname) === '/' + path;
  // 同じページへの遷移は履歴を増やさない
  if (same) {
    history.replaceState(null, '', url);
  } else {
    history.pushState(null, '', url);
  }
  LoadContent(url);
  window.scrollTo(0, 0);
}
export function LoadContent(rpath:string) {
  const path = decodeURI(rpath.split('/').pop() || 'Home.html');

  //alert('LoadContent called with path: ' + path); // デバッグ用アラート
  const contentDiv = document.querySelector('.Content')!;
  const route = routes.find(r => r.path === path);
  if (route) {
    // 離れるページの読み込み済みiframeはボタンに戻して，ゲームを止める
    if (currentContent) lazifyIframes(currentContent);
    currentContent = route.content;
    contentDiv.innerHTML = '';
    contentDiv.appendChild(route.content);
    document.title = pageTitle(path);

    // 追加：container内の<script>を実行する
    (function runScripts(container: HTMLElement) {
      const scripts = Array.from(container.querySelectorAll('script'));
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        // 属性をコピー
        for (let i = 0; i < oldScript.attributes.length; i++) {
          const attr = oldScript.attributes[i];
          newScript.setAttribute(attr.name, attr.value);
        }
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    })(route.content);
    if (route.postLoad) {
      route.postLoad();
    }
    playSe(new Audio(visitSound));

  } else {
    document.title = `404 Not Found | ${SITE_TITLE}`;
    contentDiv.innerHTML = '<h2>404 Not Found</h2><p>The page you are looking for does not exist.</p>';
  }
}




