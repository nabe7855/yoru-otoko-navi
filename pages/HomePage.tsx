import React, { useEffect, useRef, useState } from "react";
import JapanMap from "../components/JapanMap";
import { EMPLOYMENT_TYPES } from "../constants";

interface HomePageProps {
  onSearch: (filters: any) => void;
}

const BANNERS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1200",
    title: "新CM放送中！",
    subtitle: "ナイトジョブJPの魅力が詰まった特別映像を公開",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200",
    title: "アプリ限定！スカウト機能",
    subtitle: "あなたにぴったりの店舗から直接オファーが届きます",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
    title: "高還元キャンペーン実施中",
    subtitle: "体験入店でもボーナス支給対象に！",
  },
];

const PICKUP_COMPANIES = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/fedex.com",
    company: "株式会社エフティーライン",
    title: "大型貨物自動車ドライバー",
    description: "物流センターと営業所間の幹線輸送です。",
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/kt.com",
    company: "HaNa船橋ヘルパーステーション",
    title: "訪問介護ヘルパー",
    description: "介護を必要とされている高齢者の方のご自宅を訪問。",
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/ajisen.com.cn",
    company: "株式会社味泉",
    title: "液体調味料の生産パート",
    description: "製品の仕分け、検品、梱包などを担っていただきます。",
  },
];

const TRENDING_KEYWORDS = [
  "大型ドライバー",
  "ハワイ 正社員",
  "三井記念美術館",
  "運転免許試験場",
  "巫女",
  "60歳以上シニア",
  "みかん収穫 住み込み",
  "定年なし 女性清掃",
  "郵便局 清掃",
  "除染作業員 危険手当",
];

const SUPERVISORS = [
  {
    name: "木野 綾子",
    title: "法律事務所キノール東京 代表弁護士",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "黒田 真行",
    title: "ルーセントドアーズ株式会社 代表取締役",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "佐野 幸雄",
    title: "佐野幸雄税理士事務所",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "高野 秀敏",
    title: "株式会社キープレイヤーズ 代表取締役",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "森本 千賀子",
    title: "株式会社morich 代表取締役",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
  },
];

const FEATURED_LINKS = [
  {
    title: "転職・中途採用の求人",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "2026・27 新卒採用・インターンシップ情報",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "語学を活かせる求人",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "ミドル・シニア（中高年）歓迎求人",
    img: "https://images.unsplash.com/photo-1544333346-64e4fe18274b?auto=format&fit=crop&q=80&w=400",
  },
];

const MAP_REGIONS = [
  {
    name: "北海道・東北",
    prefs: ["北海道", "宮城", "青森", "岩手", "秋田", "山形", "福島"],
  },
  {
    name: "関東",
    prefs: ["東京", "神奈川", "千葉", "埼玉", "栃木", "茨城", "群馬"],
  },
  {
    name: "中部",
    prefs: [
      "愛知",
      "静岡",
      "新潟",
      "石川",
      "福井",
      "富山",
      "長野",
      "山梨",
      "岐阜",
      "三重",
    ],
  },
  { name: "近畿", prefs: ["大阪", "兵庫", "京都", "滋賀", "奈良", "和歌山"] },
  {
    name: "中国・四国",
    prefs: [
      "広島",
      "岡山",
      "山口",
      "鳥取",
      "島根",
      "香川",
      "徳島",
      "高知",
      "愛媛",
    ],
  },
  {
    name: "九州・沖縄",
    prefs: ["福岡", "長崎", "大分", "佐賀", "熊本", "宮崎", "鹿児島", "沖縄"],
  },
];

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  if (!onSearch) return null;
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("");
  const [empType, setEmpType] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [salaryTab, setSalaryTab] = useState<"regular" | "part" | "dispatch">(
    "regular",
  );
  const pickupScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    onSearch({ category: keyword, pref: area, employmentType: empType });
  };

  const getFullPrefName = (pref: string) => {
    if (pref === "北海道") return "北海道";
    if (pref === "東京") return "東京都";
    if (pref === "大阪" || pref === "京都") return pref + "府";
    return pref + "県";
  };

  return (
    <div className="bg-white">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[320px] md:h-[400px] bg-gradient-to-r from-blue-50 to-indigo-100 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=2000"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40"
        />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-2xl">
            <div className="text-indigo-600 font-bold text-sm mb-3 tracking-widest uppercase animate-fade-in">
              Nightjob JP is your optimal career match.
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              仕事探しは、
              <br />
              <span className="text-indigo-600">NightJob JP。</span>
            </h1>
            <div className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-indigo-200">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full mr-1">
                求人掲載数
              </span>
              <span>2,000 万件以上</span>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[88px] md:bottom-[68px] z-20 w-full max-w-4xl px-4">
          <div className="inline-block bg-[#5bc0de] text-white px-4 py-1.5 rounded-t-lg text-sm font-bold shadow-sm">
            本日更新の新着求人{" "}
            <span className="text-lg font-black ml-1">4,484,586</span> 件
          </div>
        </div>
      </div>

      {/* Search Console Section */}
      <div className="container mx-auto px-4 relative z-30 -mt-20">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-1 md:p-2 bg-gray-100/50 flex flex-col md:flex-row gap-0">
            <div className="flex-1 min-w-0 bg-white border-b md:border-b-0 md:border-r border-gray-200">
              <select
                className="w-full h-14 pl-4 pr-10 bg-transparent text-gray-700 font-medium focus:outline-none appearance-none cursor-pointer"
                value={empType}
                onChange={(e) => setEmpType(e.target.value)}
              >
                <option value="">働き方・雇用形態</option>
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-[2] min-w-0 bg-white border-b md:border-b-0 md:border-r border-gray-200 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                <i className="fas fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="職種、業種、働き方など"
                className="w-full h-14 pl-12 pr-16 bg-transparent text-gray-700 font-medium focus:outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="flex-[2] min-w-0 bg-white border-b md:border-b-0 border-gray-200 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <input
                type="text"
                placeholder="都道府県、市区町村、駅名"
                className="w-full h-14 pl-12 pr-4 bg-transparent text-gray-700 font-medium focus:outline-none"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
            <div className="md:w-32 bg-white md:p-0 p-2">
              <button
                onClick={handleSearch}
                className="w-full h-14 bg-[#337ab7] hover:bg-[#286090] text-white font-bold text-lg transition"
              >
                検索
              </button>
            </div>
          </div>
        </div>

        {/* AREA SEARCH */}
        <div className="mt-20 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-gray-800 tracking-widest uppercase mb-2">
              AREA SEARCH
            </h2>
            <div className="w-16 h-0.5 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-500 text-sm mt-4">
              地図から都道府県を選択してください
            </p>
          </div>
          <JapanMap
            onPrefectureClick={(prefName) => onSearch({ pref: prefName })}
          />
        </div>

        {/* Banners */}
        <div className="mt-12 mb-20 space-y-8">
          <div className="bg-[#5bc0de] rounded-xl overflow-hidden relative p-6 md:px-12 md:py-8 border-b-4 border-[#46b8da] flex flex-col md:flex-row items-center justify-between cursor-pointer">
            <div className="text-white text-lg md:text-2xl font-bold flex flex-wrap items-center gap-2 z-10">
              <span>求人ボックスへの</span>
              <div className="bg-white text-[#5bc0de] px-4 py-1 rounded mx-1">
                広告掲載
              </div>
              <span>や</span>
              <div className="bg-white text-[#5bc0de] px-4 py-1 rounded mx-1">
                採用
              </div>
              <span>のお問い合わせはこちら！</span>
            </div>
            <div className="mt-4 md:mt-0 flex items-end">
              <img
                src="https://img.icons8.com/bubbles/200/businesswoman.png"
                alt="staff"
                className="w-24 md:w-32 z-10"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#337ab7]/30 overflow-hidden shadow-md flex flex-col md:flex-row min-h-[140px] cursor-pointer">
            <div className="w-full md:w-[220px] bg-[#e1f5fe] flex items-center justify-center p-6 border-r border-[#337ab7]/10">
              <img
                src="https://img.icons8.com/bubbles/200/business-man-in-blue-suit.png"
                alt="Agent"
                className="w-24 md:w-32"
              />
            </div>
            <div className="flex-grow p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="bg-[#37474f] text-white px-5 py-3 rounded text-sm font-bold text-center">
                  求人ボックス
                  <br />
                  <span className="text-[10px] opacity-70">
                    転職エージェントなら
                  </span>
                </div>
                <div className="text-2xl md:text-4xl font-black text-[#37474f] relative">
                  <span className="relative z-10">非公開求人</span>
                  <div className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 -z-0"></div>
                </div>
                <div className="text-lg md:text-2xl font-bold text-[#37474f]">
                  の紹介ができます
                </div>
              </div>
              <button className="whitespace-nowrap border-2 border-[#337ab7] text-[#337ab7] font-bold px-8 py-2.5 rounded hover:bg-[#337ab7] hover:text-white transition">
                詳しくはこちら
              </button>
            </div>
          </div>
        </div>

        {/* 仕事探しトピックス Section */}
        <section className="mt-32 mb-20">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-black text-blue-500 mb-6">
              仕事探しトピックス
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              求人ボックスが日々収集している求人データをもとに、
              <br />
              仕事探しのヒントになるデータと記事をお届けしています。
            </p>
          </div>

          <div className="mt-16">
            <div className="flex items-center mb-8">
              <div className="w-1 h-6 bg-blue-400 mr-3"></div>
              <h3 className="text-2xl font-bold text-gray-800 mr-3">
                全国のお仕事情報
              </h3>
              <i className="far fa-question-circle text-gray-400 cursor-pointer"></i>
              <button className="ml-4 px-4 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-500">
                エリアを変更
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Average Salary Card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] mr-2">
                    <i className="fas fa-yen-sign"></i>
                  </div>
                  <h4 className="font-bold text-gray-700">全国での平均給与</h4>
                </div>

                <div className="flex space-x-8 border-b border-gray-100 mb-8">
                  <button
                    onClick={() => setSalaryTab("regular")}
                    className={`pb-3 text-sm font-bold transition-colors ${
                      salaryTab === "regular"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    正社員
                  </button>
                  <button
                    onClick={() => setSalaryTab("part")}
                    className={`pb-3 text-sm font-bold transition-colors ${
                      salaryTab === "part"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    アルバイト・パート
                  </button>
                  <button
                    onClick={() => setSalaryTab("dispatch")}
                    className={`pb-3 text-sm font-bold transition-colors ${
                      salaryTab === "dispatch"
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    派遣社員
                  </button>
                </div>

                <div className="mb-8">
                  <span className="inline-block w-3 h-3 bg-orange-400 mr-2"></span>
                  <span className="text-gray-500 text-sm mr-2">平均月給 :</span>
                  <span className="text-3xl font-black text-orange-500">
                    30.4万円
                  </span>
                </div>

                <div className="flex items-end justify-between h-32 gap-1 px-4 border-b border-gray-100 pb-1">
                  {[30, 45, 60, 100, 45, 30, 20, 15, 10, 8].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-t-sm ${
                        i === 3 ? "bg-orange-400" : "bg-blue-100"
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
                  <span>~22.9万円</span>
                  <span>66.4万円~</span>
                </div>
              </div>

              {/* Trending Keywords Card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] mr-2">
                    <i className="fas fa-crown"></i>
                  </div>
                  <h4 className="font-bold text-gray-700">
                    急上昇検索求人キーワード
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {TRENDING_KEYWORDS.map((word, i) => (
                    <div
                      key={i}
                      className="flex items-center group cursor-pointer border-b border-gray-50 pb-2"
                    >
                      <span
                        className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold mr-3 ${
                          i < 3
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600 group-hover:text-blue-500 group-hover:underline truncate">
                        {word}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 今週のお仕事ピックアップ Section */}
        <section className="bg-[#5bc0de] -mx-4 px-4 py-20 mt-12 mb-20 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              今週のお仕事ピックアップ
            </h2>
            <p className="text-white text-sm md:text-base opacity-90 mb-12">
              求人ボックス 給料ナビなら、多様な仕事の給与情報が満載！
            </p>

            <div className="relative group">
              <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-left relative">
                <div className="flex items-center mb-8 border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl md:text-2xl font-black text-gray-700">
                    RPAの年収・時給・給料情報
                  </h3>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="flex-1 w-full">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="px-3 py-1 border border-gray-200 text-gray-500 text-sm font-bold rounded">
                        正社員
                      </span>
                      <span className="text-gray-500 text-sm">平均年収 :</span>
                      <span className="text-3xl font-black text-orange-500">
                        510万円
                      </span>
                    </div>
                    <div className="flex items-end h-24 gap-1.5 border-b border-gray-100 pb-1 px-2">
                      {[60, 50, 45, 45, 40, 30, 20, 20, 15, 12].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-t-sm ${
                            i === 2 ? "bg-orange-300" : "bg-blue-100"
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
                      <span>~362万円</span>
                      <span>1,058万円~</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <div className="p-4 bg-white border border-blue-200 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-gray-400 text-xs font-bold mb-1">
                      派遣社員
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-400 text-[10px] font-bold">
                        平均時給 :
                      </span>
                      <span className="text-2xl font-black text-orange-500">
                        2,100円
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white border border-blue-200 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-gray-400 text-xs font-bold mb-1">
                      アルバイト・パート
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-400 text-[10px] font-bold">
                        平均時給 :
                      </span>
                      <span className="text-2xl font-black text-orange-500">
                        1,250円
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-gray-600 text-sm leading-loose mb-8">
                  <p>
                    RPAの仕事の平均年収は約
                    <span className="font-bold border-b-4 border-blue-300 inline-block px-1">
                      510万円
                    </span>
                    。日本の平均年収と比較すると
                    <span className="font-bold border-b-4 border-blue-300 inline-block px-1">
                      高い
                    </span>
                    傾向にあります。
                    <br />
                    月給で換算すると
                    <span className="font-bold border-b-4 border-blue-300 inline-block px-1">
                      43万円
                    </span>
                    、初任給は
                    <span className="font-bold border-b-4 border-blue-300 inline-block px-1">
                      24万円
                    </span>
                    程度が相場のようで、派遣社員やアルバイト・パートでは平均時給がそれぞれ
                    <br />
                    <span className="font-bold border-b-4 border-blue-300 inline-block px-1">
                      2,100円
                    </span>
                    、
                    <span className="font-bold border-b-4 border-blue-300 inline-block px-1">
                      1,250円
                    </span>
                    となっています。
                  </p>
                </div>

                <div className="text-center pt-4 border-t border-dashed border-gray-200">
                  <button className="text-blue-600 font-bold hover:underline">
                    給料ナビでもっと見る
                  </button>
                </div>
              </div>

              <button className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-400 hover:text-blue-600 z-20 transition group">
                <i className="fas fa-chevron-right text-xl group-hover:translate-x-0.5 transition"></i>
              </button>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === 0 ? "bg-white" : "bg-white/40"
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>
        </section>

        {/* Featured Category Links Section */}
        <section className="mt-20 mb-12 relative">
          <div className="flex items-center justify-between mb-8 overflow-hidden">
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-blue-500 hover:bg-gray-50 shrink-0">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="flex-grow flex gap-4 overflow-x-auto no-scrollbar px-4">
              {FEATURED_LINKS.map((link, i) => (
                <div
                  key={i}
                  className="min-w-[240px] md:min-w-[280px] h-28 relative rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img
                    src={link.img}
                    alt={link.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center p-4">
                    <span className="text-white font-bold text-center text-sm md:text-base leading-snug drop-shadow-md">
                      {link.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-blue-500 hover:bg-gray-50 shrink-0">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Work With Us Banner Section */}
        <section className="mb-20">
          <div className="bg-[#4dd0e1] rounded-xl overflow-hidden relative min-h-[160px] md:min-h-[200px] flex items-center shadow-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4dd0e1] via-[#4dd0e1]/90 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&q=80&w=1200"
              alt="Team"
              className="absolute right-0 top-0 h-full w-2/3 object-cover object-center"
            />
            <div className="relative z-20 px-8 md:px-16 w-full flex flex-col md:flex-row items-center justify-between gap-6">
              <h2 className="text-2xl md:text-4xl font-black text-white text-center md:text-left drop-shadow-sm">
                NightJob JPで一緒に働きませんか？
              </h2>
              <button className="bg-white text-blue-400 font-bold px-10 py-3.5 rounded-full flex items-center hover:bg-blue-50 transition shadow-lg group-hover:scale-105">
                採用サイトはこちら{" "}
                <i className="fas fa-chevron-right ml-3 text-xs"></i>
              </button>
            </div>
          </div>
        </section>

        {/* Trust & Compliance Section */}
        <section className="mb-20 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-gray-100 pt-16">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 border-4 border-yellow-400 rounded-full"></div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white px-2 text-[10px] font-black text-yellow-600">
                第 1 位
              </div>
              <div className="text-center">
                <div className="text-indigo-900 font-black text-sm">
                  オリコン
                </div>
                <div className="text-[10px] text-gray-500 font-bold">
                  顧客満足度
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 font-bold text-sm mb-1 leading-snug">
                2025年 オリコン顧客満足度®調査
                <br />
                求人情報サービス 第1位
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center p-3 shrink-0">
              <i className="fas fa-user-check text-white text-3xl"></i>
            </div>
            <div>
              <p className="text-blue-600 font-bold text-lg mb-1">
                優良募集情報等提供事業者
              </p>
              <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
                2301014(01)1230
              </p>
            </div>
          </div>
        </section>

        {/* Useful Articles Section */}
        <div className="mt-24">
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-blue-400 mr-3"></div>
            <h3 className="text-2xl font-bold text-gray-800">
              仕事探しに役立つ記事
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "転職ノウハウ",
                desc: "転職活動中のあらゆるお悩みを解決",
                color: "bg-yellow-50",
                icon: "fa-question-circle",
              },
              {
                title: "バイトの探し方ガイド",
                desc: "アルバイト探しのお役立ち情報が盛りだくさん！",
                color: "bg-blue-50",
                icon: "fa-lightbulb",
              },
              {
                title: "適職診断",
                desc: "向いてる仕事を5分で診断！",
                color: "bg-indigo-50",
                icon: "fa-user-check",
              },
              {
                title: "あなたのバイト図監",
                desc: "究極の二択で見つける！",
                color: "bg-slate-100",
                icon: "fa-book-open",
              },
            ].map((art, i) => (
              <div
                key={i}
                className={`flex items-center p-6 rounded-xl border border-gray-100 cursor-pointer hover:shadow-md transition ${art.color}`}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mr-6 shrink-0">
                  <i className={`fas ${art.icon} text-3xl text-slate-400`}></i>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-blue-500 mb-1">
                    {art.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-bold">{art.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Supervisors Section */}
        <div className="mt-24 pb-12">
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-blue-400 mr-3"></div>
            <h3 className="text-2xl font-bold text-gray-800">
              記事監修者{" "}
              <span className="text-sm font-normal text-gray-400 ml-2">
                (一部、五十音順)
              </span>
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-12 leading-loose">
            求人ボックスでは、プロのキャリアアドバイザーや弁護士・社労士などの資格をもった各分野のスペシャリストに、記事の監修や指導を依頼し良質なコンテンツをお届けします。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {SUPERVISORS.map((sup) => (
              <div
                key={sup.name}
                className="flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-lg ring-4 ring-gray-50">
                  <img
                    src={sup.img}
                    alt={sup.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-1 mb-2 inline-block">
                  {sup.name}
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-bold">
                  {sup.title}
                </p>
              </div>
            ))}
          </div>
          <div className="text-right mt-12">
            <button className="text-gray-400 hover:text-blue-500 font-bold text-sm flex items-center justify-end ml-auto group">
              監修者をもっとみる{" "}
              <i className="fas fa-chevron-right ml-2 text-xs group-hover:translate-x-1 transition"></i>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
