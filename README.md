# 常連（じょうれん）

> BARの常連たちと、今夜も飲み会を楽しもう。

8キャラの常連たちから自分の分身を選び、お題カードを引きながら飲み会を盛り上げる、シンプルで世界観のあるパーティーゲームPWA。

## 特徴

- スマホ1台を回し見する形式（2〜8人プレイ）
- ネット不要・LocalStorageのみ
- HTML一枚で完結
- PWA対応（ホーム画面追加可）

## 技術構成

- フロント：Vanilla JS + 単一HTML
- データ保存：LocalStorage
- 配信：GitHub Pages
- PWA：`manifest.json` + `service-worker.js`

## 開発

ローカル確認は任意の静的サーバで。例：

```
python -m http.server 8000
```

その後 `http://localhost:8000/` を開く。

## ライセンス・注意

- 画像素材はAI生成（明示の上で利用）
- 飲酒は20歳以上、お酒に弱い人はノンアル代替OK
- 飲み過ぎ注意

## 仕様書

詳細は [`SPEC_JOREN_v1.md`](./SPEC_JOREN_v1.md) を参照。
