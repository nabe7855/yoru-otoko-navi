"use client";

import JapanMap from "@/components/JapanMap";
import JobCard from "@/components/JobCard";
import {
  CATEGORIES,
  JOB_TYPES_FOR_OVERLAY,
  MASTER_GUIDES_ENHANCED,
  MOCK_COLUMNS,
  SALARY_OPTIONS_FOR_OVERLAY,
  SUB_BANNERS,
  SUCCESS_STORIES,
  WORK_STYLE_OPTIONS_FOR_OVERLAY,
} from "@/constants";
import { LocationService } from "@/lib/location";
import { jobService } from "@/services/jobService";
import { Job } from "@/types";
import {
  Award,
  Banknote,
  Book,
  BookOpen,
  Briefcase,
  Briefcase as BriefcaseIcon,
  Calculator,
  Calendar,
  Camera,
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Coins,
  Compass,
  CreditCard,
  Gem,
  GraduationCap,
  Hammer,
  HandCoins,
  Headset,
  History,
  Laptop,
  Layers,
  ListFilter,
  MapPin,
  Martini,
  Megaphone,
  Music,
  PenTool,
  Percent,
  Scissors,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  Utensils,
  Wallet,
  Wine,
  X,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface HomePageProps {
  onSearch: (filters: Record<string, any>) => void;
}

interface ActiveFilters {
  categories: string[];
  prefs: string[];
  cities: string[];
  tags: string[];
  salaries: string[];
  styles: string[];
  regions: string[];
}

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1600",
    title: "稼げる環境、ここにあり。",
    subtitle: "新宿・六本木・銀座。主要エリアの求人を網羅。",
    badge: "AREA RANKING #1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1600",
    title: "未経験から、プロの黒服へ。",
    subtitle: "キャリアアップを夜漢ナビが徹底サポート。",
    badge: "EDUCATION SUPPORT",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1600",
    title: "入社お祝い金キャンペーン",
    subtitle: "今なら最大50,000円を即日プレゼント中。",
    badge: "LIMITED CAMPAIGN",
  },
];

const LucideIcon = ({
  name,
  className,
  size,
}: {
  name: string;
  className?: string;
  size?: number;
}) => {
  const IconComponent = (
    {
      Award,
      Banknote,
      Book,
      BookOpen,
      Briefcase,
      Calculator,
      Calendar,
      Camera,
      Car,
      ChevronLeft,
      ChevronRight,
      Clock,
      Coffee,
      Coins,
      Compass,
      CreditCard,
      Gem,
      GraduationCap,
      Hammer,
      HandCoins,
      Headset,
      History,
      Laptop,
      Layers,
      MapPin,
      Martini,
      Megaphone,
      Music,
      PenTool,
      Percent,
      Scissors,
      Search,
      Shield,
      ShieldCheck,
      ShoppingBag,
      Sparkles,
      Star,
      Target,
      TrendingUp,
      Trophy,
      UserCheck,
      UserPlus,
      Users,
      Utensils,
      Wallet,
      Wine,
      X,
      Zap,
    } as Record<
      string,
      React.ComponentType<{ className?: string; size?: number }>
    >
  )[name];

  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} />;
};

const HomePage: React.FC<HomePageProps> = ({ onSearch }) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isWorkStyleOpen, setIsWorkStyleOpen] = useState(false);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isSearchAccordionOpen, setIsSearchAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    categories: [],
    prefs: [],
    cities: [],
    tags: [],
    salaries: [],
    styles: [],
    regions: [],
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const allJobs = await jobService.getJobs();
      setFeaturedJobs(allJobs.filter((j) => j.is_hot).slice(0, 3));
      setRecentJobs(allJobs.slice(0, 4));
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (isMapOpen || isJobTypeOpen || isSalaryOpen || isWorkStyleOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMapOpen, isJobTypeOpen, isSalaryOpen, isWorkStyleOpen]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const addFilter = (type: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) return prev;
      return { ...prev, [type]: [...current, value] };
    });
  };

  const toggleFilter = (type: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[type];
      const isSelected = current.includes(value);
      if (isSelected) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const handleRegionSelect = (region: string) => {
    toggleFilter("regions", region);
  };

  const handlePrefectureSelect = (prefSlug: string) => {
    const pref = LocationService.getPrefectureBySlug(prefSlug);
    if (pref) {
      addFilter("prefs", pref.name);
      // Find region
      const regions = LocationService.getRegions();
      const region = regions.find((r: any) => r.prefs.includes(pref.code));
      if (region) addFilter("regions", region.name);
    }
    setIsMapOpen(false);
  };

  const handleMunicipalitySelect = (prefSlug: string, muni: string) => {
    const pref = LocationService.getPrefectureBySlug(prefSlug);
    if (pref) {
      addFilter("prefs", pref.name);
      const regions = LocationService.getRegions();
      const region = regions.find((r: any) => r.prefs.includes(pref.code));
      if (region) addFilter("regions", region.name);
    }
    addFilter("cities", muni);
    setIsMapOpen(false);
  };

  const handleJobTypeSelect = (id: string) => {
    toggleFilter("categories", id);
    setIsJobTypeOpen(false);
  };

  const handleSalarySelect = (id: string) => {
    toggleFilter("salaries", id);
    setIsSalaryOpen(false);
  };

  const handleWorkStyleSelect = (id: string) => {
    toggleFilter("styles", id);
    setIsWorkStyleOpen(false);
  };

  const handleKeywordSearch = () => {
    onSearch({
      ...activeFilters,
      keyword,
    });
  };

  const quickTags = [
    "日払いOK",
    "未経験歓迎",
    "経験者優遇",
    "送迎あり",
    "寮・社宅あり",
    "託児所あり",
    "自由シフト",
    "週1日からOK",
  ];

  const getFormerJobIcon = (job: string) => {
    if (job.includes("建設")) return <Hammer size={16} />;
    if (job.includes("営業")) return <BriefcaseIcon size={16} />;
    return <Briefcase size={16} />;
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen">
      {/* エリア選択地図オーバーレイ */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
            onClick={() => setIsMapOpen(false)}
          ></div>
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 animate-map-entrance">
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all active:scale-90"
            >
              <X size={24} />
            </button>
            <JapanMap
              onRegionSelect={handleRegionSelect}
              onPrefectureSelect={handlePrefectureSelect}
              onMunicipalitySelect={handleMunicipalitySelect}
            />
          </div>
        </div>
      )}

      {/* 職種選択オーバーレイ */}
      {isJobTypeOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsJobTypeOpen(false)}
          ></div>
          <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-12 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsJobTypeOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-8 shrink-0">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                職種から探す
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-bold mt-2">
                希望の職種を選択してください
              </p>
            </div>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-8 gap-x-4 pb-4">
                {JOB_TYPES_FOR_OVERLAY.map((type, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJobTypeSelect(type.id)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      <LucideIcon
                        name={type.icon}
                        className="text-indigo-500"
                        size={24}
                      />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-600 group-hover:text-indigo-600 transition-colors whitespace-nowrap text-center px-1">
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 給与選択オーバーレイ */}
      {isSalaryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsSalaryOpen(false)}
          ></div>
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsSalaryOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-10 shrink-0">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                給与から探す
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-bold mt-2">
                希望の収入や条件を選択してください
              </p>
            </div>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-4 pb-6">
                {SALARY_OPTIONS_FOR_OVERLAY.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSalarySelect(opt.id)}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <LucideIcon
                        name={opt.icon}
                        className="text-blue-500"
                        size={28}
                      />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-600 group-hover:text-indigo-600 transition-colors whitespace-nowrap text-center">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 働き方選択オーバーレイ */}
      {isWorkStyleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            onClick={() => setIsWorkStyleOpen(false)}
          ></div>
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button
              onClick={() => setIsWorkStyleOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-12 shrink-0">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                働き方で探す
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-bold mt-2">
                雇用形態やライフスタイルから選択してください
              </p>
            </div>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-4 pb-10">
                {WORK_STYLE_OPTIONS_FOR_OVERLAY.map((style, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWorkStyleSelect(style.id)}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <LucideIcon
                        name={style.icon}
                        className="text-blue-500"
                        size={30}
                      />
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors whitespace-nowrap text-center">
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* スライダーセクション */}
      <section className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden bg-white">
        <div
          className="relative w-full max-w-[1600px] mx-auto overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex items-center justify-center w-full aspect-[21/9] md:aspect-[21/7] max-h-[600px]">
            <div
              className="flex transition-transform duration-700 ease-out h-full items-center"
              style={
                {
                  transform: `translateX(calc(50% - (var(--slide-width) / 2) - (${currentSlide} * var(--slide-width))))`,
                  "--slide-width": "75%",
                } as React.CSSProperties
              }
            >
              <style>{`
                :root { --slide-width: 75%; }
                @media (min-width: 768px) { :root { --slide-width: 55%; } }
                @media (min-width: 1280px) { :root { --slide-width: 45%; } }
              `}</style>
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`relative flex-shrink-0 h-full px-1 md:px-2 transition-all duration-700 ease-out cursor-pointer ${index === currentSlide ? "z-20 scale-100 opacity-100" : "z-10 scale-[0.88] opacity-60"}`}
                  style={{ width: "var(--slide-width)" }}
                  onClick={() => setCurrentSlide(index)}
                >
                  <div className="relative w-full h-full rounded-lg md:rounded-[1.5rem] overflow-hidden shadow-lg border border-slate-200">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-8">
                      <div className="mb-0.5 md:mb-1">
                        <span className="inline-block px-1.5 py-0.5 bg-amber-500 text-slate-900 text-[7px] md:text-[10px] font-black rounded uppercase tracking-widest">
                          {slide.badge}
                        </span>
                      </div>
                      <h2 className="text-[10px] sm:text-base md:text-3xl font-black text-white leading-tight">
                        {slide.title}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-[3%] md:left-[10%] lg:left-[20%] z-30 w-8 h-8 md:w-12 md:h-12 rounded bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-[3%] md:left-[10%] lg:right-[20%] z-30 w-8 h-8 md:w-12 md:h-12 rounded bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* メイングリッド */}
      <div className="container mx-auto px-4 md:-mt-8 mb-12 md:mb-20 relative z-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* 左サイドバー */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 order-1 lg:order-none">
            {/* おすすめカテゴリ */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg md:text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-amber-500 rounded-full"></span>
                おすすめカテゴリ
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {CATEGORIES.map(
                  (
                    cat:
                      | string
                      | {
                          id?: string;
                          name: string;
                          icon?: React.ReactNode;
                          count?: number;
                        },
                  ) => {
                    const isString = typeof cat === "string";
                    const catId = isString ? cat : cat.id || cat.name;
                    const catName = isString ? cat : cat.name;
                    const catIcon = isString ? (
                      <LucideIcon name="Briefcase" size={20} />
                    ) : (
                      cat.icon
                    );
                    const catCount = isString ? 0 : cat.count || 0;

                    return (
                      <button
                        key={catId}
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group active:scale-[0.98]"
                        onClick={() => onSearch({ category: catName })}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition shadow-sm">
                            {catIcon}
                          </div>
                          <span className="text-sm md:text-base font-bold text-slate-700">
                            {catName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] md:text-xs text-slate-400 font-black tracking-widest">
                            {catCount}件
                          </span>
                          <ChevronRight size={16} className="text-slate-300" />
                        </div>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* 夜漢ナビが選ばれる理由 */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col gap-8 shadow-xl">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-black mb-2">
                  夜漢ナビが選ばれる理由
                </h4>
                <p className="text-slate-400 text-sm">
                  安心・安全に稼げる環境を保証します。
                </p>
              </div>
              <div className="flex justify-around">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 border border-white/10">
                    <ShieldCheck size={28} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    安全保証
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10">
                    <Zap size={28} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    即日採用
                  </span>
                </div>
              </div>
            </div>

            {/* MASTER GUIDE セクション */}
            <div className="bg-slate-950 rounded-[2.5rem] p-6 md:p-8 border border-white/5 shadow-2xl space-y-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center md:text-left mb-2">
                <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2 justify-center md:justify-start">
                  <Compass className="text-amber-500" size={20} />
                  MASTER GUIDE
                </h3>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">
                  — 夜の世界の歩き方 —
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 relative z-10">
                {MASTER_GUIDES_ENHANCED.map((guide) => (
                  <button
                    key={guide.id}
                    className={`group relative p-5 rounded-3xl border ${guide.accent} bg-gradient-to-br ${guide.gradient} text-left overflow-hidden transition-all hover:scale-[1.02] hover:border-amber-500/50 active:scale-[0.98] shadow-xl flex items-center gap-5`}
                  >
                    <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-1000">
                      <LucideIcon name={guide.iconName} size={28} />
                    </div>
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                      <LucideIcon name={guide.iconName} size={28} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm md:text-base font-black text-white group-hover:text-amber-400 transition-colors">
                          {guide.title}
                        </h4>
                        <span className="text-[7px] md:text-[8px] font-black text-amber-500 flex items-center gap-1 uppercase tracking-wider animate-pulse bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          <Sparkles size={8} /> {guide.microCopy}
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-snug line-clamp-1">
                        {guide.copy}
                      </p>
                    </div>
                    <ChevronRight
                      className="shrink-0 text-slate-700 group-hover:text-amber-500 transition-all group-hover:translate-x-1"
                      size={16}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 小さめなバナースライダーセクション */}
            <div className="relative overflow-hidden py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {SUB_BANNERS.map((banner, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(banner.link)}
                    className="relative shrink-0 w-[240px] aspect-[16/6] rounded-2xl overflow-hidden group snap-center shadow-lg border border-slate-200 active:scale-95 transition-transform"
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <span className="text-white text-[11px] md:text-xs font-black text-center leading-tight drop-shadow-lg group-hover:scale-105 transition-transform">
                        {banner.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* メメインエリア */}
          <div className="lg:col-span-8 space-y-10 md:space-y-16">
            {/* 検索セクション */}
            <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-slate-900/40 text-white relative overflow-hidden border border-white/10">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative z-10 flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative group flex-grow">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-400 transition-colors">
                      <Search size={22} />
                    </div>
                    <input
                      type="text"
                      placeholder="エリア・キーワードを入力（例：新宿 日払い 30代）"
                      className="w-full bg-white/5 border-2 border-white/10 hover:border-white/20 focus:border-amber-500/50 rounded-2xl py-5 pl-14 pr-6 text-base font-bold text-white placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() =>
                      setIsSearchAccordionOpen(!isSearchAccordionOpen)
                    }
                    className={`flex items-center justify-center gap-2 px-6 py-5 rounded-2xl font-black transition-all active:scale-95 whitespace-nowrap ${
                      isSearchAccordionOpen
                        ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20"
                        : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <ListFilter size={20} />
                    こだわり検索
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${isSearchAccordionOpen ? "rotate-90" : ""}`}
                    />
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isSearchAccordionOpen ? "max-h-[1000px] opacity-100 mt-8 space-y-8" : "max-h-0 opacity-0 mt-0 space-y-0"}`}
                >
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={14} className="text-amber-500" />{" "}
                      人気の条件から即検索
                    </p>
                    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
                      {quickTags.map((tag, idx) => (
                        <button
                          key={idx}
                          className={`flex-shrink-0 px-5 py-2.5 transition-all active:scale-95 rounded-full text-xs font-black border ${
                            activeFilters.tags.includes(tag)
                              ? "bg-amber-500 text-slate-900 border-amber-500 shadow-lg shadow-amber-500/20"
                              : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                          }`}
                          onClick={() => toggleFilter("tags", tag)}
                        >
                          {tag}
                        </button>
                      ))}
                      <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/20 transition-all">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => setIsMapOpen(true)}
                      className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-amber-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-inner">
                        <MapPin size={26} strokeWidth={2.5} />
                      </div>
                      <span className="text-[11px] md:text-xs font-black tracking-tighter">
                        エリアで探す
                      </span>
                    </button>
                    <button
                      onClick={() => setIsJobTypeOpen(true)}
                      className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-inner">
                        <Briefcase size={26} strokeWidth={2.5} />
                      </div>
                      <span className="text-[11px] md:text-xs font-black tracking-tighter">
                        職種で探す
                      </span>
                    </button>
                    <button
                      onClick={() => setIsSalaryOpen(true)}
                      className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-emerald-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                        <Wallet size={26} strokeWidth={2.5} />
                      </div>
                      <span className="text-[11px] md:text-xs font-black tracking-tighter">
                        給与で探す
                      </span>
                    </button>
                    <button
                      onClick={() => setIsWorkStyleOpen(true)}
                      className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-inner">
                        <Layers size={26} strokeWidth={2.5} />
                      </div>
                      <span className="text-[11px] md:text-xs font-black tracking-tighter">
                        働き方で探す
                      </span>
                    </button>
                  </div>
                </div>

                {/* 選択中のタグ表示 */}
                {(
                  Object.keys(activeFilters) as Array<keyof ActiveFilters>
                ).some((key) => activeFilters[key].length > 0) && (
                  <div className="flex flex-wrap gap-2 pt-2 pb-1">
                    {(
                      Object.keys(activeFilters) as Array<keyof ActiveFilters>
                    ).map((key) => {
                      const icons: Record<string, string> = {
                        categories: "Briefcase",
                        prefs: "MapPin",
                        cities: "MapPin",
                        tags: "Zap",
                        salaries: "Wallet",
                        styles: "Layers",
                        regions: "Compass",
                      };
                      return activeFilters[key].map((value) => (
                        <button
                          key={`${key}-${value}`}
                          onClick={() => toggleFilter(key, value)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-[10px] md:text-xs font-bold text-white transition-all group active:scale-95"
                        >
                          <LucideIcon
                            name={icons[key] || "Search"}
                            className="text-amber-500"
                            size={12}
                          />
                          {value}
                          <X
                            size={12}
                            className="text-slate-500 group-hover:text-red-400"
                          />
                        </button>
                      ));
                    })}
                  </div>
                )}

                <button
                  className={`w-full gradient-gold hover:brightness-110 text-slate-900 font-black py-5 rounded-2xl shadow-2xl shadow-amber-500/30 transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3 ${isSearchAccordionOpen ? "mt-8" : "mt-0"}`}
                  onClick={handleKeywordSearch}
                >
                  <Search size={24} />
                  この条件で検索する
                </button>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-bold">
                    <History size={14} />
                    <span>最近検索した条件：</span>
                    <button className="text-slate-300 hover:text-amber-400 transition-colors underline decoration-slate-600">
                      新宿 / バンスあり...
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase">
                    YAKAN NAVI UX
                  </span>
                </div>
              </div>
            </div>

            {/* SUCCESS ROAD セクション */}
            <section className="bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 border border-white/5 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative z-10 mb-8 md:mb-10 text-center md:text-left">
                <h2 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-3 tracking-tighter flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    SUCCESS ROAD
                  </span>
                  <span className="text-slate-500 text-base md:text-2xl font-bold tracking-normal">
                    — 成功者たちのリアル —
                  </span>
                </h2>
                <p className="text-slate-400 text-xs md:text-base font-medium">
                  現場スタッフから幹部候補まで。夜漢ナビで人生を変えた男たちの軌跡。
                </p>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
                {SUCCESS_STORIES.map((story) => (
                  <div
                    key={story.id}
                    className="flex-shrink-0 w-[260px] md:w-auto snap-center group bg-slate-900 rounded-[2rem] border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                        <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest mb-1">
                          <Trophy size={12} /> Top Achiever
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white">
                          {story.name}{" "}
                          <span className="text-xs text-slate-400 font-bold ml-1">
                            ({story.age}歳)
                          </span>
                        </h3>
                        <p className="text-slate-300 text-[10px] md:text-xs font-bold flex items-center gap-1 mt-1">
                          <MapPin size={10} className="text-slate-500" />{" "}
                          {story.area}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="bg-slate-950/50 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            Monthly Income
                          </span>
                          <div className="flex items-center gap-1 text-emerald-500">
                            <TrendingUp size={10} />
                            <span className="text-[9px] md:text-[10px] font-black">
                              UP
                            </span>
                          </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                            {story.monthlyIncome}
                          </span>
                          <span className="text-[9px] md:text-[10px] text-slate-500 line-through">
                            from {story.formerIncome}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-1">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 border border-white/10 group-hover:text-amber-400 transition-colors">
                          {getFormerJobIcon(story.formerJob)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase tracking-tighter">
                            Former Job
                          </span>
                          <span className="text-[10px] md:text-xs font-bold text-slate-300">
                            {story.formerJob}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm font-bold text-white leading-relaxed line-clamp-2 italic px-1">
                        {" "}
                        「{story.catchphrase}」{" "}
                      </p>
                      <button className="w-full py-2.5 md:py-3.5 bg-white/5 border border-white/10 text-white text-[10px] md:text-xs font-black rounded-xl group-hover:bg-amber-500 group-hover:text-slate-900 group-hover:border-amber-500 transition-all flex items-center justify-center gap-2">
                        成功の軌跡を見る
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex md:hidden justify-center gap-1 mt-4">
                {SUCCESS_STORIES.map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/20"
                  ></div>
                ))}
              </div>
            </section>

            {/* 注目のおすすめ求人 */}
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                    <TrendingUp size={24} />
                  </div>
                  注目のおすすめ求人
                </h2>
                <button
                  onClick={() => router.push("/jobs")}
                  className="text-xs md:text-sm font-black text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-4 py-2 rounded-full"
                >
                  すべて見る
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {featuredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={(id) => router.push(`/jobs/${id}`)}
                  />
                ))}
              </div>
            </div>

            {/* 最新の新着求人 */}
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500">
                    <Clock size={24} />
                  </div>
                  最新の新着求人
                </h2>
                <button
                  onClick={() => router.push("/jobs")}
                  className="text-xs md:text-sm font-black text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-4 py-2 rounded-full"
                >
                  すべて見る
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={(id) => router.push(`/jobs/${id}`)}
                  />
                ))}
              </div>
            </div>
            {/* 夜漢コラム セクション */}
            <section className="pt-10 pb-6">
              <div className="flex items-center justify-between mb-8 px-1">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                    <BookOpen size={24} />
                  </div>
                  夜漢コラム
                </h2>
                <button className="text-xs md:text-sm font-black text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-4 py-2 rounded-full">
                  コラム一覧
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {MOCK_COLUMNS.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm border border-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                        <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[8px] sm:text-[10px] font-black rounded sm:rounded-lg shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="px-0.5">
                      <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] text-slate-400 font-bold mb-1 sm:mb-2">
                        <Calendar size={10} className="sm:w-3 sm:h-3" />
                        {post.date}
                      </div>
                      <h3 className="text-[10px] sm:text-base font-black text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
