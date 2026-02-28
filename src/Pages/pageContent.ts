export interface Page {
    title: string;
    content: Content[];
    
}
export interface Content
{
    type: 'p' | 'img' | 'video' | 'div'|'a';
    src : string;
    caption?: string;
}
export function createPageContent(page: Page): HTMLElement {
    let root = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = page.title;
    root.appendChild(title);
    page.content.forEach(item => {
        let element: HTMLElement;
        switch (item.type) {
            case 'p':
                element = document.createElement('p');
                element.textContent = item.src;
                break;
            case 'img':
                element = document.createElement('figure');
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.caption || '';
                element.appendChild(img);
                if (item.caption) {
                    const caption = document.createElement('figcaption');
                    caption.textContent = item.caption;
                    element.appendChild(caption);
                }
                break;
            case 'video':
                element = document.createElement('figure');
                const videoEl = document.createElement('video');
                videoEl.controls = true;
                videoEl.playsInline = true;
                videoEl.preload = 'metadata';
                videoEl.style.width = '100%';
                // 明示的に <source> を追加して MIME type を指定
                const srcEl = document.createElement('source');
                srcEl.src = item.src;
                srcEl.type = 'video/mp4';
                videoEl.appendChild(srcEl);
                videoEl.addEventListener('error', () => {
                    console.error('Video load/error:', item.src, videoEl.error);
                });
                videoEl.load();
                element.appendChild(videoEl);
                 if (item.caption) {

                     const caption = document.createElement('figcaption');
                     caption.textContent = item.caption;
                     element.appendChild(caption);
                 }
                 break;
            case 'div':
                element = document.createElement('div');
                element.innerHTML = item.src;
                break;
            case 'a':
                element = document.createElement('a') as HTMLAnchorElement;
                (element as HTMLAnchorElement).href = item.src;
                element.textContent = item.caption + " - "+ item.src;
                break;
            default:
                throw new Error(`Unsupported content type: ${item.type}`);
        }
        root.appendChild(element);
    });
    return root;
}
