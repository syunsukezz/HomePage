import type { GalleryItem } from "./Gallery";
import darin from "../Resource/Darin/Darin.jpg";
import faceProjection from "../Resource/FaceProjection.png";

import noobShogi from "../Resource/noob-shogi.jpg"
import QueryChan from "../Resource/Query-Chan.png"
import humanBullet from "../Resource/HumanBullet.png"
import constallationMachine from "../Resource/constellationMachine.png"
import analogText from "../Resource/AnalogText.png"
import dclab from "../Resource/dclab.png"

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
            LoadContent('舵のまにまに.html')


        }
    },
    {
        title: '何でも立体化スクリプト',
        description: 'DepthAnythingを用いて、画像から3Dモデルを生成するスクリプト。画像を入力すると、レリーフ様の3Dモデルが出力される。プロジェクターを当てるといい感じになる',
        imageUrl: faceProjection,
        link: 'https://scrapbox.io/dclab/%E3%81%AA%E3%82%93%E3%81%A7%E3%82%82%E7%AB%8B%E4%BD%93%E5%8C%96%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88'
    },
    
    {
        title: 'ミリしら将棋',
        description: 'TGS2023で展示したUnityで作った将棋ゲーム(の様なもの)。リンク先ではマウスで遊ぶことができる。TGSでは駒形のコントローラを打ち付けて操作した。',
        imageUrl: noobShogi,
        link: 'ミリしら将棋.html',
        onClick: () => {
            console.log('ミリしら将棋 gallery item clicked');
            LoadContent('ミリしら将棋.html')
        }
    },
    {
        title: 'Query-Chan Quest!!',
        description: 'Unityで作ったアクションゲーム。鏡を操作してレーザーを緑の箱に当てる。',
        imageUrl: QueryChan,
        link: 'Query-chan.html',
        onClick: () => {
            console.log('Query-Chan Quest!! gallery item clicked');
            LoadContent('Query-chan.html')
        }
    },
    {
        title: 'Human Bullet',
        description: 'Unityで作ったレースゲーム。コース上をバウンドするモードと飛行するモードを切り替えてゴールを目指す。コースを自作できる',
        imageUrl: humanBullet,
        link: 'HumanBullet.html',
        onClick: () => {
            console.log('Human Bullet gallery item clicked');
            LoadContent('HumanBullet.html')
        }
    },
    {
        title:'Constellation Machine',
        description:'p5.jsで作った、インタラクティブな星空。マウスクリックで星が生まれ、星同士が線で結ばれる。バグまみれ。',
        imageUrl: constallationMachine,
        link: 'ConstellationMachine.html',
        onClick: () => {
            console.log('Constellation Machine gallery item clicked');
            LoadContent('ConstellationMachine.html')
        }
    },
    {
        title:'AnalogText',
        description:'wootingなどのアナログキーボードの押し込み具合や速度を記録するテキストエディタ。ヒートマップで打ち込まれた文字の強さや速度を可視化する。対応機種はhttps://analogsense.org/JavaScript-SDK/を参照',
        imageUrl: analogText,
        link: 'https://ogurilab.github.io/AnalogText/'
    },
    {
        title:'研究室のホームページ',
        description:'研究室のホームページ。自分の作品ではない',
        imageUrl: dclab,
        link: 'https://ogurilab.org'
    }

];

if (import.meta.hot) {
    import.meta.hot.accept('../Pages/darin', (mod) => {
        if (!mod) return
        // unknown 経由で安全にキャストし、存在チェックを行う
        const m = mod as unknown as Partial<typeof import('../Pages/darin.ts')>
        if (!m.darinContent) return
        LoadContent(createPageContent(m.darinContent).innerHTML)
    })
}



