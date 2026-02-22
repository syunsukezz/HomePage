import './style.css'
import Humburger from 'bootstrap-icons/icons/list.svg'
import mainHTML from './Pages/main.html?raw'
import { loadGalleryItems } from './Gallery/Gallery'
import { galleryItems } from './Gallery/MainPageGallery'



// ここで、mainHTML と galleryItems を使用して、ページの初期コンテンツを設定します。
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
     <script async defer src="https://buttons.github.io/buttons.js"></script>
    <div class="Header">
      <h1 style="display:flex; align-items: center;"><img src=icon.png class="Icon"></img><span id="title">Syunsukezz's Home Page</span></h1>
    </div>
    <nav>
      <img id="hamburger"></img>
      <a href="index.html">Home</a>
      <a href="blog.html">Blog</a>
      <a href="about.html">About</a>
    </nav>
    <div class="Content">
      
    </div>
    <footer>
        <p>Copyright © 2026 Syunsukezz. All rights reserved.</p>
        <address>
            <!--mail: <a href="mailto:syunsuke@syunsukezz.com">-->
            mail: <a href="mailto:x23099xx@aitech.ac.jp">x23099xx@aitech.ac.jp</a>
        </address>
        this page is created using <a href="https://vitejs.dev/">Vite</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>.
        if you find any bugs,mistakes or have any suggestions,report by issues
        <!-- Place this tag where you want the button to render. -->
        <a class="github-button" href="https://github.com/syunsukezz/Homepage/issues" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue syunsukezz/Homepage on GitHub">Issue</a>
    </footer>
`
document.querySelector('#hamburger')?.setAttribute('src', Humburger)
document.querySelector('.Header')?.addEventListener('click', () => {
  LoadContent(mainHTML)
  loadGalleryItems(galleryItems)
});

// コールバックの設定
const links = document.querySelectorAll('nav a')
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const href = link.getAttribute('href')
    switch (href) {
      case 'index.html':
        LoadContent(mainHTML)
        loadGalleryItems(galleryItems)
        
        break
      case 'blog.html':
        LoadContent('<h2>Blog</h2><p>This is the blog page.</p>')
        break
      case 'about.html':
        LoadContent('<h2>About</h2><p>This is the about page.</p>')
        break
    }
     
  }
)});




// 初回表示をロード
LoadContent(mainHTML)
loadGalleryItems(galleryItems)






// 関数定義
export function LoadContent(innerHTML: string) {
  const content = document.querySelector('.Content')
  if (content) {
    content.innerHTML = innerHTML
  }
}




