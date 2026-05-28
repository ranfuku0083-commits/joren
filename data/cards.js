// 常連 - 100枚お題完全データ（SPEC v1.0 §3 準拠）
//
// カード構造:
//   id              : 1〜100 の通し番号
//   category        : 大分類（乾杯 / 一気 / 指名 / 記憶 / ミッション / ペア / 王様 / 観察 / 特殊）
//   hashtag         : 表示用 #ハッシュタグ
//   text            : お題本文
//   targetType      : 'all' | 'tag' | 'random' | 'situation' | 'self'
//   targetTags      : targetType='tag' の時に使う属性タグ
//   drinkCount      : 自動カウント加算量（ミッション・権利系は0）
//   duration        : ミッション系の制限時間（秒）。無い場合は null
//   triggerCharacters: SPEC上「○○発動カード」と明示されたキャラID（参考メタ）
//   triggerTags     : スキル発動判定に使うタグ
//
// targetType の判断指針:
//   全員系 → 'all'
//   キャラ属性で絞り込む → 'tag' + targetTags
//   アプリがランダム選択 → 'random'
//   現場の状況（目線・席順・グラス残量等）→ 'situation'（UIで選ばせる）
//   引いた人本人 → 'self'

const CARDS = [
  // ========= 3.1 #乾杯系（20枚） =========
  // -- 全員系 --
  { id: 1, category: '乾杯', hashtag: '#乾杯', text: 'とりあえず全員で乾杯！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 2, category: '乾杯', hashtag: '#復活の乾杯', text: '今までで一番大変だった月を思い出して、乗り越えた自分たちに乾杯！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 3, category: '乾杯', hashtag: '#無言乾杯', text: '一言も発さず、目線だけで全員と乾杯！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 4, category: '乾杯', hashtag: '#ご唱和', text: '「今日も無事に終わってよかった」全員で唱和して乾杯！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 5, category: '乾杯', hashtag: '#叫び乾杯', text: '全員で一番デカい声で「カンパーイ！」', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  // -- 状況指定系 --
  { id: 6, category: '乾杯', hashtag: '#目が合った人', text: 'このカードを見て、最初に目が合った人と2人で乾杯！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 7, category: '乾杯', hashtag: '#さっきトイレ', text: '直近10分以内にトイレ行った人、全員で乾杯！該当者なしなら引いた人が飲む。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 8, category: '乾杯', hashtag: '#飲み遅れ', text: '今グラスの残量が一番多い人と乾杯！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 9, category: '乾杯', hashtag: '#同じ飲み物', text: '今同じ飲み物を頼んでる人同士で乾杯！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 10, category: '乾杯', hashtag: '#左隣', text: '左隣の人と理由なく乾杯！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  // -- ペア・グループ系 --
  { id: 11, category: '乾杯', hashtag: '#ペア乾杯', text: 'アプリがランダムで選んだ2人で乾杯！', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer', 'wine'], triggerTags: ['乾杯', 'ペア'] },
  { id: 12, category: '乾杯', hashtag: '#向かい合わせ', text: '真向かいに座ってる人と乾杯！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 13, category: '乾杯', hashtag: '#トリオ', text: 'アプリがランダムで選んだ3人で乾杯！', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 14, category: '乾杯', hashtag: '#ボッチ救済', text: '今夜まだ誰とも個別に乾杯してない人、全員で乾杯！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  // -- キャラ属性指定系 --
  { id: 15, category: '乾杯', hashtag: '#泡のあるキャラ', text: '泡を持つキャラを選んだ人、全員で乾杯！', targetType: 'tag', targetTags: ['泡あり'], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 16, category: '乾杯', hashtag: '#メガネのキャラ', text: 'メガネかけてるキャラを選んだ人、全員で乾杯！', targetType: 'tag', targetTags: ['メガネ'], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 17, category: '乾杯', hashtag: '#大人組', text: '大人組のキャラを選んだ人、全員で乾杯！', targetType: 'tag', targetTags: ['大人組'], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 18, category: '乾杯', hashtag: '#若手組', text: '若手組のキャラを選んだ人、全員で乾杯！', targetType: 'tag', targetTags: ['若手組'], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  // -- 特殊・記念系 --
  { id: 19, category: '乾杯', hashtag: '#記念日', text: '今日を勝手に何かの記念日にして発表、全員で乾杯！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },
  { id: 20, category: '乾杯', hashtag: '#推し乾杯', text: '各自の推しの名前を叫んでから乾杯！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['beer'], triggerTags: ['乾杯'] },

  // ========= 3.2 #一気系（10枚） =========
  // -- ハイボー発動カード（3枚） --
  { id: 21, category: '一気', hashtag: '#ハイボール談義', text: 'ハイボーを選んだ人が一気！ハイボー未選択なら引いた人が一気。', targetType: 'tag', targetTags: ['ハイボール系'], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 22, category: '一気', hashtag: '#一気イッキ', text: '引いた人が一気！ハイボー選択者がいれば巻き添え可能。', targetType: 'self', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 23, category: '一気', hashtag: '#ロックの誓い', text: '今ロックグラスっぽい飲み方してる人が一気！ハイボー選択者は自動対象。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  // -- 通常一気カード（7枚） --
  { id: 24, category: '一気', hashtag: '#飲み干せ', text: '引いた人が一気！', targetType: 'self', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 25, category: '一気', hashtag: '#時計の針', text: '偶数分なら引いた人、奇数分なら左隣が一気！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 26, category: '一気', hashtag: '#挑戦状', text: '引いた人が1人指名、2人で同時一気バトル！負けた方はもう1杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気', '指名'] },
  { id: 27, category: '一気', hashtag: '#リーダー宣言', text: '引いた人が「ついてこい！」と宣言→全員で一気！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 28, category: '一気', hashtag: '#数字の運命', text: '全員でせーので1〜10の数字→合計を5で割った余りが0なら全員、1〜4は数字一致者が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 29, category: '一気', hashtag: '#飲み比べ', text: 'グラスの残量が一番少ない人が一気で追いつく！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },
  { id: 30, category: '一気', hashtag: '#ラスト一気', text: '今夜まだ一気してない人が一気！全員一気済みなら引いた人が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['highball'], triggerTags: ['一気'] },

  // ========= 3.3 #指名系（15枚） =========
  // -- カクテルちゃん発動カード（3枚） --
  { id: 31, category: '指名', hashtag: '#みんなで指差し', text: 'せーので「一番モテそうな人」を指差し！得票1位が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 32, category: '指名', hashtag: '#指名されし者', text: 'アプリがランダムで1人選択→一気！カクテルちゃんは横取り可能。', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 33, category: '指名', hashtag: '#人気者は誰だ', text: 'せーので「一番目立ってる人」を指差し！得票1位が一気！カクテルちゃんは+1票補正。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  // -- 通常指名カード（12枚） --
  { id: 34, category: '指名', hashtag: '#ボス指名', text: '引いた人が、今夜一番頼りになりそうな人を指名！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 35, category: '指名', hashtag: '#ライバル指名', text: '引いた人が、ライバル視してる人を指名！2人で同時一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 36, category: '指名', hashtag: '#感謝の指名', text: '引いた人が、お世話になった人を指名！感謝伝えて乾杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 37, category: '指名', hashtag: '#時計回り一気', text: '引いた人の左隣が一気！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名', '一気'] },
  { id: 38, category: '指名', hashtag: '#反時計回り一気', text: '引いた人の右隣が一気！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名', '一気'] },
  { id: 39, category: '指名', hashtag: '#向かい指名', text: '引いた人の真向かいが一気！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 40, category: '指名', hashtag: '#ランダム指名', text: 'アプリが完全ランダムで1人選択→一気！', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 41, category: '指名', hashtag: '#チェーン指名', text: '引いた人が次を指名→連鎖3人で終了。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 42, category: '指名', hashtag: '#大富豪指名', text: '今夜一番グラスが空いてる人を指名！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 43, category: '指名', hashtag: '#遅刻王指名', text: 'グループで一番遅刻常習犯を指名！該当者なしなら引いた人。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名'] },
  { id: 44, category: '指名', hashtag: '#過去指名', text: '「今までで一番一緒に飲んだ人」を指名！2人で乾杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名', '乾杯'] },
  { id: 45, category: '指名', hashtag: '#敵対指名', text: '今夜まだ乾杯してない人を指名！2人で乾杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['cocktail'], triggerTags: ['指名', '乾杯'] },

  // ========= 3.4 #記憶系（15枚） =========
  // -- サケじい発動カード（3枚） --
  { id: 46, category: '記憶', hashtag: '#1分前の記憶', text: '1分前、誰が何を言いましたか？間違えた人が一気！サケじいはチラ見権。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 47, category: '記憶', hashtag: '#名場面リプレイ', text: '直近のターンで誰がどんな罰ゲームを受けたか当てる！サケじいはチラ見権。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 48, category: '記憶', hashtag: '#カウンター記憶', text: '自分が今夜何回飲んだか申告→違ったら一気！サケじいは履歴確認可能。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  // -- ヨッパー発動カード（3枚） --
  { id: 49, category: '記憶', hashtag: '#反応速度', text: 'アプリが「3, 2, 1, ハイ！」→一番遅い人が一気！ヨッパーは免除。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['yoppa'], triggerTags: ['反応速度'] },
  { id: 50, category: '記憶', hashtag: '#順番当て', text: 'ゲーム開始時のターン順を復唱！外したら一気！ヨッパーは免除。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['yoppa'], triggerTags: ['記憶', '反応速度'] },
  { id: 51, category: '記憶', hashtag: '#誰が最後に飲んだ', text: '直前に飲んだのは誰？間違えた人が一気！ヨッパーは免除。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['yoppa', 'sake'], triggerTags: ['記憶'] },
  // -- 通常記憶系（9枚） --
  { id: 52, category: '記憶', hashtag: '#今夜の最初の話題', text: '今夜最初の話題は何？外したら一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 53, category: '記憶', hashtag: '#隣の服装', text: '全員目を閉じる→隣の服の色を答える！外したら一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 54, category: '記憶', hashtag: '#トイレ回数', text: '今夜のトイレ回数を申告→違ったら一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 55, category: '記憶', hashtag: '#名前忘れ', text: '今夜誰かが言った特徴的フレーズを当てる！一致しなければ全員一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 56, category: '記憶', hashtag: '#ターン記憶', text: '今あなたは何ターン目？外したら一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 57, category: '記憶', hashtag: '#カクテルちゃんは何回？', text: 'カクテルちゃん選択者が何回飲んだか？違ったら一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 58, category: '記憶', hashtag: '#伝言ゲーム', text: '引いた人が短文を伝える→一周で変わってたら変えた人が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 59, category: '記憶', hashtag: '#時刻当て', text: '今何時何分？スマホ見ずに当てる！一番外れた人が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },
  { id: 60, category: '記憶', hashtag: '#最初の乾杯', text: '今夜最初の乾杯は誰が言った？外した人が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['sake'], triggerTags: ['記憶'] },

  // ========= 3.5 #ミッション系（15枚） =========
  { id: 61, category: 'ミッション', hashtag: '#敬語禁止5分', text: '5分間、敬語使ったら一気。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 300, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 62, category: 'ミッション', hashtag: '#名前呼び禁止', text: '10分間、人の名前で呼んだら一気。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 600, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 63, category: 'ミッション', hashtag: '#カタカナ禁止', text: '5分間、カタカナ語禁止。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 300, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 64, category: 'ミッション', hashtag: '#乾杯増殖', text: '10分間、「乾杯」と言うたびに全員一口。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 600, triggerCharacters: [], triggerTags: ['ミッション', '乾杯'] },
  { id: 65, category: 'ミッション', hashtag: '#静寂タイム', text: '3分間、声を出した人が一気。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 180, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 66, category: 'ミッション', hashtag: '#ささやきタイム', text: '5分間、ささやき声以外で喋ったら一気。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 300, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 67, category: 'ミッション', hashtag: '#モノマネ縛り', text: '引いた人の次の発言、誰かのモノマネ必須。', targetType: 'self', targetTags: [], drinkCount: 0, duration: null, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 68, category: 'ミッション', hashtag: '#ポジティブ縛り', text: '5分間、ネガティブワード禁止。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 300, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 69, category: 'ミッション', hashtag: '#感謝マシン', text: '3分間、発言に感謝を入れる。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 180, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 70, category: 'ミッション', hashtag: '#ハイテンション', text: '3分間、最高テンションキープ。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 180, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 71, category: 'ミッション', hashtag: '#ナレーション縛り', text: '5分間、行動をナレーション風に実況。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 300, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 72, category: 'ミッション', hashtag: '#質問返し', text: '5分間、話しかけられたら必ず質問で返す。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 300, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 73, category: 'ミッション', hashtag: '#語尾「にゃ」', text: '3分間、全発言の語尾に「にゃ」。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 180, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 74, category: 'ミッション', hashtag: '#ジェスチャーのみ', text: '3分間、言葉禁止。', targetType: 'all', targetTags: [], drinkCount: 0, duration: 180, triggerCharacters: [], triggerTags: ['ミッション'] },
  { id: 75, category: 'ミッション', hashtag: '#即興謝罪', text: '引いた人が30秒間謝罪会見（アプリがお題生成）。', targetType: 'self', targetTags: [], drinkCount: 0, duration: 30, triggerCharacters: [], triggerTags: ['ミッション'] },

  // ========= 3.6 #ペア系（10枚） =========
  // -- ワインさん発動カード（3枚） --
  { id: 76, category: 'ペア', hashtag: '#優雅な相棒', text: 'ペアで乾杯！ワインさんは相方を自由指名。', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  { id: 77, category: 'ペア', hashtag: '#大人のペア', text: '大人組キャラ選択者同士で乾杯！1人以下なら引いた人が一気。', targetType: 'tag', targetTags: ['大人組'], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  { id: 78, category: 'ペア', hashtag: '#秘密のペア', text: 'ワインさん選択者と引いた人で乾杯！未選択なら引いた人とランダム1人。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  // -- 通常ペア系（7枚） --
  { id: 79, category: 'ペア', hashtag: '#ランダムペア', text: 'アプリがランダムで2人選択→乾杯。', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  { id: 80, category: 'ペア', hashtag: '#目線ペア', text: '目が合った2人で乾杯！合わなければ引いた人が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  { id: 81, category: 'ペア', hashtag: '#同性ペア', text: '同性同士でランダムにペア。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア'] },
  { id: 82, category: 'ペア', hashtag: '#異性ペア', text: '異性同士でペア！異性いなければ引いた人が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア'] },
  { id: 83, category: 'ペア', hashtag: '#年齢差ペア', text: '最年長と最年少で乾杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  { id: 84, category: 'ペア', hashtag: '#席が遠いペア', text: '席が一番離れてる2人で乾杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },
  { id: 85, category: 'ペア', hashtag: '#握手ペア', text: 'ランダム2人が握手→乾杯。', targetType: 'random', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['wine'], triggerTags: ['ペア', '乾杯'] },

  // ========= 3.7 #王様タイム系（5枚） =========
  { id: 86, category: '王様', hashtag: '#王様の命令', text: '引いた人が王様→1人に飲み命令！マスターは命令内容決定権。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['master'], triggerTags: ['王様', '命令'] },
  { id: 87, category: '王様', hashtag: '#真の王様', text: 'マスター選択者が王様！未選択なら引いた人が王様。', targetType: 'tag', targetTags: ['進行役'], drinkCount: 1, duration: null, triggerCharacters: ['master'], triggerTags: ['王様', '命令'] },
  { id: 88, category: '王様', hashtag: '#命令の連鎖', text: '引いた人が王様→飲ませた人が次の王様→3回連鎖で終了。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['master'], triggerTags: ['王様', '命令'] },
  { id: 89, category: '王様', hashtag: '#王の試練', text: '引いた人が全員に飲み命令！マスターは強度選択可能。', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['master'], triggerTags: ['王様', '命令'] },
  { id: 90, category: '王様', hashtag: '#投票王様', text: '全員投票で王様決定！マスターは+1票補正。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['master'], triggerTags: ['王様', '命令'] },

  // ========= 3.8 #観察系（5枚） =========
  { id: 91, category: '観察', hashtag: '#シラフの証言', text: '直前1分間に誰が何をしたか証言！シラフくんは1人指定権。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['shirafu'], triggerTags: ['観察', '記憶'] },
  { id: 92, category: '観察', hashtag: '#真実の観察', text: '一番顔が赤い人を全員で指差し！シラフくんは正解判定権。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['shirafu'], triggerTags: ['観察'] },
  { id: 93, category: '観察', hashtag: '#飲み過ぎ警告', text: '一番飲んでる人を指摘→1杯休憩！シラフ未選択なら引いた人。', targetType: 'situation', targetTags: [], drinkCount: 0, duration: null, triggerCharacters: ['shirafu'], triggerTags: ['観察'] },
  { id: 94, category: '観察', hashtag: '#名場面記録', text: '今夜のベストシーンを選定→登場した人で乾杯。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['shirafu'], triggerTags: ['観察', '乾杯'] },
  { id: 95, category: '観察', hashtag: '#静かな勝利', text: '一番静かだった人を指差し→一気！', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: ['shirafu'], triggerTags: ['観察'] },

  // ========= 3.9 #レア・特殊系（5枚） =========
  { id: 96, category: '特殊', hashtag: '#大逆転', text: '引いた人が、今夜飲んだ回数を1回減らせる権利獲得。', targetType: 'self', targetTags: [], drinkCount: 0, duration: null, triggerCharacters: [], triggerTags: ['特殊'] },
  { id: 97, category: '特殊', hashtag: '#王冠', text: '引いた人が「今夜のMVP仮認定」！30分間命令権。', targetType: 'self', targetTags: [], drinkCount: 0, duration: null, triggerCharacters: [], triggerTags: ['特殊', '命令'] },
  { id: 98, category: '特殊', hashtag: '#リセット', text: '引いた人が、罰ゲーム指名を1回取り消せる権利獲得。', targetType: 'self', targetTags: [], drinkCount: 0, duration: null, triggerCharacters: [], triggerTags: ['特殊'] },
  { id: 99, category: '特殊', hashtag: '#伝説の一杯', text: '全員同時に乾杯→一番美味そうに飲んだ人を記録！', targetType: 'all', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: [], triggerTags: ['特殊', '乾杯'] },
  { id: 100, category: '特殊', hashtag: '#タイムマシン', text: '全員で1分前の自分を演じ直す！失敗者が一気。', targetType: 'situation', targetTags: [], drinkCount: 1, duration: null, triggerCharacters: [], triggerTags: ['特殊'] },

  // ========= 3.10 #サブゲーム発火（1枚） =========
  // 引くとサブゲームをランダムで起動する。サブゲーム完了後にターン消費。
  { id: 101, category: 'サブゲーム', hashtag: '#マスターの気まぐれ', text: 'マスターの気まぐれでサブゲーム開始！ランダムで「21」「キャラルーレット」「ハイ&ロー」「真実か挑戦か」のいずれかが始まる。', targetType: 'self', targetTags: [], drinkCount: 0, duration: null, triggerCharacters: ['master'], triggerTags: ['特殊'] }
];

// グローバル公開（モジュール非対応の単一HTML構成のため）
if (typeof window !== 'undefined') {
  window.CARDS = CARDS;
}
