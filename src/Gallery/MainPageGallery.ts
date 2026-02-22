import type { GalleryItem } from "./Gallery";
import darin from "../Resource/Darin/Darin.jpg";
import faceProjection from "../Resource/FaceProjection.png";
import HorceRacing from "../Resource/HorseRacing.png";

import { darinContent } from "../Pages/darin.ts";
import { LoadContent } from "../main.ts";
import { createPageContent } from "../Pages/pageContent.ts";



export const galleryItems: GalleryItem[] = [
    {
        title: '舵のまにまに',
        description: '学生チャレンジプロジェクトの一環として、TGS2025で展示された作品。光っている柄を持ちながらでないと操縦ができない船でタイムアタックをするゲーム。',
        imageUrl: darin,
        link: 'darin.html',
        onClick: () => {         
             console.log('Darin gallery item clicked');
                LoadContent(createPageContent(darinContent).innerHTML)

        }
    },
    {
        title: 'Project 2',
        description: 'Description of project 2.',
        imageUrl: faceProjection,
        link: 'https://example.com/project2'
    },
    {
        title: 'Project 3',
        description: 'Description of project 3.',
        imageUrl: HorceRacing,
        link: 'https://example.com/project3'
    }
];



