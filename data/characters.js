// 常連 - 8キャラ完全データ（SPEC v1.0 §2 準拠）
//
// 各キャラは tags（属性）/ skill（スキル）/ demerit（デメリット）/ catchphrase（決め台詞）を持つ。
// skill.maxUses が 999 のものは実質無制限。

const CHARACTERS = [
  {
    id: 'beer',
    name: 'ビアくん',
    image: 'assets/characters/beer.png',
    tags: ['泡あり', 'ビール系', '男性', '若手組', '酒豪組'],
    bgColor: '#F5E6CB',
    skill: {
      name: 'とりあえず乾杯',
      description: '#乾杯系カードで自分が当たった時、他1人を巻き込んで一緒に乾杯',
      triggerTags: ['乾杯'],
      maxUses: 3,
      type: 'active',
      actionLabel: '1人巻き込む'
    },
    demerit: {
      name: '乾杯磁石',
      description: '他人の「とりあえず乾杯」スキル発動時、優先的に巻き込まれる',
      type: 'passive'
    },
    catchphrase: 'お前も飲もうぜ！'
  },
  {
    id: 'wine',
    name: 'ワインさん',
    image: 'assets/characters/wine.png',
    tags: ['女性', '大人組', 'ワイン系'],
    bgColor: '#E8B4B8',
    skill: {
      name: '優雅な相棒',
      description: '#ペア系カードで自分が当たった時、相方を自由に指名',
      triggerTags: ['ペア'],
      maxUses: 3,
      type: 'active',
      actionLabel: '相方を指名する'
    },
    demerit: {
      name: 'ペア指名されし者',
      description: '他人の#ペア系カードで相方候補に選ばれやすい（+50%補正）',
      type: 'passive'
    },
    catchphrase: 'あなた、付き合ってもらえる？'
  },
  {
    id: 'sake',
    name: 'サケじい',
    image: 'assets/characters/sake.png',
    tags: ['メガネ', '和風', '男性', '大人組', '日本酒系', '老人'],
    bgColor: '#1B2845',
    skill: {
      name: '老師の記憶',
      description: '#記憶系カードで履歴を5秒間チラ見できる',
      triggerTags: ['記憶'],
      maxUses: 3,
      type: 'active',
      actionLabel: '履歴を見る'
    },
    demerit: {
      name: '老体の限界',
      description: '30分経過ごとに自動で1杯',
      type: 'timer',
      interval: 1800
    },
    catchphrase: 'ふむ、儂が思い出してやろう'
  },
  {
    id: 'cocktail',
    name: 'カクテルちゃん',
    image: 'assets/characters/cocktail.png',
    tags: ['泡あり', '女性', '若手組', 'カクテル系', '華やか'],
    bgColor: '#FF4D8D',
    skill: {
      name: '注目独占',
      description: '#指名系カードで他人が指名対象の時、横取りして自分が受ける',
      triggerTags: ['指名'],
      maxUses: 2,
      type: 'active',
      actionLabel: '注目を横取り'
    },
    demerit: {
      name: '人気者の宿命',
      description: '#指差し投票系で自動的に+1票補正',
      type: 'passive'
    },
    catchphrase: 'その注目、もーらった！'
  },
  {
    id: 'highball',
    name: 'ハイボー',
    image: 'assets/characters/highball.png',
    tags: ['男性', 'クール', 'ハイボール系', '酒豪組'],
    bgColor: '#4A7C7E',
    skill: {
      name: '鋼の喉',
      description: '#一気系カードで自分が当たった時、他2人を巻き込める',
      triggerTags: ['一気'],
      maxUses: 3,
      type: 'active',
      actionLabel: '2人巻き込む'
    },
    demerit: {
      name: '氷の代償',
      description: '他人の#一気系カードで自動で1杯巻き込まれる',
      type: 'passive'
    },
    catchphrase: 'ついてこい、巻き添えな'
  },
  {
    id: 'yoppa',
    name: 'ヨッパー',
    image: 'assets/characters/yoppa.png',
    tags: ['男性', '酔っ払い', '酒豪組', 'おじさん'],
    bgColor: '#8B7AA8',
    skill: {
      name: '無敵の酔っ払い',
      description: '#記憶系・#反応速度系で失敗しても罰ゲーム免除',
      triggerTags: ['記憶', '反応速度'],
      maxUses: 3,
      type: 'passive',
      actionLabel: '失敗しても飲まない'
    },
    demerit: {
      name: '酔いゲージMAX',
      description: '30分経過ごとに自動で1杯',
      type: 'timer',
      interval: 1800
    },
    catchphrase: 'あれ？何の話だっけ？'
  },
  {
    id: 'master',
    name: 'マスター',
    image: 'assets/characters/master.png',
    tags: ['男性', '大人組', '進行役', 'ミステリアス'],
    bgColor: '#E8A547',
    skill: {
      name: '店主の裁定',
      description: '#王様タイム・#命令系カードで命令内容を決める権利',
      triggerTags: ['王様', '命令'],
      maxUses: 2,
      type: 'active',
      actionLabel: '命令を決める'
    },
    demerit: {
      name: '中立の縛り',
      description: '自分の#一気系・#指名系カードの効果が半減',
      type: 'passive'
    },
    catchphrase: 'お客さん、それは私が決めましょう'
  },
  {
    id: 'shirafu',
    name: 'シラフくん',
    image: 'assets/characters/shirafu.png',
    tags: ['メガネ', '男性', 'ノンアル組', '観察', '真面目'],
    bgColor: '#8FA68E',
    skill: {
      name: 'シラフの記録',
      description: '直前のお題で誰が何をしたか正確に証言できる',
      triggerTags: ['観察', '記憶'],
      maxUses: 3,
      type: 'active',
      actionLabel: '証言する'
    },
    demerit: {
      name: '素面の代償',
      description: '罰ゲーム「飲む」指定時、ウーロン代替 or 別の人を指名 or 追加ミッション から選択',
      type: 'choice'
    },
    catchphrase: '全部、見ていましたよ'
  }
];

// グローバル公開（モジュール非対応の単一HTML構成のため）
if (typeof window !== 'undefined') {
  window.CHARACTERS = CHARACTERS;
}
