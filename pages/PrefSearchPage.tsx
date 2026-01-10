import React from "react";

interface PrefSearchPageProps {
  prefName: string;
  onSearch: (filters: any) => void;
  onBack: () => void;
}

const MAJOR_CITIES = [
  {
    name: "札幌市",
    count: "275,063",
    img: "https://images.unsplash.com/photo-1576615278693-f93892701f56?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "旭川市",
    count: "29,742",
    img: "https://images.unsplash.com/photo-1549488497-256795402cc0?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "函館市",
    count: "24,085",
    img: "https://images.unsplash.com/photo-1621356066795-927f884a4417?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "帯広市",
    count: "21,928",
    img: "https://images.unsplash.com/photo-1542931237-323a1b1abc72?auto=format&fit=crop&q=80&w=300",
  },
];

const OTHER_CITIES = [
  "苫小牧市",
  "千歳市",
  "釧路市",
  "小樽市",
  "恵庭市",
  "江別市",
  "北広島市",
  "北見市",
  "岩見沢市",
  "石狩市",
  "室蘭市",
  "網走市",
  "北斗市",
  "登別市",
  "滝川市",
  "富良野市",
  "美唄市",
  "砂川市",
  "伊達市",
  "紋別市",
  "音更町",
  "名寄市",
  "深川市",
  "稚内市",
  "長沼町",
  "倶知安町",
  "根室市",
  "栗山町",
  "士別市",
  "留萌市",
  "幕別町",
  "三笠市",
  "当別町",
  "芽室町",
  "共和町",
  "芦別市",
];

const STATIONS = [
  "札幌駅",
  "大通駅",
  "さっぽろ駅",
  "すすきの駅",
  "白石駅",
  "帯広駅",
  "福住駅",
  "旭川駅",
  "苫小牧駅",
  "千歳駅",
  "真駒内駅",
  "新札幌駅",
  "手稲駅",
  "北広島駅",
  "大谷地駅",
  "上野幌駅",
  "琴似駅",
  "宮の沢駅",
  "豊水すすきの駅",
  "釧路駅",
  "麻生駅",
  "狸小路駅",
  "元町駅",
  "発寒駅",
  "新さっぽろ駅",
  "環状通東駅",
  "沼ノ端駅",
  "南郷18丁目駅",
  "小樽駅",
  "発寒南駅",
  "新道東駅",
  "苗穂駅",
  "五稜郭駅",
];

const PrefSearchPage: React.FC<PrefSearchPageProps> = ({
  prefName,
  onSearch,
  onBack,
}) => {
  if (!prefName) return null;
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs / Back */}
        <button
          onClick={onBack}
          className="text-gray-400 text-sm hover:text-indigo-600 mb-6 transition flex items-center"
        >
          <i className="fas fa-chevron-left mr-2"></i> 全国から探し直す
        </button>

        {/* Heading */}
        <div className="flex items-end mb-10 border-l-4 border-blue-400 pl-4">
          <h1 className="text-3xl font-bold text-gray-800 mr-4">
            {prefName}の求人を探す
          </h1>
          <span className="text-gray-400 text-lg mb-0.5">741,367件</span>
        </div>

        {/* Section 1: Major Cities */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            エリアから求人を探す
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MAJOR_CITIES.map((city) => (
              <div
                key={city.name}
                onClick={() => onSearch({ pref: prefName, city: city.name })}
                className="flex items-center border border-gray-200 rounded overflow-hidden hover:border-blue-500 cursor-pointer transition group"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="px-4 py-2 flex-grow bg-white group-hover:bg-blue-50 transition">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700 group-hover:text-blue-600">
                      {city.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {city.count}件
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Grid Cities */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-2">
            {OTHER_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => onSearch({ pref: prefName, city })}
                className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-700 text-sm hover:border-blue-400 hover:text-blue-500 transition shadow-sm"
              >
                {city}(
                {Math.floor(Math.random() * 20000 + 2000).toLocaleString()}件)
              </button>
            ))}
          </div>
        </section>

        {/* Section 3: Stations */}
        <section className="mb-20">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            駅周辺のバイトを探す
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {STATIONS.map((station) => (
              <button
                key={station}
                onClick={() => onSearch({ pref: prefName, keyword: station })}
                className="text-gray-600 hover:text-blue-600 hover:underline text-sm border-b border-gray-200 pb-0.5"
              >
                {station}(
                {Math.floor(Math.random() * 5000 + 500).toLocaleString()}件)
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrefSearchPage;
