import React from 'react';
import { Star, Zap, DollarSign, Award, ChevronRight } from 'lucide-react';

const Features: React.FC = () => {
  const featureLists = [
    {
      title: "高収入・賞与あり求人",
      desc: "月給40万オーバー確実。結果を出せば即昇格、即昇給。",
      icon: <DollarSign className="text-amber-500" />,
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-200"
    },
    {
      title: "未経験・研修充実の店舗",
      desc: "黒服デビューを完全サポート。接客の基礎から学べます。",
      icon: <Zap className="text-indigo-500" />,
      color: "from-indigo-500/20 to-indigo-500/5",
      borderColor: "border-indigo-200"
    },
    {
      title: "寮・社宅完備で即入居OK",
      desc: "鞄一つでスタート。住環境も整った優良店のみを厳選。",
      icon: <Star className="text-emerald-500" />,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-200"
    },
    {
      title: "業界大手グループ特集",
      desc: "圧倒的な安定感。福利厚生や将来性で選ぶならこちら。",
      icon: <Award className="text-purple-500" />,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 mb-4">特集から探す</h1>
        <p className="text-slate-500">あなたの希望にぴったりのカテゴリーを厳選しました。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {featureLists.map((item, idx) => (
          <a 
            key={idx} 
            href="#/search"
            className={`group relative flex flex-col p-8 rounded-3xl border ${item.borderColor} bg-gradient-to-br ${item.color} hover:shadow-xl transition-all duration-300 overflow-hidden`}
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-700">
              {/* Fix: Casting to ReactElement<any> to allow 'size' prop during cloneElement */}
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 120 })}
            </div>
            
            <div className="mb-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
              {item.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 mb-8 max-w-sm">{item.desc}</p>
            
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-slate-800">
              求人を見る
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">掲載リクエスト受付中</h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          「地元の駅周辺で探したい」「特定のグループの求人が見たい」などのご要望があれば、運営事務局までお気軽にお寄せください。
        </p>
        <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-black transition">
          リクエストを送る
        </button>
      </div>
    </div>
  );
};

export default Features;