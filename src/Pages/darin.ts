import type { Page } from './pageContent'
import darinImage from '../Resource/Darin/Darin.jpg'
import darinprototype from '../Resource/Darin/DarinPrototype.jpg'
import darinprototype2 from '../Resource/Darin/DarinPrototype2.jpg'
import mark2 from '../Resource/Darin/mark2.jpg'
import roterMk2 from '../Resource/Darin/roterMk2.mp4'
import touch from '../Resource/Darin/touchSensor.jpg'


export const darinContent: Page = {
    title: '舵のまにまに',
    content: [
        {
            type: 'p',
            src: '学生チャレンジプロジェクトの一環として、TGS2025で展示された作品。光っている柄を持ちながらでないと操縦ができない船でタイムアタックをするゲーム。'
        },
        {
            type: 'img',
            src: darinImage,
            caption: '操舵輪の外観。愛工大祭の工科展にて'
        },
        {
            type: 'p',
            src:'光っている柄を持って回さないと方向転換できない船を操作し、タイムアタックをするゲーム。光る柄は一定時間でランダムに変更されるため、舵輪の持ち方を賢く選ぶ必要がある。'

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
            src: 'Mark2までのプロトタイプ作成は2025年7月のオープンキャンパスに向けて作られた。回転センサーとタッチセンサーを組み合わせて、舵輪の回転と持ち方を検知することができるようになっている。配線剥き出しで立て付けが悪いのでとてもスリルのあるゲーム体験ができる。'
        }
    ]
}