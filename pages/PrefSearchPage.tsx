import { City } from "@/lib/location";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  MapPin,
  Navigation,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import React from "react";

interface PrefSearchPageProps {
  prefName: string;
  prefSlug: string;
  cities: City[];
  onSearch: (filters: Record<string, unknown>) => void;
  onBack: () => void;
}

const STATIONS = [
  "札幌駅",
  "大通駅",
  "すすきの駅",
  "白石駅",
  "帯広駅",
  "旭川駅",
  "苫小牧駅",
  "千歳駅",
  "琴似駅",
  "麻生駅",
];

const PrefSearchPage: React.FC<PrefSearchPageProps> = ({
  prefName,
  prefSlug,
  cities,
  onSearch,
  onBack,
}) => {
  const relatedJobsCount = ((prefName?.length || 0) * 123 + 1000) % 5000;
  if (!prefName) return null;

  // Separate major cities. Since we don't have population data or images,
  // we will just treat the first few as featured or skip the featured section design if no images.
  // For now, let's use a placeholder image for featured cities to keep the UI structure.
  const featuredCities = cities.slice(0, 4);
  const otherCities = cities.slice(4);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Navigation */}
        <button
          onClick={onBack}
          className="group mb-10 flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition font-black text-xs md:text-sm bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 active:scale-95"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          全国から探し直す
        </button>

        {/* Hero Section */}
        <div className="relative mb-16 p-8 md:p-12 bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
              <span className="text-amber-500 font-black text-xs md:text-sm uppercase tracking-[0.3em]">
                Area Search
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter">
                {prefName}{" "}
                <span className="text-lg md:text-2xl font-bold text-slate-500 tracking-normal ml-2">
                  の求人を探す
                </span>
              </h1>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                <TrendingUp size={16} className="text-emerald-400" />
                <span className="text-white font-black text-xs">
                  現在 {relatedJobsCount.toLocaleString()} 件掲載中
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Major Cities (Featured) */}
        {featuredCities.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight">
                  主要エリアから探す
                </h2>
                <p className="text-slate-400 text-xs md:text-sm font-bold mt-1 tracking-wider uppercase">
                  — RECOMMENDED AREAS —
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredCities.map((city) => (
                <div
                  key={city.name}
                  onClick={() => onSearch({ pref: prefSlug, city: city.name })}
                  className="group relative flex flex-col aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl hover:border-indigo-500/30 cursor-pointer transition-all duration-500"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=600"
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="relative mt-auto p-6 md:p-8">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrendingUp size={12} /> Hot Area
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                      {city.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <Building2 size={12} />{" "}
                        {Math.floor(
                          ((city.name.length * 567) % 1000) + 100,
                        ).toLocaleString()}{" "}
                        案件
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Municipalities List */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-lg">
              <MapPin size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              市区町村から探す
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {otherCities.map((city) => (
              <button
                key={city.id}
                onClick={() => onSearch({ pref: prefSlug, city: city.name })}
                className="group flex flex-col gap-1 p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all text-left active:scale-[0.97]"
              >
                <span className="text-xs md:text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors uppercase">
                  {city.name}
                </span>
                <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-400 tracking-tighter">
                  {Math.floor(100 + city.name.length * 50).toLocaleString()}{" "}
                  <span>求人</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Section 3: Stations List */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <Navigation size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              主要な駅から探す
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {STATIONS.map((station) => (
              <button
                key={station}
                onClick={() => onSearch({ pref: prefSlug, keyword: station })}
                className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-600 font-bold text-xs md:text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-[0.95] flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                {station}
                <span className="text-[10px] text-slate-400 opacity-60 ml-1">
                  {Math.floor(50 + station.length * 10).toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Global Search Option */}
        <div className="py-16 text-center border-t border-slate-100 mt-20">
          <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl rotate-3">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-4">
            他のエリアでも探してみますか？
          </h3>
          <p className="text-slate-400 text-sm font-medium mb-8 max-w-sm mx-auto">
            希望の条件が見つからない場合は、近隣の都道府県やこだわり条件から絞り込んでみてください。
          </p>
          <button
            onClick={onBack}
            className="px-10 py-4 gradient-gold text-slate-900 font-black rounded-2xl shadow-xl hover:brightness-110 transition active:scale-95"
          >
            全国のエリア一覧へ戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrefSearchPage;
