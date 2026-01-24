
import React from 'react';
import { Job, Region, SuccessStory } from './types';
import { 
  Users, 
  UserPlus, 
  Truck, 
  Utensils, 
  TrendingUp
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'Boy', name: 'ボーイ/黒服', icon: <Users size={24} />, count: 452 },
  { id: 'Manager', name: '店長・幹部候補', icon: <TrendingUp size={24} />, count: 128 },
  { id: 'Driver', name: '送りドライバー', icon: <Truck size={24} />, count: 86 },
  { id: 'Kitchen', name: 'キッチン/バーテン', icon: <Utensils size={24} />, count: 54 },
  { id: 'Escort', name: 'フロント・エスコート', icon: <UserPlus size={24} />, count: 32 },
];

export const INDUSTRIES = [
  { id: 'Cabaret', name: 'キャバクラ' },
  { id: 'Girls Bar', name: 'ガールズバー' },
  { id: 'Club', name: '高級クラブ' },
  { id: 'Lounge', name: 'ラウンジ' },
  { id: 'Host', name: 'ホストクラブ' },
];

export const PERKS = [
  '日払いOK',
  '未経験歓迎',
  '寮・社宅完備',
  '体験入店OK',
  '送迎あり',
  'WワークOK',
  '髪型自由',
  'タトゥーOK',
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: '1',
    name: 'ケンタ',
    age: 26,
    storeName: 'Club AMBASSADOR',
    area: '新宿・歌舞伎町',
    monthlyIncome: '650,000円',
    formerIncome: '220,000円',
    formerJob: '建設業',
    catchphrase: '未経験から3ヶ月で店長代理へ昇格。人生が変わった。',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'ユウキ',
    age: 23,
    storeName: 'Lounge PHOENIX',
    area: '港区・六本木',
    monthlyIncome: '480,000円',
    formerIncome: '180,000円',
    formerJob: '飲食・居酒屋',
    catchphrase: '自由な働き方で、趣味の車もキャッシュで購入。',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'ショウ',
    age: 31,
    storeName: 'Club Ginza Royal',
    area: '中央区・銀座',
    monthlyIncome: '850,000円',
    formerIncome: '300,000円',
    formerJob: '不動産営業',
    catchphrase: '営業スキルを活かし、半年でマネージャーへ。',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    storeName: 'Club AMBASSADOR',
    industry: 'Cabaret',
    role: 'Boy',
    catchCopy: '未経験から幹部へ！寮費ずっと無料＆即入居可',
    location: '東京都新宿区歌舞伎町',
    access: 'JR新宿駅から徒歩5分',
    salary: { type: 'Monthly', amount: '350,000円〜', description: '歩合・賞与あり' },
    roleSalaries: [
      { roleName: '店長・幹部候補', amount: '月給50万円〜' },
      { roleName: 'ホールスタッフ', amount: '月給35万円〜' }
    ],
    tags: ['日払いOK', '寮・社宅完備', '社会保険', '駐車場無料', '車通勤可'],
    thumbnail: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    featured: true,
    urgent: true,
  },
  {
    id: '2',
    storeName: 'Lounge PHOENIX',
    industry: 'Lounge',
    role: 'Manager',
    catchCopy: '高収入・高待遇の極み。経験不問で即戦力を募集',
    location: '東京都港区六本木',
    access: '六本木駅から徒歩3分',
    salary: { type: 'Monthly', amount: '500,000円〜', description: '売上インセンティブ別途' },
    roleSalaries: [
      { roleName: 'マネージャー', amount: '月給60万円〜' },
      { roleName: 'アシスタント', amount: '月給40万円〜' }
    ],
    tags: ['社会保険完備', '即日内定', '体験入店OK', '駐車場無料'],
    thumbnail: 'https://images.unsplash.com/photo-1574091233051-3518665555d5?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    urgent: false,
  },
  {
    id: '3',
    storeName: 'Girls Bar Sparkle',
    industry: 'Girls Bar',
    role: 'Boy',
    catchCopy: '週2日からOK！学生・Wワーク歓迎のカジュアル店舗',
    location: '東京都豊島区池袋',
    access: '池袋駅西口から徒歩2分',
    salary: { type: 'Hourly', amount: '1,500円〜', description: '交通費支給' },
    roleSalaries: [
      { roleName: 'ホール社員', amount: '月給30万円〜' },
      { roleName: 'アルバイト', amount: '時給1,500円〜' }
    ],
    tags: ['週2日〜OK', 'Wワーク歓迎', '髪型自由', '車通勤可'],
    thumbnail: 'https://images.unsplash.com/photo-1551218372-a248969eef59?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    storeName: 'Club Ginza Royal',
    industry: 'Club',
    role: 'Escort',
    catchCopy: '銀座の伝統ある高級クラブ。一流の接客が身につく',
    location: '東京都中央区銀座',
    access: '新橋駅から徒歩4分',
    salary: { type: 'Daily', amount: '12,000円〜', description: '日払い可' },
    roleSalaries: [
      { roleName: 'フロント', amount: '日給15,000円〜' },
      { roleName: 'ホール', amount: '日給12,000円〜' }
    ],
    tags: ['未経験歓迎', '体験入店可', '送迎あり'],
    thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    isNew: false,
    urgent: true,
  },
  {
    id: '5',
    storeName: 'The Landmark Osaka',
    industry: 'Cabaret',
    role: 'Boy',
    catchCopy: '西日本最大級のグループ。安定と高収入を約束します',
    location: '大阪府大阪市北区北新地',
    access: '北新地駅から徒歩1分',
    salary: { type: 'Monthly', amount: '380,000円〜', description: '昇給随時' },
    roleSalaries: [
      { roleName: '幹部候補', amount: '月給55万円〜' },
      { roleName: '正社員', amount: '月給38万円〜' }
    ],
    tags: ['日払いOK', '寮完備', '社会保険', '駐車場無料'],
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    isNew: true,
    urgent: true,
  }
];

export const REGIONS_DATA: Record<Region, string[]> = {
  hokkaido: ['北海道'],
  tohoku: ['青森', '岩手', '宮城', '秋田', '山形', '福島'],
  kanto: ['東京', '神奈川', '埼玉', '千葉', '茨城', '栃木', '群馬'],
  chubu: ['愛知', '静岡', '岐阜', '三重', '新潟', '富山', '石川', '福井', '山梨', '長野'],
  kansai: ['大阪', '兵庫', '京都', '滋賀', '奈良', '和歌山'],
  chugoku: ['鳥取', '島根', '岡山', '広島', '山口'],
  shikoku: ['徳島', '香川', '愛媛', '高知'],
  kyushu: ['福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄']
};

export const MUNICIPALITIES_DATA: Record<string, string[]> = {
  '東京': ['新宿区', '渋谷区', '港区', '中央区', '豊島区', '台東区', '品川区', '目黒区', '世田谷区', '中野区', '杉並区', '北区', '荒川区', '板橋区', '練馬区', '足立区', '葛飾区', '江戸川区', '八王子市', '立川市', '武蔵野市', '町田市'],
  '神奈川': ['横浜市', '川崎市', '相模原市', '厚木市', '大和市', '海老名市', '藤沢市', '鎌倉市', '横須賀市', '平塚市', '茅ヶ崎市'],
  '大阪': ['大阪市北区', '大阪市中央区', '大阪市淀川区', '大阪市天王寺区', '堺市', '東大阪市', '豊中市', '吹田市', '高槻市', '枚方市', '八尾市', '寝屋川市'],
  '愛知': ['名古屋市中区', '名古屋市中村区', '名古屋市東区', '名古屋市熱田区', '一宮市', '豊橋市', '岡崎市', '豊田市', '春日井市', '安城市'],
  '福岡': ['福岡市博多区', '福岡市中央区', '福岡市早良区', '北九州市小倉北区', '久留米市', '飯塚市', '大牟田市'],
  '北海道': ['札幌市中央区', '札幌市北区', '札幌市すすきの', '旭川市', '函館市', '小樽市', '釧路市', '苫小牧市', '帯広市'],
  '宮城': ['仙台市青葉区', '仙台市宮城野区', '仙台市若林区', '石巻市', '大崎市', '名取市'],
  '兵庫': ['神戸市中央区', '神戸市兵庫区', '西宮市', '尼崎市', '姫路市', '明石市', '加古川市', '宝塚市'],
  '京都': ['京都市中京区', '京都市下京区', '京都市東山区', '京都市左京区', '宇治市', '舞鶴市'],
  '埼玉': ['さいたま市', '川口市', '川越市', '越谷市', '草加市', '所沢市', '上尾市', '熊谷市'],
  '千葉': ['千葉市中央区', '船橋市', '市川市', '松戸市', '柏市', '浦安市', '成田市', '市原市'],
  '静岡': ['静岡市葵区', '静岡市清水区', '浜松市中区', '沼津市', '富士市', '三島市'],
  '広島': ['広島市中区', '広島市南区', '福山市', '呉市', '東広島市', '尾道市'],
  '群馬': ['高崎市', '前橋市', '太田市', '伊勢崎市', '桐生市'],
  '栃木': ['宇都宮市', '小山市', '足利市', '栃木市'],
  '茨城': ['水戸市', 'つくば市', '日立市', '土浦市', 'ひたちなか市'],
  '山梨': ['甲府市', '富士吉田市', '笛吹市'],
  '長野': ['長野市', '松本市', '上田市', '佐久市'],
  '岐阜': ['岐阜市', '大垣市', '各務原市', '多治見市'],
  '三重': ['四日市市', '津市', '鈴鹿市', '松阪市'],
  '滋賀': ['大津市', '草津市', '彦根市'],
  '奈良': ['奈良市', '橿原市', '生駒市'],
  '和歌山': ['和歌山市', '田辺市', '紀の川市'],
  '岡山': ['岡山市北区', '倉敷市', '津山市'],
  '山口': ['下関市', '山口市', '宇部市', '周南市'],
  '徳島': ['徳島市', '阿南市'],
  '香川': ['高松市', '丸亀市'],
  '愛媛': ['松山市', '今治市', '新居浜市'],
  '高知': ['高知市', '南国市'],
  '佐賀': ['佐賀市', '唐津市'],
  '長崎': ['長崎市', '佐世保市', '諫早市'],
  '熊本': ['熊本市中央区', '八代市', '玉名市'],
  '大分': ['大分市', '別府市', '中津市'],
  '宮崎': ['宮崎市', '都城市', '延岡市'],
  '鹿児島': ['鹿児島市', '霧島市', '鹿屋市'],
  '沖縄': ['那覇市', '沖縄市', '宜野湾市', '浦添市']
};

export const DEFAULT_MUNICIPALITIES = ['中心部・駅周辺', '郊外エリア', '主要繁華街', '駅チカ店舗'];
