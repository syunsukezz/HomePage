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
import bgm from './Resource/bgm.wav'
import { aboutContent } from './Pages/about'

type route = {
    path: string;
    content: HTMLElement;
  }[];
let routes: route = [
  {
    path: 'Home.html',
    content: (() => {
      const div = document.createElement('div');
      div.innerHTML = mainHTML;
      return div;
    })()
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
      style={{
        width: "100%",
        height: "100%",
        border: "none"
      }}
      allow="fullscreen"
    /></iframe>
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
      style={{
        width: "100%",
        height: "100%",
        border: "none"
      }}
      allow="fullscreen"
    />`;
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
      style={{
        width: "100%",
        height: "100%",
        border: "none"
      }}
      allow="fullscreen"
    />
    </iframe>
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
      style={{
        width: "100%",
        height: "100%",
        border: "none"
      }}
      allow="fullscreen"
    />`;
      return div;
    })()
  }

]

// ユーザー操作が行われるまで再生を遅延させるための仕組み
let userInteracted = false;
const pendingPlays: Array<() => void> = [];
function registerUserInteraction() {
  if (userInteracted) return;
  userInteracted = true;
  // イベントキューされた再生を実行
  pendingPlays.forEach(fn => fn());
  pendingPlays.length = 0;
}
// 最初のユーザー操作（クリック/タッチ/キー入力）を一度だけ待つ
['click', 'touchstart', 'keydown'].forEach(evt => {
  window.addEventListener(evt, registerUserInteraction, { once: true, passive: true });
});

function safePlay(audioEl: HTMLMediaElement) {
  if (userInteracted) {
    audioEl.play().catch(() => { /* 無視: ブラウザの制約で再生できない */ });
  } else {
    pendingPlays.push(() => audioEl.play().catch(() => {}));
  }
}

if (confirm('このサイトはBGMが鳴ります。よろしいですか？')){
  const bgmAudio = new Audio(bgm);
  bgmAudio.volume = 0.2; // 音量を50%に設定
  bgmAudio.loop = true;
  safePlay(bgmAudio);
}


safePlay(new Audio(visitSound));
 

// ここで、mainHTML と galleryItems を使用して、ページの初期コンテンツを設定します。
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
     <script async defer src="https://buttons.github.io/buttons.js"></script>
    <div class="Header">
      <h1 style="display:flex; align-items: center;"><img src=icon.png class="Icon"></img><span id="title">Syunsukezz's Home Page</span></h1>
    </div>
    
    <div class="Content">
      
    </div>
    <nav>
      <img id="hamburger"></img>
      
    </nav>
    <footer>
        <p>Copyright © 2026 Syunsukezz. All rights reserved.</p>
        <address>
            <!--mail: <a href="mailto:syunsuke@syunsukezz.com">-->
            mail: <a href="mailto:x23099xx@aitech.ac.jp">x23099xx@aitech.ac.jp</a>
        </address>
        this page is created using <a href="https://vitejs.dev/">Vite</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>.
        If you find any bugs or mistakes, or if you have any suggestions, please report them. 
        <!-- Place this tag where you want the button to render. -->
        <a class="github-button" href="https://github.com/syunsukezz/Homepage/issues" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue syunsukezz/Homepage on GitHub">Issue</a>
    </footer>
`
document.querySelector('#hamburger')?.setAttribute('src', Humburger)
document.querySelector('.Header')?.addEventListener('click', () => {
  LoadContent('Home.html')
  loadGalleryItems(galleryItems)
});

// コールバックの設定
let nav = document.querySelector('nav')
routes.forEach(element => {
    let link = document.createElement('a');
    link.href = element.path;
    link.textContent = element.path.replace('.html', '').toUpperCase();
    link.addEventListener('click', (event) => {
        event.preventDefault();
        LoadContent(element.path);
    });
    nav?.appendChild(link);

  
});
let audio = new Audio(clickSound);
document.addEventListener('click', () => {
  audio.currentTime = 0;
  safePlay(audio);

});
let menuAudio = new Audio(menuSound);
let cullentHoveredItem: HTMLElement | null = null;
document.addEventListener('mouseover', (e) => {
    let ep = e.target as HTMLElement;
    console.log('Mouse entered:', ep);
    if(ep.closest(".GalleryItem")&& ep.closest(".GalleryItem") !== cullentHoveredItem) {
      menuAudio.currentTime = 0;
      safePlay(menuAudio);
      cullentHoveredItem = ep.closest(".GalleryItem") as HTMLElement;
    }
    else if(!ep.closest(".GalleryItem"))
    {
      cullentHoveredItem = null;
    }
} );

   





// 初回表示をロード
LoadContent('Home.html')
loadGalleryItems(galleryItems)



// 関数定義
export function LoadContent(path:string) {
  const contentDiv = document.querySelector('.Content')!;
  const route = routes.find(r => r.path === path);
  if (route) {
    contentDiv.innerHTML = '';
    contentDiv.appendChild(route.content);

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

    safePlay(new Audio(visitSound));
  } else {
    contentDiv.innerHTML = '<h2>404 Not Found</h2><p>The page you are looking for does not exist.</p>';
  }
}




