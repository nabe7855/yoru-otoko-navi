
import React from 'react';
import { MapPin, Star, MessageCircle, ChevronRight, Zap, Car, ParkingCircle } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const hasParking = job.tags.includes('駐車場無料');
  const canCommuteByCar = job.tags.includes('車通勤可');

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative">
      
      {/* 1. アイキャッチ（上部） */}
      <div className="relative flex flex-row h-32 sm:h-44 bg-slate-50">
        {/* ラベル */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {job.featured && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">高収入</span>
          )}
          {job.urgent && (
            <span className="bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-wider animate-pulse">急募！</span>
          )}
        </div>

        {/* 左側：現場写真 */}
        <div className="w-1/2 h-full overflow-hidden">
          <img 
            src={job.thumbnail} 
            alt={job.storeName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
        </div>

        {/* 右側：給与バッジ・店舗名 */}
        <div className="w-1/2 p-3 sm:p-5 flex flex-col justify-center bg-slate-900 text-white relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="mb-1 md:mb-2">
            <span className="text-[10px] md:text-xs font-black text-amber-500 block mb-1">想定給与</span>
            <div className="text-lg md:text-2xl font-black text-white tracking-tight leading-none italic mb-1">
              {job.salary.amount}
            </div>
            {/* 安心の注釈追加 */}
            <span className="text-[8px] md:text-[10px] text-amber-500/80 font-bold block">
              ※試用期間中も給与同額を保証
            </span>
          </div>
          <h3 className="text-xs md:text-sm font-bold text-slate-300 line-clamp-1">{job.storeName}</h3>
        </div>
      </div>

      {/* 2. ヘッダー / キャッチコピー */}
      <div className="p-4 md:p-6 bg-white border-b border-slate-50">
        <h2 className="text-sm md:text-lg font-black text-slate-900 mb-4 leading-relaxed">
          {job.catchCopy || "未経験大歓迎！圧倒的な稼ぎやすさと安定した環境を提供します。"}
        </h2>

        {/* 3. メリットタグ + アイコン */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6">
          {job.tags.map((tag, idx) => (
            <span key={idx} className="bg-slate-900 text-amber-400 text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded border border-amber-900/30 flex items-center gap-1">
              {tag === '駐車場無料' && <ParkingCircle size={12} className="shrink-0" />}
              {tag === '車通勤可' && <Car size={12} className="shrink-0" />}
              {tag}
            </span>
          ))}
          {/* アイコンのみの強調表示（任意） */}
          {(hasParking || canCommuteByCar) && (
            <div className="flex gap-1.5 ml-auto">
              {hasParking && (
                <div className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100" title="駐車場無料">
                  <ParkingCircle size={16} />
                </div>
              )}
              {canCommuteByCar && (
                <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100" title="車通勤可">
                  <Car size={16} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. 詳細情報（職種別給与・アクセス） */}
        <div className="space-y-3 bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
          {job.roleSalaries && job.roleSalaries.map((rs, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px] md:text-sm font-bold">
              <span className="text-slate-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                {rs.roleName}
              </span>
              <span className="text-slate-900 font-black">{rs.amount}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-200 mt-2 flex items-center gap-2 text-[10px] md:text-xs text-slate-600">
            <MapPin size={14} className="text-slate-400 shrink-0" />
            <span className="font-bold">{job.location}</span>
            <span className="text-slate-400">({job.access || "駅チカ"})</span>
          </div>
        </div>

        {/* 5. アクションエリア */}
        <div className="flex gap-2">
          <button className="p-3.5 bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl border border-slate-200 flex items-center justify-center shrink-0">
            <Star size={20} className="fill-current" />
          </button>
          
          <button className="flex-1 bg-emerald-500 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm md:text-base">
            <MessageCircle size={18} />
            LINEで話を聞く
          </button>

          <a 
            href={`#/job/${job.id}`}
            className="hidden sm:flex items-center justify-center p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 hover:bg-black transition-all"
            title="詳細を見る"
          >
            <ChevronRight size={20} />
          </a>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
           <div className="flex items-center gap-1.5">
              <Zap size={12} className="text-amber-500" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">面接時履歴書不要 ・ 1分で応募</span>
           </div>
           <span className="text-[10px] text-slate-300 font-bold">掲載終了まで あと4日</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
