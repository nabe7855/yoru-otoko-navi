"use client";

import {
  Briefcase,
  ChevronRight,
  History,
  Layers,
  ListFilter,
  MapPin,
  Search,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import React from "react";

interface ActiveFilters {
  categories: string[];
  prefs: string[];
  cities: string[];
  tags: string[];
  salaries: string[];
  styles: string[];
  regions: string[];
}

interface SearchSectionProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  activeFilters: ActiveFilters;
  onFilterToggle: (type: keyof ActiveFilters, value: string) => void;
  onSearch: () => void;
  onMapOpen: () => void;
  onJobTypeOpen: () => void;
  onSalaryOpen: () => void;
  onWorkStyleOpen: () => void;
  quickTags?: string[];
  isAccordionOpen?: boolean;
  onAccordionToggle?: () => void;
}

const LucideIcon = ({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) => {
  const icons: Record<
    string,
    React.ComponentType<{ className?: string; size?: number }>
  > = {
    Briefcase,
    MapPin,
    Wallet,
    Layers,
    Zap,
    Search,
    X,
  };
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} />;
};

const SearchSection: React.FC<SearchSectionProps> = ({
  keyword,
  onKeywordChange,
  activeFilters,
  onFilterToggle,
  onSearch,
  onMapOpen,
  onJobTypeOpen,
  onSalaryOpen,
  onWorkStyleOpen,
  quickTags = [
    "日払いOK",
    "未経験歓迎",
    "寮・社宅あり",
    "送りあり",
    "体験入店OK",
    "ノルマなし",
  ],
  isAccordionOpen = false,
  onAccordionToggle,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-cyan-900/10 text-slate-800 relative overflow-hidden border border-slate-100">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="relative z-10 flex flex-col">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative group flex-grow">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="エリア・キーワードを入力（例：新宿 日払い 30代）"
              className="w-full bg-slate-50 border-2 border-slate-200 hover:border-cyan-200 focus:border-cyan-500 rounded-2xl py-5 pl-14 pr-6 text-base font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-inner"
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
            />
          </div>
          {onAccordionToggle && (
            <button
              onClick={onAccordionToggle}
              className={`flex items-center justify-center gap-2 px-6 py-5 rounded-2xl font-black transition-all active:scale-95 whitespace-nowrap ${
                isAccordionOpen
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
              }`}
            >
              <ListFilter size={20} />
              こだわり検索
              <ChevronRight
                size={18}
                className={`transition-transform duration-300 ${isAccordionOpen ? "rotate-90" : ""}`}
              />
            </button>
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isAccordionOpen ? "max-h-[1000px] opacity-100 mt-8 space-y-8" : "max-h-0 opacity-0 mt-0 space-y-0"}`}
        >
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-amber-500" /> 人気の条件から即検索
            </p>
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {quickTags.map((tag, idx) => (
                <button
                  key={idx}
                  className={`flex-shrink-0 px-5 py-2.5 transition-all active:scale-95 rounded-full text-xs font-black border ${
                    activeFilters.tags.includes(tag)
                      ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-cyan-300"
                  }`}
                  onClick={() => onFilterToggle("tags", tag)}
                >
                  {tag}
                </button>
              ))}
              <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-full hover:bg-white transition-all text-slate-400">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={onMapOpen}
              className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50 border border-slate-200 hover:border-cyan-500 hover:bg-white rounded-2xl transition-all group active:scale-95 shadow-sm"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform shadow-md border border-slate-100">
                <MapPin size={26} strokeWidth={2.5} />
              </div>
              <span className="text-[11px] md:text-xs font-black tracking-tighter text-slate-700">
                エリアで探す
              </span>
            </button>
            <button
              onClick={onJobTypeOpen}
              className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:bg-white rounded-2xl transition-all group active:scale-95 shadow-sm"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform shadow-md border border-slate-100">
                <Briefcase size={26} strokeWidth={2.5} />
              </div>
              <span className="text-[11px] md:text-xs font-black tracking-tighter text-slate-700">
                職種で探す
              </span>
            </button>
            <button
              onClick={onSalaryOpen}
              className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-white rounded-2xl transition-all group active:scale-95 shadow-sm"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-md border border-slate-100">
                <Wallet size={26} strokeWidth={2.5} />
              </div>
              <span className="text-[11px] md:text-xs font-black tracking-tighter text-slate-700">
                給与で探す
              </span>
            </button>
            <button
              onClick={onWorkStyleOpen}
              className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-white rounded-2xl transition-all group active:scale-95 shadow-sm"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-md border border-slate-100">
                <Layers size={26} strokeWidth={2.5} />
              </div>
              <span className="text-[11px] md:text-xs font-black tracking-tighter text-slate-700">
                働き方で探す
              </span>
            </button>
          </div>
        </div>

        {/* 選択中のタグ表示 */}
        {(Object.keys(activeFilters) as Array<keyof ActiveFilters>).some(
          (key) => activeFilters[key].length > 0,
        ) && (
          <div className="flex flex-wrap gap-2 pt-2 pb-1">
            {(Object.keys(activeFilters) as Array<keyof ActiveFilters>).map(
              (key) => {
                const icons: Record<string, string> = {
                  categories: "Briefcase",
                  prefs: "MapPin",
                  cities: "MapPin",
                  tags: "Zap",
                  salaries: "Wallet",
                  styles: "Layers",
                  regions: "MapPin",
                };
                return activeFilters[key].map((value) => (
                  <button
                    key={`${key}-${value}`}
                    onClick={() => onFilterToggle(key, value)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl text-[10px] md:text-xs font-black text-indigo-700 transition-all group active:scale-95"
                  >
                    <LucideIcon
                      name={icons[key] || "Search"}
                      className="text-indigo-500"
                      size={12}
                    />
                    {value}
                    <X
                      size={12}
                      className="text-indigo-300 group-hover:text-red-500 transition-colors"
                    />
                  </button>
                ));
              },
            )}
          </div>
        )}

        <button
          className={`w-full gradient-cyan hover:brightness-110 text-white font-black py-5 rounded-2xl shadow-2xl shadow-cyan-500/30 transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3 ${isAccordionOpen ? "mt-8" : "mt-0"}`}
          onClick={onSearch}
        >
          <Search size={24} />
          この条件で検索する
        </button>
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-4">
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-bold">
            <History size={14} />
            <span>最近検索した条件：</span>
            <button className="text-slate-400 hover:text-cyan-500 transition-colors underline decoration-slate-300">
              新宿 / バンスあり...
            </button>
          </div>
          <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">
            YORUO NAVI UX
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
