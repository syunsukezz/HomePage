import GalleryHTML from './GalleryTemprate.html?raw'

export interface GalleryItem {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    onClick?: () => void;
}

export function createGalleryItemElement(item: GalleryItem): HTMLElement {
    const template = document.createElement('div');
    template.classList.add('GalleryItem');
    template.innerHTML = GalleryHTML.trim();

    // 深いコピーを作る（子要素も含む）
    const element = template.cloneNode(true) as HTMLElement;

    // template がラッパーを含む場合に備え、実際のルート要素を取得
    const root = (element.firstElementChild as HTMLElement) || element;

    const img = root.querySelector('img');
    if (!img) throw new Error('Gallery template is missing <img> element');

    img.src = item.imageUrl;
    img.alt = item.title;

    const title = root.querySelector('h3');
    if (title) title.textContent = item.title;

    const description = root.querySelector('p');
    if (description) description.textContent = item.description;

    const link = root.querySelector('a');
    if (link) {
      link.href = item.link;
      link.textContent = 'View More';
        if (item.onClick) {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                item.onClick!();
            }
        );
        }
    }

    console.log('Gallery item element created:', root);
    return root;
}

export function loadGalleryItems(items: GalleryItem[]) {
    const galleryContainer = document.querySelector('.Gallery')!;
    galleryContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = createGalleryItemElement(item);
        galleryContainer.appendChild(itemElement);
    });
    
}