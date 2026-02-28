import type { Page } from './pageContent'
import darinImage from '../Resource/Darin/Darin.jpg'
import darinprototype from '../Resource/Darin/DarinPrototype.jpg'
import darinprototype2 from '../Resource/Darin/DarinPrototype2.jpg'
import mark2 from '../Resource/Darin/mark2.jpg'
const roterMk2 = 'roterMk2.mp4'
import touch from '../Resource/Darin/touchSensor.jpg'
import darinExhibition from '../Resource/Darin/darinExhibition.jpg'
import darinExhibition2 from '../Resource/Darin/darinExhibition2.jpg'
import darinFinal from '../Resource/Darin/darinFinal.jpg'
import darinFinal2 from '../Resource/Darin/darinFinal2.jpg'


export const darinContent: Page = {
    title: '舵のまにまに',
    content: [
        {
            type: 'p',
            src: '学生チャレンジプロジェクトの一環として、TGS2025で展示された作品。光っている柄を持って回さないと方向転換できない船を操作し、タイムアタックをするゲーム。光る柄は一定時間でランダムに変更されるため、舵輪の持ち方を賢く選ぶ必要がある。'
        },
        {
            type: 'a',
            src: 'https://www.4gamer.net/games/999/G999901/20251002052/',
            caption: 'TGS2025での展示の様子が4gamerに掲載されました。'

        },
        {
            type: 'img',
            src: darinImage,
            caption: '操舵輪の外観。愛工大祭の工科展にて'
        },
        {
            type: 'p',
            src: `Mark2までのプロトタイプ作成は2025年7月のオープンキャンパスに向けて作られた。
回転センサーとタッチセンサーを組み合わせて、舵輪の回転と持ち方を検知することができるようになっている。配線剥き出しで立て付けが悪いのでとてもスリルのあるゲーム体験ができる。`

        },
        
        {
            type: 'img',
            src: darinprototype,
            caption: 'プロトタイプmark1の様子。右についているレゴの部品は、回転センサーを保護するためのもの'
        },
        {
            type: 'img',
            src: darinprototype2,
            caption: 'あ…'
        },
        {
            type: 'video',
            src: roterMk2,
            caption: '回転センサーの様子。回転センサーは、舵輪の回転を検知するためのもので、M5StickCPlusに接続し、有線でPCに繋いでいる。レゴの外装は上の写真のものを改良したMark2'
        },
        {
            type: 'img',
            src: touch,
            caption: 'タッチセンサーの様子。タッチセンサーは、舵輪の持ち方を検知するためのもので、Arduinoに接続されている。プロトタイプ時点では上記のものとは別にもう一台M5StickCPlusを用意し、BluetoothでPCに接続している'
        },
        {
            type: 'img',
            src: mark2,
            caption: 'タッチセンサーの様子。タッチセンサーは、舵輪の持ち方を検知するためのもので、Arduinoに接続されている。プロトタイプ時点では上記のものとは別にもう一台M5StickCPlusを用意し、BluetoothでPCに接続している'
        },
        {
            type: 'p',
            src: `展覧会では、互いのチームの作品を遊ぶことができた。そこでの評価をもとに、改良点を洗い出した。`
        },
        {
            type: 'img',
            src: darinExhibition,
            caption: '学内での展覧会の様子。Mark2に改良を加え、回転センサーとタッチセンサーを一台のM5StickCPlusで処理するようにした。LEDはその時に追加されたのだが、ただでさえ多い配線がさらに増えて、タチの悪いスパゲッティと化している。'
        },
        {
            type: 'img',
            src: darinExhibition2,
            caption: 'ゲームを試遊する教授。'
        },
        {
            type: 'p',
            src: 'TGS2025では、Mark2をさらに改良したものを展示した。LEDを操舵輪に埋め込み、配線を溝に沿わせて固定したことで、安全性が大幅に向上した。さらに、筐体を合板で作り直してベアリングユニットを取り付けたことで筐体の強度が高まり、回転もスムーズになった。その上、回転センサーの外装を3dプリンターで作り直したので、回転センサーの保護性能も向上した。'
        },
        {
            type: 'img',
            src: darinFinal,
            caption: 'TGS2025での展示の様子。'
        },
        {
            type: 'img',
            src: darinFinal2,
            caption: 'チームの集合写真。筆者は一番右。'
        }

       

    ]
}