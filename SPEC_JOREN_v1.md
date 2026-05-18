# 常連（じょうれん）アプリ実装SPEC v1.0
## 飲み会パーティーゲームPWA

---

# 0. プロジェクト概要

## アプリ名
**常連**（じょうれん）

## コンセプト
「BARの常連たちと、今夜も飲み会を楽しもう」

8キャラの常連たちから自分の分身を選び、お題カードを引きながら飲み会を盛り上げる、シンプルで世界観のあるパーティーゲームアプリ。

## 設計思想
- **儲けより普及** ：誰でも楽しめる、お酒弱い人も楽しめる
- **1台運用** ：スマホ1台を回し見、ネット不要
- **軽量** ：HTML一枚で完結、LocalStorageのみ
- **世界観重視** ：BAR・ネオン・シティポップ・8人の常連たち

## 技術スタック
- **フロント**：単一HTMLファイル + Vanilla JS（または軽量フレームワーク）
- **データ保存**：LocalStorage
- **配信**：GitHub Pages
- **PWA化**：manifest.json + Service Worker
- **画像素材**：8キャラPNG・シーン画像（ChatGPT生成版）

---

# 1. 全体仕様（確定事項一覧）

| 項目 | 仕様 |
|---|---|
| プレイ人数 | 2〜8人 |
| 運用 | スマホ1台、回し見 |
| ゲームの長さ | 自由（やめたい時に終了） |
| 終了条件 | 自由終了ボタン |
| 罰ゲームのトーン | 飲むのみ（シンプル） |
| 該当者ゼロ時 | 引いた人が代わりに飲む |
| カード重複処理 | 100枚引いたらシャッフルし直し |
| スキル発動通知 | 自動表示（発動チャンス！ポップアップ） |
| プレイヤー切り替え演出 | 渡す演出（→Aさんに渡してね、アニメ） |
| ターンの順番 | 最初ランダム、その後固定 |
| カード引く演出 | 3秒カウントダウン |
| 飲んだカウント方法 | 自動（「飲む」指示で+1） |
| キャラ被り | 禁止（じゃんけん or ランダム抽選アナウンス） |
| リセット機能 | あり（確認画面付き） |
| スタッツ画面 | シンプル（飲んだ回数ランキング） |

---

# 2. 8キャラ完全仕様

各キャラは `tags`（属性）・`skill`（スキル）・`demerit`（デメリット）・`catchphrase`（決め台詞）を持つ。

## 2.1 ビアくん

```javascript
{
  id: 'beer',
  name: 'ビアくん',
  image: 'characters/beer.png',
  tags: ['泡あり', 'ビール系', '男性', '若手組', '酒豪組'],
  bgColor: '#F5E6CB',
  skill: {
    name: 'とりあえず乾杯',
    description: '#乾杯系カードで自分が当たった時、他1人を巻き込んで一緒に乾杯',
    triggerTags: ['乾杯'],
    maxUses: 999,  // 実質無制限
    type: 'active'  // 能動発動
  },
  demerit: {
    name: '乾杯磁石',
    description: '他人の「とりあえず乾杯」スキル発動時、優先的に巻き込まれる',
    type: 'passive'
  },
  catchphrase: 'お前も飲もうぜ！'
}
```

## 2.2 ワインさん

```javascript
{
  id: 'wine',
  name: 'ワインさん',
  image: 'characters/wine.png',
  tags: ['女性', '大人組', 'ワイン系'],
  bgColor: '#E8B4B8',
  skill: {
    name: '優雅な相棒',
    description: '#ペア系カードで自分が当たった時、相方を自由に指名',
    triggerTags: ['ペア'],
    maxUses: 999,
    type: 'active'
  },
  demerit: {
    name: 'ペア指名されし者',
    description: '他人の#ペア系カードで相方候補に選ばれやすい（+50%補正）',
    type: 'passive'
  },
  catchphrase: 'あなた、付き合ってもらえる？'
}
```

## 2.3 サケじい

```javascript
{
  id: 'sake',
  name: 'サケじい',
  image: 'characters/sake.png',
  tags: ['メガネ', '和風', '男性', '大人組', '日本酒系', '老人'],
  bgColor: '#1B2845',
  skill: {
    name: '老師の記憶',
    description: '#記憶系カードで履歴を5秒間チラ見できる',
    triggerTags: ['記憶'],
    maxUses: 3,
    type: 'active'
  },
  demerit: {
    name: '老体の限界',
    description: '30分経過ごとに自動で1杯',
    type: 'timer',
    interval: 1800  // 秒
  },
  catchphrase: 'ふむ、儂が思い出してやろう'
}
```

## 2.4 カクテルちゃん

```javascript
{
  id: 'cocktail',
  name: 'カクテルちゃん',
  image: 'characters/cocktail.png',
  tags: ['泡あり', '女性', '若手組', 'カクテル系', '華やか'],
  bgColor: '#FF4D8D',
  skill: {
    name: '注目独占',
    description: '#指名系カードで他人が指名対象の時、横取りして自分が受ける',
    triggerTags: ['指名'],
    maxUses: 2,
    type: 'active'
  },
  demerit: {
    name: '人気者の宿命',
    description: '#指差し投票系で自動的に+1票補正',
    type: 'passive'
  },
  catchphrase: 'その注目、もーらった！'
}
```

## 2.5 ハイボー

```javascript
{
  id: 'highball',
  name: 'ハイボー',
  image: 'characters/highball.png',
  tags: ['男性', 'クール', 'ハイボール系', '酒豪組'],
  bgColor: '#4A7C7E',
  skill: {
    name: '鋼の喉',
    description: '#一気系カードで自分が当たった時、他2人を巻き込める',
    triggerTags: ['一気'],
    maxUses: 3,
    type: 'active'
  },
  demerit: {
    name: '氷の代償',
    description: '他人の#一気系カードで自動で1杯巻き込まれる',
    type: 'passive'
  },
  catchphrase: 'ついてこい、巻き添えな'
}
```

## 2.6 ヨッパー

```javascript
{
  id: 'yoppa',
  name: 'ヨッパー',
  image: 'characters/yoppa.png',
  tags: ['男性', '酔っ払い', '酒豪組', 'おじさん'],
  bgColor: '#8B7AA8',
  skill: {
    name: '無敵の酔っ払い',
    description: '#記憶系・#反応速度系で失敗しても罰ゲーム免除',
    triggerTags: ['記憶', '反応速度'],
    maxUses: 3,
    type: 'passive'  // 自動発動
  },
  demerit: {
    name: '酔いゲージMAX',
    description: '30分経過ごとに自動で1杯',
    type: 'timer',
    interval: 1800
  },
  catchphrase: 'あれ？何の話だっけ？'
}
```

## 2.7 マスター

```javascript
{
  id: 'master',
  name: 'マスター',
  image: 'characters/master.png',
  tags: ['男性', '大人組', '進行役', 'ミステリアス'],
  bgColor: '#E8A547',
  skill: {
    name: '店主の裁定',
    description: '#王様タイム・#命令系カードで命令内容を決める権利',
    triggerTags: ['王様', '命令'],
    maxUses: 2,
    type: 'active'
  },
  demerit: {
    name: '中立の縛り',
    description: '自分の#一気系・#指名系カードの効果が半減',
    type: 'passive'
  },
  catchphrase: 'お客さん、それは私が決めましょう'
}
```

## 2.8 シラフくん

```javascript
{
  id: 'shirafu',
  name: 'シラフくん',
  image: 'characters/shirafu.png',
  tags: ['メガネ', '男性', 'ノンアル組', '観察', '真面目'],
  bgColor: '#8FA68E',
  skill: {
    name: 'シラフの記録',
    description: '直前のお題で誰が何をしたか正確に証言できる',
    triggerTags: ['観察', '記憶'],
    maxUses: 3,
    type: 'active'
  },
  demerit: {
    name: '素面の代償',
    description: '罰ゲーム「飲む」指定時、ウーロン代替 or 別の人を指名 or 追加ミッション から選択',
    type: 'choice'
  },
  catchphrase: '全部、見ていましたよ'
}
```

---

# 3. お題100枚完全リスト

## カード構造

```javascript
{
  id: 1,
  category: '乾杯',
  hashtag: '#乾杯',
  text: 'とりあえず全員で乾杯！',
  targetType: 'all',  // 'all' | 'tag' | 'random' | 'situation' | 'self'
  targetTags: [],  // targetTypeがtagの時に使用
  drinkCount: 1,  // 飲む回数（自動カウント用）
  triggerCharacters: [],  // スキル発動可能なキャラID
  triggerTags: ['乾杯']  // スキル発動判定用タグ
}
```

## 3.1 #乾杯系（20枚）

### 全員系
1. **#乾杯** - とりあえず全員で乾杯！
2. **#復活の乾杯** - 今までで一番大変だった月を思い出して、乗り越えた自分たちに乾杯！
3. **#無言乾杯** - 一言も発さず、目線だけで全員と乾杯！
4. **#ご唱和** - 「今日も無事に終わってよかった」全員で唱和して乾杯！
5. **#叫び乾杯** - 全員で一番デカい声で「カンパーイ！」

### 状況指定系
6. **#目が合った人** - このカードを見て、最初に目が合った人と2人で乾杯！
7. **#さっきトイレ** - 直近10分以内にトイレ行った人、全員で乾杯！該当者なしなら引いた人が飲む。
8. **#飲み遅れ** - 今グラスの残量が一番多い人と乾杯！
9. **#同じ飲み物** - 今同じ飲み物を頼んでる人同士で乾杯！
10. **#左隣** - 左隣の人と理由なく乾杯！

### ペア・グループ系
11. **#ペア乾杯** - アプリがランダムで選んだ2人で乾杯！
12. **#向かい合わせ** - 真向かいに座ってる人と乾杯！
13. **#トリオ** - アプリがランダムで選んだ3人で乾杯！
14. **#ボッチ救済** - 今夜まだ誰とも個別に乾杯してない人、全員で乾杯！

### キャラ属性指定系
15. **#泡のあるキャラ** - 泡を持つキャラを選んだ人、全員で乾杯！（targetTags: ['泡あり']）
16. **#メガネのキャラ** - メガネかけてるキャラを選んだ人、全員で乾杯！（targetTags: ['メガネ']）
17. **#大人組** - 大人組のキャラを選んだ人、全員で乾杯！（targetTags: ['大人組']）
18. **#若手組** - 若手組のキャラを選んだ人、全員で乾杯！（targetTags: ['若手組']）

### 特殊・記念系
19. **#記念日** - 今日を勝手に何かの記念日にして発表、全員で乾杯！
20. **#推し乾杯** - 各自の推しの名前を叫んでから乾杯！

## 3.2 #一気系（10枚）

### ハイボー発動カード（3枚）
1. **#ハイボール談義** - ハイボーを選んだ人が一気！ハイボー未選択→引いた人が一気
2. **#一気イッキ** - 引いた人が一気！ハイボー選択者がいれば巻き添え可能
3. **#ロックの誓い** - 今ロックグラスっぽい飲み方してる人が一気！ハイボー選択者は自動対象

### 通常一気カード（7枚）
4. **#飲み干せ** - 引いた人が一気！
5. **#時計の針** - 偶数分なら引いた人、奇数分なら左隣が一気！
6. **#挑戦状** - 引いた人が1人指名、2人で同時一気バトル！負けた方はもう1杯
7. **#リーダー宣言** - 引いた人が「ついてこい！」と宣言→ 全員で一気！
8. **#数字の運命** - 全員でせーので1〜10の数字→ 合計を5で割った余りが0なら全員、1〜4は数字一致者が一気
9. **#飲み比べ** - グラスの残量が一番少ない人が一気で追いつく！
10. **#ラスト一気** - 今夜まだ一気してない人が一気！全員一気済みなら引いた人が一気

## 3.3 #指名系（15枚）

### カクテルちゃん発動カード（3枚）
1. **#みんなで指差し** - せーので「一番モテそうな人」を指差し！得票1位が一気
2. **#指名されし者** - アプリがランダムで1人選択→ 一気！カクテルちゃんは横取り可能
3. **#人気者は誰だ** - せーので「一番目立ってる人」を指差し！得票1位が一気！カクテルちゃんは+1票補正

### 通常指名カード（12枚）
4. **#ボス指名** - 引いた人が、今夜一番頼りになりそうな人を指名！
5. **#ライバル指名** - 引いた人が、ライバル視してる人を指名！2人で同時一気
6. **#感謝の指名** - 引いた人が、お世話になった人を指名！感謝伝えて乾杯
7. **#時計回り一気** - 引いた人の左隣が一気！
8. **#反時計回り一気** - 引いた人の右隣が一気！
9. **#向かい指名** - 引いた人の真向かいが一気！
10. **#ランダム指名** - アプリが完全ランダムで1人選択→ 一気！
11. **#チェーン指名** - 引いた人が次を指名 → 連鎖3人で終了
12. **#大富豪指名** - 今夜一番グラスが空いてる人を指名！
13. **#遅刻王指名** - グループで一番遅刻常習犯を指名！該当者なしなら引いた人
14. **#過去指名** - 「今までで一番一緒に飲んだ人」を指名！2人で乾杯
15. **#敵対指名** - 今夜まだ乾杯してない人を指名！2人で乾杯

## 3.4 #記憶系（15枚）

### サケじい発動カード（3枚）
1. **#1分前の記憶** - 1分前、誰が何を言いましたか？間違えた人が一気！サケじい：チラ見権
2. **#名場面リプレイ** - 直近のターンで誰がどんな罰ゲームを受けたか当てる！サケじい：チラ見権
3. **#カウンター記憶** - 自分が今夜何回飲んだか申告→ 違ったら一気！サケじい：履歴確認

### ヨッパー発動カード（3枚）
4. **#反応速度** - アプリが「3, 2, 1, ハイ！」→ 一番遅い人が一気！ヨッパー：免除
5. **#順番当て** - ゲーム開始時のターン順を復唱！外したら一気！ヨッパー：免除
6. **#誰が最後に飲んだ** - 直前に飲んだのは誰？間違えた人が一気！ヨッパー：免除

### 通常記憶系（9枚）
7. **#今夜の最初の話題** - 今夜最初の話題は何？外したら一気
8. **#隣の服装** - 全員目を閉じる→ 隣の服の色を答える！外したら一気
9. **#トイレ回数** - 今夜のトイレ回数を申告→ 違ったら一気
10. **#名前忘れ** - 今夜誰かが言った特徴的フレーズを当てる！一致しなければ全員一気
11. **#ターン記憶** - 今あなたは何ターン目？外したら一気
12. **#カクテルちゃんは何回？** - カクテルちゃん選択者が何回飲んだか？違ったら一気
13. **#伝言ゲーム** - 引いた人が短文を伝える→ 一周で変わってたら変えた人が一気
14. **#時刻当て** - 今何時何分？スマホ見ずに当てる！一番外れた人が一気
15. **#最初の乾杯** - 今夜最初の乾杯は誰が言った？外した人が一気

## 3.5 #ミッション系（15枚）

1. **#敬語禁止5分** - 5分間、敬語使ったら一気（タイマー）
2. **#名前呼び禁止** - 10分間、人の名前で呼んだら一気（タイマー）
3. **#カタカナ禁止** - 5分間、カタカナ語禁止（タイマー）
4. **#乾杯増殖** - 10分間、「乾杯」と言うたびに全員一口（タイマー）
5. **#静寂タイム** - 3分間、声を出した人が一気（タイマー）
6. **#ささやきタイム** - 5分間、ささやき声以外で喋ったら一気（タイマー）
7. **#モノマネ縛り** - 引いた人の次の発言、誰かのモノマネ必須
8. **#ポジティブ縛り** - 5分間、ネガティブワード禁止（タイマー）
9. **#感謝マシン** - 3分間、発言に感謝を入れる（タイマー）
10. **#ハイテンション** - 3分間、最高テンションキープ（タイマー）
11. **#ナレーション縛り** - 5分間、行動をナレーション風に実況（タイマー）
12. **#質問返し** - 5分間、話しかけられたら必ず質問で返す（タイマー）
13. **#語尾「にゃ」** - 3分間、全発言の語尾に「にゃ」（タイマー）
14. **#ジェスチャーのみ** - 3分間、言葉禁止（タイマー）
15. **#即興謝罪** - 引いた人が30秒間謝罪会見（アプリがお題生成）

## 3.6 #ペア系（10枚）

### ワインさん発動カード（3枚）
1. **#優雅な相棒** - ペアで乾杯！ワインさん：相方を自由指名
2. **#大人のペア** - 大人組キャラ選択者同士で乾杯！1人以下→引いた人が一気
3. **#秘密のペア** - ワインさん選択者と引いた人で乾杯！未選択→ランダム指名

### 通常ペア系（7枚）
4. **#ランダムペア** - アプリがランダムで2人選択→乾杯
5. **#目線ペア** - 目が合った2人で乾杯！合わなければ引いた人が一気
6. **#同性ペア** - 同性同士でランダムにペア
7. **#異性ペア** - 異性同士でペア！異性いなければ引いた人が一気
8. **#年齢差ペア** - 最年長と最年少で乾杯
9. **#席が遠いペア** - 席が一番離れてる2人で乾杯
10. **#握手ペア** - ランダム2人が握手→乾杯

## 3.7 #王様タイム系（5枚）

1. **#王様の命令** - 引いた人が王様→ 1人に飲み命令！マスター：命令内容決定権
2. **#真の王様** - マスター選択者が王様！未選択→引いた人が王様
3. **#命令の連鎖** - 引いた人が王様→ 飲ませた人が次の王様→ 3回連鎖で終了
4. **#王の試練** - 引いた人が全員に飲み命令！マスター：強度選択可能
5. **#投票王様** - 全員投票で王様決定！マスター：+1票補正

## 3.8 #観察系（5枚）

1. **#シラフの証言** - 直前1分間に誰が何をしたか証言！シラフくん：1人指定権
2. **#真実の観察** - 一番顔が赤い人を全員で指差し！シラフくん：正解判定権
3. **#飲み過ぎ警告** - 一番飲んでる人を指摘→ 1杯休憩！シラフくん未選択→引いた人
4. **#名場面記録** - 今夜のベストシーンを選定→ 登場した人で乾杯
5. **#静かな勝利** - 一番静かだった人を指差し→ 一気！

## 3.9 #レア・特殊系（5枚）

1. **#大逆転** - 引いた人が、今夜飲んだ回数を1回減らせる権利獲得
2. **#王冠** - 引いた人が「今夜のMVP仮認定」！30分間命令権
3. **#リセット** - 引いた人が、罰ゲーム指名を1回取り消せる権利獲得
4. **#伝説の一杯** - 全員同時に乾杯→ 一番美味そうに飲んだ人を記録！
5. **#タイムマシン** - 全員で1分前の自分を演じ直す！失敗者が一気

---

# 4. 画面遷移

## 4.1 全体フロー

```
[起動画面]
   ↓
[プレイヤー登録]
   ├─ 名前入力（複数人）
   ├─ キャラ選択モード選択
   │   ├─ じゃんけんで自分で選ぶ
   │   └─ ランダム抽選
   └─ ゲーム開始ボタン
   ↓
[ターン順発表]
   ↓
[ゲームメイン]
   ├─ 現在のプレイヤー表示
   ├─ カードを引くボタン
   ├─ 3秒カウントダウン
   ├─ お題カード表示
   ├─ スキル発動チェック（自動ポップアップ）
   ├─ お題実行
   └─ 次のターンへ（渡す演出）
   ↓
[終了ボタン → スタッツ画面]
   ├─ 飲んだ回数ランキング
   ├─ マスターからの一言
   └─ もう一度プレイ / 終了
```

## 4.2 各画面の詳細

### 起動画面

```
┌────────────────────┐
│   🌙 常連          │
│                    │
│  〜BARの常連たちと  │
│   今夜も飲もう〜    │
│                    │
│  [ はじめる ]      │
│  [ 続きから ]      │
│                    │
└────────────────────┘
```

### プレイヤー登録画面

```
┌────────────────────┐
│ 参加者を登録        │
├────────────────────┤
│ 1. [_______]       │
│ 2. [_______]       │
│ 3. [_______]       │
│ 4. [_______]       │
│ [ + 追加 ]         │
│                    │
│ キャラ選択方法：    │
│ ○ 自分で選ぶ        │
│ ● ランダム抽選      │
│                    │
│ [ キャラ決定へ ]    │
└────────────────────┘
```

### キャラ選択画面（自分で選ぶモード）

```
┌────────────────────┐
│ 福澤さんのキャラ選択 │
├────────────────────┤
│ ※他の人とじゃんけん  │
│ で順番決めてね！     │
│                    │
│ [🍺] [🍷] [🍶] [🍸] │
│ ビア ワイン サケ カクテル│
│                    │
│ [🥃] [🍺] [👔] [🥤] │
│ ハイボ ヨッパ マス シラフ│
│                    │
│ ※選択済み：A→ワインさん│
└────────────────────┘
```

### キャラ選択画面（ランダム抽選）

```
┌────────────────────┐
│ ガチャ抽選中...     │
├────────────────────┤
│   🎰 ガラガラ...    │
│                    │
│ 福澤さん → 🍺ビアくん │
│ Aさん    → 🍷ワインさん│
│ Bさん    → 🍶サケじい │
│ Cさん    → 🥤シラフくん│
│                    │
│ [ 決定 ]            │
└────────────────────┘
```

### ターン順発表画面

```
┌────────────────────┐
│ 今夜のターン順      │
├────────────────────┤
│ 1. Aさん（ワイン）   │
│ 2. 福澤さん（ビア）  │
│ 3. Cさん（シラフ）   │
│ 4. Bさん（ヨッパ）   │
│                    │
│ [ ゲーム開始！ ]    │
└────────────────────┘
```

### ゲームメイン画面

```
┌────────────────────┐
│ 🌙 常連 - Round 5  │
├────────────────────┤
│ 現在のターン        │
│ 👤 福澤さん         │
│ 🍺 ビアくん          │
├────────────────────┤
│                    │
│  [ カードを引く ]   │
│                    │
├────────────────────┤
│ 🍺 2回 | ⚡3/3      │
├────────────────────┤
│ ⚙ メニュー  📊 統計 │
└────────────────────┘
```

### 3秒カウントダウン画面

```
┌────────────────────┐
│                    │
│        3           │
│                    │
│     カードを        │
│     引くよ...       │
│                    │
└────────────────────┘
```

### お題カード表示画面

```
┌────────────────────┐
│ #乾杯               │
├────────────────────┤
│ [シーン画像]         │
│                    │
│ とりあえず全員で乾杯！│
│                    │
│ 対象：全員          │
│                    │
│ [ 実行した ]        │
└────────────────────┘
```

### スキル発動ポップアップ

```
┌────────────────────┐
│ ⚡ スキル発動チャンス │
├────────────────────┤
│ 🍺 ビアくん          │
│ 「とりあえず乾杯」   │
│                    │
│ "お前も飲もうぜ！"   │
│                    │
│ 他1人を巻き込めます │
│                    │
│ [ 発動する ]        │
│ [ パスする ]        │
└────────────────────┘
```

### プレイヤー切り替え（渡す演出）

```
┌────────────────────┐
│                    │
│       →            │
│   Aさんに渡してね   │
│   🍷 ワインさん     │
│                    │
│ [ 受け取った ]      │
└────────────────────┘
```

### スタッツ画面（終了時）

```
┌────────────────────┐
│ 🌙 今夜の常連       │
├────────────────────┤
│ 🍺 飲んだランキング  │
│ 1位 福澤さん 8回    │
│ 2位 Bさん   7回     │
│ 3位 Aさん   4回     │
│ 4位 Cさん   0回     │
│                    │
├────────────────────┤
│ [マスターからの一言] │
│                    │
│ 今夜もよく飲みまし  │
│ たね。気をつけてお  │
│ 帰りを。            │
│ また、ここでお待ち  │
│ しています。        │
│   ──マスター        │
├────────────────────┤
│ [ もう一度 ]        │
│ [ 終了 ]            │
└────────────────────┘
```

### リセット確認画面

```
┌────────────────────┐
│ リセットしますか？  │
├────────────────────┤
│ 現在のゲームデータ  │
│ がすべて消えます。   │
│                    │
│ [ キャンセル ]      │
│ [ リセット ]        │
└────────────────────┘
```

---

# 5. データ構造

## 5.1 LocalStorage キー設計

```javascript
const STORAGE_KEYS = {
  GAME_STATE: 'joren_game_state',  // 現在のゲーム状態
  PLAYERS: 'joren_players',         // 参加者情報
  CARD_HISTORY: 'joren_card_history',  // カード履歴
  CARD_DECK: 'joren_card_deck',     // 現在のデッキ
  GAME_START_TIME: 'joren_game_start_time',  // ゲーム開始時刻
  STATS: 'joren_stats',             // 累積統計
  SETTINGS: 'joren_settings'        // 設定（ライトモード等）
};
```

## 5.2 ゲーム状態

```javascript
{
  status: 'playing',  // 'idle' | 'playing' | 'finished'
  currentTurn: 0,     // 現在のターン番号
  currentPlayerIndex: 0,  // 現在のプレイヤーindex
  startTime: 1234567890,  // ゲーム開始時刻（タイムスタンプ）
  lightMode: false,   // お酒弱い人モード
  activeMissions: [   // 進行中のミッション
    {
      cardId: 1,
      endTime: 1234567890,
      type: 'tabooWord',
      target: '敬語'
    }
  ]
}
```

## 5.3 プレイヤー情報

```javascript
[
  {
    id: 'p1',
    name: '福澤',
    characterId: 'beer',
    drinkCount: 2,
    skillUsedCount: 1,
    isLightMode: false  // 個別ライトモード
  },
  // ... 最大8人
]
```

## 5.4 カード履歴

```javascript
[
  {
    turn: 1,
    timestamp: 1234567890,
    cardId: 1,
    drawnBy: 'p1',
    targets: ['p1', 'p2', 'p3', 'p4'],
    skillTriggered: null,
    drinkers: ['p1', 'p2', 'p3', 'p4']
  }
]
```

## 5.5 カードデッキ

```javascript
{
  remaining: [1, 2, 3, ...],  // 未使用カードID
  used: [],                    // 使用済みカードID
  totalDrawn: 0                // 通算引き枚数
}
```

---

# 6. ゲームロジック

## 6.1 カード抽選フロー

```javascript
function drawCard() {
  const deck = getDeck();
  
  // 全カード使い切ったらシャッフル
  if (deck.remaining.length === 0) {
    deck.remaining = shuffleArray([...allCards].map(c => c.id));
    deck.used = [];
  }
  
  // ランダムでカードID取得
  const randomIndex = Math.floor(Math.random() * deck.remaining.length);
  const cardId = deck.remaining[randomIndex];
  
  // デッキから削除
  deck.remaining.splice(randomIndex, 1);
  deck.used.push(cardId);
  deck.totalDrawn++;
  
  saveDeck(deck);
  return getCardById(cardId);
}
```

## 6.2 対象者判定

```javascript
function determineTargets(card, players, drawnBy) {
  switch (card.targetType) {
    case 'all':
      return players.map(p => p.id);
    
    case 'tag':
      // 属性タグマッチング
      const matched = players.filter(p => {
        const character = getCharacterById(p.characterId);
        return card.targetTags.some(tag => character.tags.includes(tag));
      });
      
      // 該当者ゼロ → 引いた人が代わりに飲む
      if (matched.length === 0) {
        return [drawnBy];
      }
      return matched.map(p => p.id);
    
    case 'random':
      // ランダム1人
      return [players[Math.floor(Math.random() * players.length)].id];
    
    case 'situation':
      // その場で決まる（目が合った人等）
      return [];  // UIで選ばせる
    
    case 'self':
      return [drawnBy];
    
    default:
      return [drawnBy];
  }
}
```

## 6.3 スキル発動判定

```javascript
function checkSkillTrigger(card, players) {
  const triggers = [];
  
  players.forEach(player => {
    const character = getCharacterById(player.characterId);
    const skill = character.skill;
    
    // 発動条件チェック
    const hasMatchingTag = card.triggerTags.some(tag => 
      skill.triggerTags.includes(tag)
    );
    
    // 残り回数チェック
    const remainingUses = skill.maxUses - player.skillUsedCount;
    
    if (hasMatchingTag && remainingUses > 0) {
      triggers.push({
        playerId: player.id,
        characterId: character.id,
        skillName: skill.name,
        catchphrase: character.catchphrase,
        type: skill.type,  // 'active' | 'passive'
        remainingUses: remainingUses
      });
    }
  });
  
  return triggers;
}
```

## 6.4 飲んだカウント

```javascript
function recordDrink(playerId, count = 1) {
  const players = getPlayers();
  const player = players.find(p => p.id === playerId);
  player.drinkCount += count;
  savePlayers(players);
}
```

## 6.5 タイマーデメリット（サケじい・ヨッパー）

```javascript
function checkTimerDemerits() {
  const gameState = getGameState();
  const elapsed = (Date.now() - gameState.startTime) / 1000;
  
  const players = getPlayers();
  players.forEach(player => {
    const character = getCharacterById(player.characterId);
    if (character.demerit.type === 'timer') {
      const interval = character.demerit.interval;
      const triggerCount = Math.floor(elapsed / interval);
      
      if (triggerCount > player.demeritTriggeredCount) {
        // 通知発火
        showDemeritNotification(player, character.demerit);
        player.demeritTriggeredCount = triggerCount;
      }
    }
  });
}

// 30秒ごとにチェック
setInterval(checkTimerDemerits, 30000);
```

## 6.6 ミッション系タイマー管理

```javascript
function startMission(cardId, duration) {
  const gameState = getGameState();
  gameState.activeMissions.push({
    cardId: cardId,
    startTime: Date.now(),
    endTime: Date.now() + duration * 1000,
    duration: duration
  });
  saveGameState(gameState);
  
  // 終了通知
  setTimeout(() => {
    endMission(cardId);
  }, duration * 1000);
}

function endMission(cardId) {
  const gameState = getGameState();
  gameState.activeMissions = gameState.activeMissions.filter(
    m => m.cardId !== cardId
  );
  saveGameState(gameState);
  showMissionEnd(cardId);
}
```

---

# 7. UI仕様

## 7.1 デザイン方針

- **配色**：ダークネイビー基調（深夜BAR感）+ アクセントネオン
- **フォント**：システムフォント（軽量、可読性重視）
- **ボタン**：大きめタップエリア（45px以上）
- **画像**：8キャラPNG + シーン画像
- **アニメーション**：CSS transition、軽量に

## 7.2 カラーパレット

```css
:root {
  --color-bg-primary: #1B2845;     /* Deep Navy */
  --color-bg-secondary: #2D3A5C;
  --color-text-primary: #F5E6CB;   /* Cream */
  --color-accent-1: #FF4D8D;       /* Neon Pink */
  --color-accent-2: #E8A547;       /* Amber */
  --color-accent-3: #4A7C7E;       /* Teal */
  --color-success: #8FA68E;        /* Sage Green */
  --color-danger: #E74C3C;
}
```

## 7.3 主要アニメーション

```css
/* 3秒カウントダウン */
@keyframes countdown {
  0% { transform: scale(2); opacity: 0; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.5); opacity: 0; }
}

/* カードめくり */
@keyframes cardFlip {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}

/* スキル発動 */
@keyframes skillTrigger {
  0% { transform: scale(0); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 渡す演出 */
@keyframes handover {
  0% { transform: translateX(-50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
```

---

# 8. ファイル構成

```
joren/
├── index.html              # アプリ本体（全部入り）
├── manifest.json           # PWA設定
├── service-worker.js       # オフライン対応
├── README.md
├── assets/
│   ├── characters/
│   │   ├── beer.png
│   │   ├── wine.png
│   │   ├── sake.png
│   │   ├── cocktail.png
│   │   ├── highball.png
│   │   ├── yoppa.png
│   │   ├── master.png
│   │   └── shirafu.png
│   ├── scenes/
│   │   ├── cheers.png
│   │   ├── drink-up.png
│   │   ├── pointing.png
│   │   ├── pair.png
│   │   ├── memory.png
│   │   ├── mission.png
│   │   ├── king.png
│   │   └── observation.png
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   └── sounds/             # （Phase 2で追加）
│       ├── countdown.mp3
│       ├── card-flip.mp3
│       └── skill-trigger.mp3
└── data/
    ├── cards.js            # 100枚お題データ
    └── characters.js       # 8キャラ定義
```

---

# 9. 実装フェーズ

## Phase 1（最優先・1〜2週間）

- [ ] プロジェクト初期化（HTML一枚、PWA化）
- [ ] プレイヤー登録画面
- [ ] キャラ選択（手動・ランダム両対応）
- [ ] ターン順決定（最初ランダム、その後固定）
- [ ] カード抽選機能
- [ ] 3秒カウントダウン演出
- [ ] お題カード表示
- [ ] 対象者判定（属性タグマッチング）
- [ ] スキル発動自動通知
- [ ] 飲んだ自動カウント
- [ ] プレイヤー切り替え（渡す演出）
- [ ] リセット機能
- [ ] 終了画面（スタッツ + マスター演出）

## Phase 2（追加機能・1週間）

- [ ] タイマーデメリット（サケじい・ヨッパー）
- [ ] ミッション系タイマー管理
- [ ] お酒弱い人モード
- [ ] 夜が深まるステージ進化
- [ ] BGM・効果音
- [ ] シェア機能（結果画像生成）

## Phase 3（拡張）

- [ ] 連鎖・コンボ演出
- [ ] 隠しカード解禁
- [ ] キャラ相性発動
- [ ] グループモード（複数回プレイの統計）

---

# 10. 開発の注意点

## 10.1 おばあさんアプリの教訓を活かす

- 単一HTMLファイルで完結（メンテ容易）
- LocalStorage活用（サーバー不要）
- PWA化で「アプリ感」演出
- GitHub Pagesで無料配信

## 10.2 飲み会で実際に使われることを想定

- **タップエリアは大きく**（酔った手でもタップ可能）
- **文字は読みやすく**（暗い居酒屋でも読める）
- **音は控えめに**（騒がしい店内）
- **操作はシンプルに**（説明不要で遊べる）

## 10.3 1台運用ゆえの配慮

- **画面の受け渡し演出**を明確に
- **誰のターンか**を常に画面上部に表示
- **スキル発動**は全員で見ても問題ない演出

## 10.4 個人再生中の福澤さんの状況

- 商用販売は弁護士確認後
- 当面は身内無料配布のみ
- AI画像のまま運用可（明示すれば問題なし）

---

# 11. リスクと対策

| リスク | 対策 |
|---|---|
| 飲み過ぎ事故 | 「お酒弱い人モード」「ノンアル代替OK」明示 |
| 未成年使用 | 起動時に年齢確認（20歳以上のみ） |
| 酔いタップミス | リセット機能、確認画面 |
| プライバシー | 個人情報を取得しない、LocalStorageのみ |
| 著作権 | AI生成画像であることを明示 |

---

# 12. テストシナリオ

## 12.1 基本フロー

1. アプリ起動 → 「はじめる」タップ
2. 4人登録（福澤・A・B・C）
3. ランダム抽選で各自にキャラ割り当て
4. ターン順発表 → ゲーム開始
5. 10ターンプレイ → 終了 → スタッツ表示

## 12.2 エッジケース

- [ ] 該当者ゼロカードの処理
- [ ] スキル残り0回時の発動制限
- [ ] 100枚使い切り時のシャッフル
- [ ] タイマー系ミッション中の他カード引き
- [ ] リセット → 再開
- [ ] アプリ閉じる → 続きから

---

# 13. 完了の定義（Phase 1）

以下が全部動けばPhase 1完了：

- [ ] 4人で30分プレイ可能
- [ ] 100枚のお題が全て読み込まれる
- [ ] 各キャラのスキルが正しく発動する
- [ ] 飲んだ回数が正確にカウントされる
- [ ] スタッツ画面が正しく表示される
- [ ] iPhoneとAndroidで動作確認
- [ ] PWAとしてホーム画面追加可能
- [ ] GitHub Pagesで公開URL動作

---

# 14. 引き継ぎ事項（Claude Codeへ）

このSPECを元に実装を進めてください。

- 既存プロジェクト「dorimyu-next」とは**完全に別リポジトリ**で作成
- 個人GitHubアカウントで新規リポジトリ「joren」を作成
- 開発スタイルは「**ゆっくり・1タスク1コミット**」
- 不明点は福澤さんに確認
- AI画像素材は別途提供

---

以上、「常連」アプリ実装SPEC v1.0 完成。
