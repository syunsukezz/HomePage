import type { Page } from "./pageContent";
import cab from '../Resource/cab.jpg'

export const aboutContent: Page = {
    title: 'このページについて',
    content: [
        {
            type: 'p',
            src: 'このサイトでは、syunsukezzが作成したゲームや作品を紹介している。主なツールはUnityで、このページはvite,TypeScriptで作成されている。'
        },
        {
            type: 'p',
            src: 'サイトの内容は随時更新される予定。'
        },
        {
            type: 'img',
            src: 'icon.png',
            caption: 'Syunsukezzのアイコン。画像のキャプションには、figcaption要素を使っています。'
        },
        {
            type: 'img',
            src: cab,
            caption: '筆者のスーパーカブ。'
        }


    ]
}