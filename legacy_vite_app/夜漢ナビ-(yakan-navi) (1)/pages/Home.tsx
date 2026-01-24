
import React, { useState, useEffect } from 'react';
import { CATEGORIES, MOCK_JOBS, SUCCESS_STORIES } from '../constants';
import JapanMap from '../components/JapanMap';
import JobCard from '../components/JobCard';
import { 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ChevronLeft, 
  MapPin, 
  Briefcase, 
  Wallet, 
  History, 
  X, 
  Trophy, 
  Hammer, 
  Briefcase as BriefcaseIcon,
  Utensils,
  Car,
  Wine,
  UserCheck,
  Coins,
  GraduationCap,
  Users,
  UserPlus,
  Scissors,
  Camera,
  Megaphone,
  Coffee,
  Music,
  Martini,
  Star,
  Search as SearchIcon,
  Banknote,
  Percent,
  HandCoins,
  ArrowUpRight,
  Gem,
  ShoppingBag,
  Calculator,
  PenTool,
  Headset,
  Laptop,
  Award,
  Layers,
  BookOpen,
  Calendar,
  Compass,
  Target,
  Book,
  Shield,
  CreditCard,
  Sparkles,
  Globe
} from 'lucide-react';
// @ts-ignore - Fixing "Module 'react-router-dom' has no exported member 'useNavigate'" compiler error
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1600",
    title: "稼げる環境、ここにあり。",
    subtitle: "新宿・六本木・銀座。主要エリアの求人を網羅。",
    badge: "AREA RANKING #1"
  },
  {
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1600",
    title: "未経験から、プロの黒服へ。",
    subtitle: "キャリアアップを夜漢ナビが徹底サポート。",
    badge: "EDUCATION SUPPORT"
  },
  {
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1600",
    title: "入社お祝い金キャンペーン",
    subtitle: "今なら最大50,000円を即日プレゼント中。",
    badge: "LIMITED CAMPAIGN"
  }
];

const JOB_TYPES_FOR_OVERLAY = [
  { name: '黒服(ボーイ)', icon: <Users className="text-indigo-500" size={28} />, id: 'Boy' },
  { name: '幹部候補（マネージャー）', icon: <TrendingUp className="text-blue-500" size={28} />, id: 'Manager' },
  { name: '店長', icon: <Briefcase className="text-cyan-500" size={28} />, id: 'StoreManager' },
  { name: '送りドライバー', icon: <Car className="text-emerald-500" size={28} />, id: 'Driver' },
  { name: 'キャッシャー', icon: <Coins className="text-amber-500" size={28} />, id: 'Cashier' },
  { name: 'キッチン', icon: <Utensils className="text-orange-500" size={28} />, id: 'Kitchen' },
  { name: 'ソムリエ', icon: <Wine className="text-rose-500" size={28} />, id: 'Sommelier' },
  { name: 'バーテンダー', icon: <Martini className="text-purple-500" size={28} />, id: 'Bartender' },
  { name: 'ヘアメイク', icon: <Scissors className="text-pink-500" size={28} />, id: 'HairMake' },
  { name: 'エスコート', icon: <UserCheck className="text-teal-500" size={28} />, id: 'Escort' },
  { name: 'カメラマン', icon: <Camera className="text-slate-500" size={28} />, id: 'Cameraman' },
  { name: 'スカウトマン', icon: <SearchIcon className="text-violet-500" size={28} />, id: 'Scoutman' },
  { name: 'キャッチ', icon: <Megaphone className="text-yellow-500" size={28} />, id: 'Catch' },
  { name: 'メンズコンカフェ', icon: <Coffee className="text-stone-500" size={28} />, id: 'MenConCafe' },
  { name: 'ホスト', icon: <Star className="text-amber-400" size={28} />, id: 'Host' },
  { name: 'ボーイズバー', icon: <Music className="text-fuchsia-500" size={28} />, id: 'BoysBar' },
];

const SALARY_OPTIONS_FOR_OVERLAY = [
  { name: '月給30万円〜', icon: <Banknote className="text-blue-500" />, id: 'monthly_30' },
  { name: '月給50万円〜', icon: <Gem className="text-indigo-600" />, id: 'monthly_50' },
  { name: '月給80万円〜', icon: <Trophy className="text-amber-500" />, id: 'monthly_80' },
  { name: '日給1.2万円〜', icon: <HandCoins className="text-emerald-500" />, id: 'daily_12' },
  { name: '日給1.5万円〜', icon: <Coins className="text-teal-500" />, id: 'daily_15' },
  { name: '時給1,500円〜', icon: <Clock className="text-cyan-500" />, id: 'hourly_15' },
  { name: '時給2,000円〜', icon: <Zap className="text-yellow-500" />, id: 'hourly_20' },
  { name: '高額バックあり', icon: <Percent className="text-rose-500" />, id: 'high_back' },
  { name: '即日日払いOK', icon: <Wallet className="text-orange-500" />, id: 'daily_pay' },
  { name: '昇給随時', icon: <ArrowUpRight className="text-violet-500" />, id: 'raise' },
];

const WORK_STYLE_OPTIONS_FOR_OVERLAY = [
  { name: '正社員・転職', icon: <Briefcase className="text-blue-500" />, id: 'FullTime' },
  { name: 'アルバイト', icon: <Utensils className="text-cyan-500" />, id: 'PartTime' },
  { name: 'パート', icon: <ShoppingBag className="text-blue-400" />, id: 'Part' },
  { name: '派遣', icon: <Calculator className="text-slate-400" />, id: 'Temporary' },
  { name: '契約社員', icon: <PenTool className="text-amber-500" />, id: 'Contract' },
  { name: '業務委託', icon: <Scissors className="text-blue-400" />, id: 'Outsourcing' },
  { name: '在宅ワーク', icon: <Headset className="text-blue-500" />, id: 'Remote' },
  { name: 'フリーランス', icon: <Laptop className="text-slate-500" />, id: 'Freelance' },
  { name: '新卒', icon: <GraduationCap className="text-slate-600" />, id: 'NewGrad' },
  { name: 'インターン', icon: <Award className="text-amber-500" />, id: 'Intern' },
];

const MOCK_COLUMNS = [
  {
    id: '1',
    title: '黒服（ボーイ）の仕事内容とは？未経験から店長を目指すキャリアパスを徹底解説',
    category: '働き方ガイド',
    date: '2024.03.15',
    image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'ナイトワーク業界の必須用語集。新人スタッフがまず覚えるべき基礎知識',
    category: '業界知識',
    date: '2024.03.10',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: '日払い・週払いの仕組みとは？急な出費も安心なナイトワークの給与システム',
    category: '給与・待遇',
    date: '2024.03.05',
    image: 'https://images.unsplash.com/photo-1554224155-1696413575b8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    title: '【完全版】寮完備求人のメリット・デメリット。一人暮らしを始めるならどっち？',
    category: 'ライフスタイル',
    date: '2024.02.28',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
  }
];

const MASTER_GUIDES = [
  {
    id: 'diagnosis',
    title: '適職タイプ診断',
    target: '初心者・迷っている人',
    copy: '君の武器は何か？5分でわかる適職診断',
    microCopy: '累計1万人が診断！',
    icon: <Target className="text-amber-400" size={32} />,
    gradient: 'from-slate-800 to-slate-950',
    accent: 'border-amber-500/30'
  },
  {
    id: 'knowhow',
    title: '稼げるノウハウ集',
    target: 'ガッツリ稼ぎたい人',
    copy: '月収100万への最短ルート。デキる男の処世術',
    microCopy: '現役店長が徹底監修',
    icon: <Book className="text-amber-500" size={32} />,
    gradient: 'from-slate-900 to-black',
    accent: 'border-amber-600/50'
  },
  {
    id: 'beginner',
    title: '未経験スタートガイド',
    target: '不安な初心者',
    copy: '知識ゼロからプロへ。初日に差がつく基礎知識',
    microCopy: '初心者の8割が閲覧中',
    icon: <UserCheck className="text-blue-400" size={32} />,
    gradient: 'from-blue-900/20 to-slate-950',
    accent: 'border-blue-500/30'
  },
  {
    id: 'income',
    title: 'リアルな収支図鑑',
    target: '現実志向の人',
    copy: 'ぶっちゃけいくら残る？1ヶ月のシミュレーション',
    microCopy: '現場のリアルな数字を公開',
    icon: <CreditCard className="text-emerald-400" size={32} />,
    gradient: 'from-emerald-900/20 to-slate-950',
    accent: 'border-emerald-500/30'
  },
  {
    id: 'safety',
    title: 'トラブル回避Q&A',
    target: '慎重派な人',
    copy: '安心して働くために。知っておくべき法律と知恵',
    microCopy: '顧問弁護士が法的アドバイス',
    icon: <Shield className="text-rose-400" size={32} />,
    gradient: 'from-rose-900/20 to-slate-950',
    accent: 'border-rose-500/30'
  }
];

const SUB_BANNERS = [
  {
    title: '転職・中途採用の求人',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
    link: '#/search?type=mid'
  },
  {
    title: '2026・27 新卒採用・インターンシップ情報',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    link: '#/search?type=new'
  },
  {
    title: '語学を活かせる求人',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    link: '#/search?type=language'
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isWorkStyleOpen, setIsWorkStyleOpen] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (isMapOpen || isJobTypeOpen || isSalaryOpen || isWorkStyleOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMapOpen, isJobTypeOpen, isSalaryOpen, isWorkStyleOpen]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const handleRegionSelect = (region: string) => {
    console.log(`Region navigated: ${region}`);
  };

  const handlePrefectureSelect = (pref: string) => {
    console.log(`Prefecture selected: ${pref}`);
  };

  const handleMunicipalitySelect = (pref: string, muni: string) => {
    setIsMapOpen(false);
    navigate(`/search?prefecture=${encodeURIComponent(pref)}&area=${encodeURIComponent(muni)}`);
  };

  const handleJobTypeSelect = (id: string) => {
    setIsJobTypeOpen(false);
    navigate(`/search?role=${id}`);
  };

  const handleSalarySelect = (id: string) => {
    setIsSalaryOpen(false);
    navigate(`/search?salary=${id}`);
  };

  const handleWorkStyleSelect = (id: string) => {
    setIsWorkStyleOpen(false);
    navigate(`/search?style=${id}`);
  };

  const quickTags = ["日払い", "寮完備", "30代歓迎", "未経験OK", "即入居可", "週1OK"];

  const getFormerJobIcon = (job: string) => {
    if (job.includes('建設')) return <Hammer size={16} />;
    if (job.includes('営業')) return <BriefcaseIcon size={16} />;
    return <Briefcase size={16} />;
  };

  return (
    <div className="animate-in fade-in duration-700 pb-16 lg:pb-0 relative">
      
      {/* エリア選択地図オーバーレイ */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsMapOpen(false)}></div>
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
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
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsJobTypeOpen(false)}></div>
          <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-12 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsJobTypeOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-8 shrink-0">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">職種から探す</h3>
              <p className="text-slate-400 text-xs md:text-sm font-bold mt-2">希望の職種を選択してください</p>
            </div>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-y-8 gap-x-4 pb-4">
                {JOB_TYPES_FOR_OVERLAY.map((type, idx) => (
                  <button key={idx} onClick={() => handleJobTypeSelect(type.id)} className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                      {/* Fix: Casting to ReactElement<any> to allow 'size' prop during cloneElement */}
                      {React.cloneElement(type.icon as React.ReactElement<any>, { size: 24 })}
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
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsSalaryOpen(false)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsSalaryOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-10 shrink-0">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">給与から探す</h3>
              <p className="text-slate-400 text-xs md:text-sm font-bold mt-2">希望の収入や条件を選択してください</p>
            </div>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-4 pb-6">
                {SALARY_OPTIONS_FOR_OVERLAY.map((opt, idx) => (
                  <button key={idx} onClick={() => handleSalarySelect(opt.id)} className="flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      {/* Fix: Casting to ReactElement<any> to allow 'size' prop during cloneElement */}
                      {React.cloneElement(opt.icon as React.ReactElement<any>, { size: 28 })}
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
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsWorkStyleOpen(false)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setIsWorkStyleOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all active:scale-90"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-12 shrink-0">
              <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">働き方で探す</h3>
              <p className="text-slate-400 text-xs md:text-sm font-bold mt-2">雇用形態やライフスタイルから選択してください</p>
            </div>
            <div className="overflow-y-auto pr-2 scrollbar-hide">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-4 pb-10">
                {WORK_STYLE_OPTIONS_FOR_OVERLAY.map((style, idx) => (
                  <button key={idx} onClick={() => handleWorkStyleSelect(style.id)} className="flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center shadow-sm group-hover:bg-white group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      {/* Fix: Casting to ReactElement<any> to allow 'size' prop during cloneElement */}
                      {React.cloneElement(style.icon as React.ReactElement<any>, { size: 30 })}
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
        <div className="relative w-full max-w-[1600px] mx-auto overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className="relative flex items-center justify-center w-full aspect-[21/9] md:aspect-[21/7] max-h-[600px]">
            <div className="flex transition-transform duration-700 ease-out h-full items-center" style={{ transform: `translateX(calc(50% - (var(--slide-width) / 2) - (${currentSlide} * var(--slide-width))))`, '--slide-width': '75%' } as React.CSSProperties}>
              <style>{`
                :root { --slide-width: 75%; }
                @media (min-width: 768px) { :root { --slide-width: 55%; } }
                @media (min-width: 1280px) { :root { --slide-width: 45%; } }
              `}</style>
              {SLIDES.map((slide, index) => (
                <div key={index} className={`relative flex-shrink-0 h-full px-1 md:px-2 transition-all duration-700 ease-out cursor-pointer ${index === currentSlide ? 'z-20 scale-100 opacity-100' : 'z-10 scale-[0.88] opacity-60'}`} style={{ width: 'var(--slide-width)' }} onClick={() => setCurrentSlide(index)}>
                  <div className="relative w-full h-full rounded-lg md:rounded-[1.5rem] overflow-hidden shadow-lg border border-slate-200">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-8">
                      <div className="mb-0.5 md:mb-1">
                        <span className="inline-block px-1.5 py-0.5 bg-amber-500 text-slate-900 text-[7px] md:text-[10px] font-black rounded uppercase tracking-widest">{slide.badge}</span>
                      </div>
                      <h2 className="text-[10px] sm:text-base md:text-3xl font-black text-white leading-tight">{slide.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={prevSlide} className="absolute left-[3%] md:left-[10%] lg:left-[20%] z-30 w-8 h-8 md:w-12 md:h-12 rounded bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90"><ChevronLeft size={20} className="md:w-6 md:h-6" /></button>
            <button onClick={nextSlide} className="absolute right-[3%] md:left-[10%] lg:right-[20%] z-30 w-8 h-8 md:w-12 md:h-12 rounded bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all active:scale-90"><ChevronRight size={20} className="md:w-6 md:h-6" /></button>
          </div>
          <div className="mt-4 md:mt-8 flex justify-center gap-1 md:gap-1.5 px-4 overflow-hidden">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} className={`h-0.5 md:h-1 flex-1 max-w-[40px] md:max-w-[60px] rounded-full transition-all duration-500 border border-slate-200 ${i === currentSlide ? 'bg-slate-700 border-slate-700' : 'bg-white hover:bg-slate-100'}`} />
            ))}
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
                {CATEGORIES.map((cat) => (
                  <button key={cat.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group active:scale-[0.98]">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition shadow-sm">{cat.icon}</div>
                      <span className="text-sm md:text-base font-bold text-slate-700">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] md:text-xs text-slate-400 font-black tracking-widest">{cat.count}件</span>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 夜漢ナビが選ばれる理由 */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col gap-8 shadow-xl">
               <div className="text-center md:text-left">
                  <h4 className="text-xl font-black mb-2">夜漢ナビが選ばれる理由</h4>
                  <p className="text-slate-400 text-sm">安心・安全に稼げる環境を保証します。</p>
               </div>
               <div className="flex justify-around">
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 border border-white/10">
                        <ShieldCheck size={28} />
                     </div>
                     <span className="text-[10px] font-black uppercase text-slate-500">安全保証</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10">
                        <Zap size={28} />
                     </div>
                     <span className="text-[10px] font-black uppercase text-slate-500">即日採用</span>
                  </div>
               </div>
            </div>

            {/* MASTER GUIDE セクション (1列表示・横長バナー形式) */}
            <div className="bg-slate-950 rounded-[2.5rem] p-6 md:p-8 border border-white/5 shadow-2xl space-y-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 text-center md:text-left mb-2">
                <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2 justify-center md:justify-start">
                  <Compass className="text-amber-500" size={20} />
                  MASTER GUIDE
                </h3>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-widest">— 夜の世界の歩き方 —</p>
              </div>

              <div className="grid grid-cols-1 gap-4 relative z-10">
                {MASTER_GUIDES.map((guide) => (
                  <button 
                    key={guide.id}
                    className={`group relative p-5 rounded-3xl border ${guide.accent} bg-gradient-to-br ${guide.gradient} text-left overflow-hidden transition-all hover:scale-[1.02] hover:border-amber-500/50 active:scale-[0.98] shadow-xl flex items-center gap-5`}
                  >
                    <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-1000">
                      {guide.icon}
                    </div>
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                      {/* Fix: Casting to ReactElement<any> to allow 'size' prop during cloneElement */}
                      {React.cloneElement(guide.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm md:text-base font-black text-white group-hover:text-amber-400 transition-colors">{guide.title}</h4>
                        <span className="text-[7px] md:text-[8px] font-black text-amber-500 flex items-center gap-1 uppercase tracking-wider animate-pulse bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          <Sparkles size={8} /> {guide.microCopy}
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-snug line-clamp-1">{guide.copy}</p>
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1 opacity-60">{guide.target}</div>
                    </div>
                    <ChevronRight className="shrink-0 text-slate-700 group-hover:text-amber-500 transition-all group-hover:translate-x-1" size={16} />
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
                      onClick={() => banner.link && (window.location.hash = banner.link)}
                      className="relative shrink-0 w-[240px] aspect-[16/6] rounded-2xl overflow-hidden group snap-center shadow-lg border border-slate-200 active:scale-95 transition-transform"
                    >
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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

          {/* メインエリア */}
          <div className="lg:col-span-8 space-y-10 md:space-y-16">
            {/* 検索セクション */}
            <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-slate-900/40 text-white relative overflow-hidden border border-white/10">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative z-10 space-y-8">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-400 transition-colors">
                    <Search size={22} />
                  </div>
                  <input type="text" placeholder="エリア・キーワードを入力（例：新宿 日払い 30代）" className="w-full bg-white/5 border-2 border-white/10 hover:border-white/20 focus:border-amber-500/50 rounded-2xl py-5 pl-14 pr-6 text-base font-bold text-white placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all" />
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-amber-500" /> 人気の条件から即検索
                  </p>
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
                    {quickTags.map((tag, idx) => (
                      <button key={idx} className="flex-shrink-0 px-5 py-2.5 bg-white/10 hover:bg-amber-500 hover:text-slate-900 border border-white/10 rounded-full text-xs font-black transition-all active:scale-95">
                        {tag}
                      </button>
                    ))}
                    <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-white/20 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button onClick={() => setIsMapOpen(true)} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-amber-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-inner">
                      <MapPin size={26} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] md:text-xs font-black tracking-tighter">エリアで探す</span>
                  </button>
                  <button onClick={() => setIsJobTypeOpen(true)} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-inner">
                      <Briefcase size={26} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] md:text-xs font-black tracking-tighter">職種で探す</span>
                  </button>
                  <button onClick={() => setIsSalaryOpen(true)} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-emerald-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                      <Wallet size={26} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] md:text-xs font-black tracking-tighter">給与で探す</span>
                  </button>
                  <button onClick={() => setIsWorkStyleOpen(true)} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 rounded-2xl transition-all group active:scale-95">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-inner">
                      <Layers size={26} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] md:text-xs font-black tracking-tighter">働き方で探す</span>
                  </button>
                </div>
                <button className="w-full gradient-gold hover:brightness-110 text-slate-900 font-black py-5 rounded-2xl shadow-2xl shadow-amber-500/30 transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3">
                  <Search size={24} />
                  この条件で検索する
                </button>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500 font-bold">
                    <History size={14} />
                    <span>最近検索した条件：</span>
                    <button className="text-slate-300 hover:text-amber-400 transition-colors underline decoration-slate-600">新宿 / バンスあり...</button>
                  </div>
                  <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase">YAKAN NAVI UX</span>
                </div>
              </div>
            </div>

            {/* SUCCESS ROAD セクション */}
            <section className="bg-slate-950 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 border border-white/5 shadow-inner relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
               <div className="relative z-10 mb-8 md:mb-10 text-center md:text-left">
                  <h2 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-3 tracking-tighter flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                     <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">SUCCESS ROAD</span>
                     <span className="text-slate-500 text-base md:text-2xl font-bold tracking-normal">— 成功者たちのリアル —</span>
                  </h2>
                  <p className="text-slate-400 text-xs md:text-base font-medium">現場スタッフから幹部候補まで。夜漢ナビで人生を変えた男たちの軌跡。</p>
               </div>
               <div className="flex overflow-x-auto gap-4 pb-6 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
                  {SUCCESS_STORIES.map((story) => (
                    <div key={story.id} className="flex-shrink-0 w-[260px] md:w-auto snap-center group bg-slate-900 rounded-[2rem] border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl">
                       <div className="relative aspect-[3/4] overflow-hidden">
                          <img src={story.image} alt={story.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                             <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-widest mb-1">
                                <Trophy size={12} /> Top Achiever
                             </div>
                             <h3 className="text-xl md:text-2xl font-black text-white">{story.name} <span className="text-xs text-slate-400 font-bold ml-1">({story.age}歳)</span></h3>
                             <p className="text-slate-300 text-[10px] md:text-xs font-bold flex items-center gap-1 mt-1">
                                <MapPin size={10} className="text-slate-500" /> {story.area}
                             </p>
                          </div>
                       </div>
                       <div className="p-4 md:p-6 flex-grow flex flex-col justify-between space-y-4">
                          <div className="bg-slate-950/50 rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/5">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Income</span>
                                <div className="flex items-center gap-1 text-emerald-500">
                                   <TrendingUp size={10} />
                                   <span className="text-[9px] md:text-[10px] font-black">UP</span>
                                </div>
                             </div>
                             <div className="flex items-baseline gap-2">
                                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">{story.monthlyIncome}</span>
                                <span className="text-[9px] md:text-[10px] text-slate-500 line-through">from {story.formerIncome}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 px-1">
                             <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 border border-white/10 group-hover:text-amber-400 transition-colors">
                                {getFormerJobIcon(story.formerJob)}
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] md:text-[9px] text-slate-500 font-black uppercase tracking-tighter">Former Job</span>
                                <span className="text-[10px] md:text-xs font-bold text-slate-300">{story.formerJob}</span>
                             </div>
                          </div>
                          <p className="text-xs md:text-sm font-bold text-white leading-relaxed line-clamp-2 italic px-1"> 「{story.catchphrase}」 </p>
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
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                  ))}
               </div>
            </section>

            {/* 注目のおすすめ求人 */}
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-4">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-500"><TrendingUp size={24} /></div>
                  注目のおすすめ求人
                </h2>
                <button onClick={() => navigate('/search')} className="text-xs md:text-sm font-black text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-4 py-2 rounded-full">すべて見る</button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {MOCK_JOBS.filter(j => j.featured).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* 最新の新着求人 */}
            <div>
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500"><Clock size={24} /></div>
                  最新の新着求人
                </h2>
                <button onClick={() => navigate('/search')} className="text-xs md:text-sm font-black text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-4 py-2 rounded-full">すべて見る</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {MOCK_JOBS.filter(j => !j.featured).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* 夜漢コラム セクション */}
            <section className="pt-10 pb-6">
              <div className="flex items-center justify-between mb-8 px-1">
                <h2 className="text-xl md:text-3xl font-black text-slate-800 flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><BookOpen size={24} /></div>
                  夜漢コラム
                </h2>
                <button onClick={() => navigate('/features')} className="text-xs md:text-sm font-black text-indigo-600 hover:text-indigo-800 transition bg-indigo-50 px-4 py-2 rounded-full">コラム一覧</button>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {MOCK_COLUMNS.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 shadow-sm border border-slate-100">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

export default Home;
