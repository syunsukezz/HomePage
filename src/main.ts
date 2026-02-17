import './style.css'
import Humburger from 'bootstrap-icons/icons/list.svg'
import mainHTML from './main.html?raw'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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
`
document.querySelector('#hamburger')?.setAttribute('src', Humburger)
document.querySelector('.Header')?.addEventListener('click', () => {
  LoadContent(mainHTML)
})




LoadContent(mainHTML)

const links = document.querySelectorAll('nav a')
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const href = link.getAttribute('href')
    switch (href) {
      case 'index.html':
        LoadContent(mainHTML)
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









function LoadContent(innerHTML: string) {
  const content = document.querySelector('.Content')
  if (content) {
    content.innerHTML = innerHTML
  }
}




