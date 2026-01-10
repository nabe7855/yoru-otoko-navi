
export const CATEGORIES = [
  'キャバクラ',
  'ガールズバー',
  'スナック',
  'ラウンジ',
  'ホストクラブ',
  'バー',
  'クラブ',
  'ニュークラブ',
  'ショークラブ'
];

export const PREFECTURES = [
  '東京都', '神奈川県', '埼玉県', '千葉県', '大阪府', '京都府', '兵庫県', '愛知県', '福岡県', '北海道', '沖縄県'
];

export const TAGS = [
  '日払いOK',
  '未経験歓迎',
  '経験者優遇',
  '送迎あり',
  '寮・社宅あり',
  '託児所あり',
  '自由シフト',
  '週1日からOK',
  'お酒飲めなくてOK',
  'ドレス貸出あり',
  'ノルマなし',
  'Wワーク歓迎'
];

export const EMPLOYMENT_TYPES = [
  '正社員', 'アルバイト', '業務委託', '体験入店'
];

export const SALARY_TYPES = [
  { value: 'hourly', label: '時給' },
  { value: 'daily', label: '日給' },
  { value: 'monthly', label: '月給' }
];

export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export const PERSONALITY_TAGS = [
  '聞き上手', '盛り上げ役', '癒やし系', 'テキパキ', '真面目', 
  '個性的', '落ち着いている', '社交的', 'マメな性格', 'おしゃれ好き'
];

export const LIFESTYLE_OPTIONS = [
  '夜型（深夜OK）', '朝型（昼間メイン）', '週末メイン', '短時間集中', 'ガッツリ稼ぎたい'
];

export const MATCHING_QUESTIONS = [
  {
    id: 'area',
    question: 'まずは、希望の勤務エリアを教えてください！',
    options: PREFECTURES.slice(0, 6)
  },
  {
    id: 'income',
    question: '希望する月収の目安は？',
    options: ['10万円〜', '20万円〜', '30万円〜', '50万円以上！']
  },
  {
    id: 'shift',
    question: '週に何日くらい働きたいですか？',
    options: ['週1〜2日', '週3〜4日', '週5日以上（ガッツリ）', '単発・不定期']
  },
  {
    id: 'time',
    question: '得意な時間帯はありますか？',
    options: ['昼・夕方', '夜（20時〜）', '深夜（24時〜）', 'いつでもOK']
  },
  {
    id: 'personality',
    question: '自分の強みを選ぶならどれ？',
    options: ['聞き上手', '盛り上げ役', '真面目・正確', 'おしゃれ・個性']
  }
];
