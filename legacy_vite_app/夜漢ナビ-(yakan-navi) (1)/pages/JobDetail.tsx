
import React from 'react';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageCircle, 
  Heart, 
  Share2,
  Calendar,
  Info
} from 'lucide-react';
import { MOCK_JOBS } from '../constants';

const JobDetail: React.FC = () => {
  const job = MOCK_JOBS[0]; // Hardcoded for demo

  return (
    <div className="animate-in fade-in duration-500 pb-24 lg:pb-12">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 text-[10px] sm:text-xs text-slate-400 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
        <a href="#/" className="hover:text-indigo-600">夜漢ナビTOP</a>
        <span>/</span>
        <a href="#/search" className="hover:text-indigo-600">東京都 求人</a>
        <span>/</span>
        <a href="#/search" className="hover:text-indigo-600">歌舞伎町 求人</a>
        <span>/</span>
        <span className="text-slate-600 font-bold">{job.storeName}</span>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header & Gallery */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded">{job.industry}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">正社員募集</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">急募！</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{job.storeName}</h1>
              <p className="text-slate-500 text-sm">東京都新宿区歌舞伎町1-xx-xx</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-1 px-1 pb-1">
              <div className="md:col-span-3 aspect-[16/9] overflow-hidden">
                <img src={job.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-1">
                <div className="aspect-square overflow-hidden"><img src="https://picsum.photos/seed/inner1/400/400" className="w-full h-full object-cover" /></div>
                <div className="aspect-square overflow-hidden"><img src="https://picsum.photos/seed/inner2/400/400" className="w-full h-full object-cover" /></div>
                <div className="aspect-square overflow-hidden relative">
                  <img src="https://picsum.photos/seed/inner3/400/400" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">+5枚</div>
                </div>
              </div>
            </div>
          </div>

          {/* Salary & Benefits Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-600 font-bold mb-2">
                <DollarSign size={20} />
                <span>給与</span>
              </div>
              <div className="text-2xl font-black text-slate-900">月給 350,000円〜</div>
              <p className="text-xs text-amber-700 mt-2">※研修期間（1ヶ月）は月給28万円。昇給は随時、能力を正当に評価します！</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl">
              <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                <Clock size={20} />
                <span>勤務時間</span>
              </div>
              <div className="text-2xl font-black text-slate-900">18:00〜01:00</div>
              <p className="text-xs text-indigo-700 mt-2">※実働7時間。終電考慮します。送り・寮完備で安心です。</p>
            </div>
          </div>

          {/* Detailed Info Tabs Placeholder Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                募集要項
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-8 gap-y-6">
                <dt className="text-sm font-bold text-slate-500">仕事内容</dt>
                <dd className="text-sm text-slate-700 leading-relaxed">
                  キャバクラのホール業務全般をお任せします。<br />
                  ・開店・閉店準備（掃除・セッティング）<br />
                  ・お客様のご案内、ドリンク・灰皿の交換<br />
                  ・キャスト（女の子）のサポート・管理<br />
                  ・入店後は付け回し（店舗全体の流れを管理する司令塔）も学べます。
                </dd>

                <dt className="text-sm font-bold text-slate-500">応募資格</dt>
                <dd className="text-sm text-slate-700">
                  18歳以上（高校生不可）<br />
                  ・学歴、経験不問。やる気重視の採用です！<br />
                  ・未経験者大歓迎（ほとんどのスタッフが未経験スタートです）<br />
                  ・他業種からの転職、フリーターの方大歓迎！
                </dd>

                <dt className="text-sm font-bold text-slate-500">待遇・福利厚生</dt>
                <dd className="flex flex-wrap gap-2">
                  {['日払いOK', '昇給随時', '賞与あり', '交通費支給', '寮完備', '送りあり', '食事補助', '社会保険完備'].map(item => (
                    <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                      <CheckCircle size={14} className="text-emerald-500" />
                      {item}
                    </span>
                  ))}
                </dd>
              </dl>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
                店舗からのメッセージ
              </h3>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  「夜の世界は怖そう...」そんなイメージを払拭するために、当店は業界屈指のクリーンな運営を徹底しています。<br /><br />
                  上下関係も厳しすぎず、アットホームな雰囲気が自慢です。新宿一のホワイト店舗を目指しており、プライベートの充実もしっかりサポートします。
                  まずは1日の体験入店（日給1万円支給）からスタートしてみませんか？
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column / Sticky Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24 hidden lg:block">
            <h3 className="font-bold text-slate-800 mb-6 pb-4 border-b">この求人に応募する</h3>
            
            <div className="space-y-4">
              <button className="w-full py-4 gradient-gold text-slate-900 font-bold rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2">
                <Mail size={20} />
                WEBから応募する
              </button>
              <button className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                LINEで質問・応募
              </button>
              <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-black transition flex items-center justify-center gap-2">
                <Phone size={20} />
                電話で問い合わせ
              </button>
            </div>

            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition text-sm">
                <Heart size={20} />
                <span>キープする</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition text-sm">
                <Share2 size={20} />
                <span>シェア</span>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl text-[10px] text-indigo-700 flex gap-2">
              <Info size={16} className="shrink-0" />
              <p>
                応募後の流れ：店舗担当者より3日以内にお電話またはメールでご連絡いたします。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar Mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-slate-200 p-3 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
        <div className="flex gap-2">
          <button className="p-3 bg-slate-100 text-slate-400 rounded-xl">
            <Heart size={24} />
          </button>
          <button className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2">
            <MessageCircle size={18} />
            LINE応募
          </button>
          <button className="flex-1 py-3 gradient-gold text-slate-900 font-bold rounded-xl text-sm shadow-md">
            今すぐ応募
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
