
import React from 'react';
import { HelpCircle, ChevronDown, BookOpen, UserCheck, CreditCard } from 'lucide-react';

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
          <HelpCircle className="text-indigo-600" size={32} />
          よくある質問
        </h1>
        <p className="text-slate-500">業界に関する疑問や不安を解消するためのガイドです。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">仕事内容</h3>
          <p className="text-xs text-slate-500">ボーイ・黒服の具体的な業務について</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CreditCard size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">給料・待遇</h3>
          <p className="text-xs text-slate-500">日払いや昇給制度の詳細について</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserCheck size={24} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">採用の流れ</h3>
          <p className="text-xs text-slate-500">応募から体験入店までのステップ</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 mb-6">主要なQA</h2>
        {[
          { 
            title: "未経験でも本当に稼げますか？", 
            content: "はい、可能です。多くの店舗で充実した研修制度があり、未経験から始めて月収50万円以上を目指すスタッフも少なくありません。やる気と真面目さが評価に直結する業界です。" 
          },
          { 
            title: "お酒が飲めなくても大丈夫ですか？", 
            content: "全く問題ありません。スタッフ（ボーイ・黒服）の主な業務は接客サポートや店舗運営であり、基本的にお客様とお酒を飲むことはありません。下戸のスタッフも多数活躍しています。" 
          },
          { 
            title: "給与・待遇について", 
            content: "日払いや週払い、昇給制度などは店舗により異なります。求人詳細の『給与』欄を必ずご確認ください。多くの店舗で日払い制度を導入しています。" 
          },
          { 
            title: "勤務時間・シフトについて", 
            content: "基本的に夜間（18時〜LAST）の勤務が中心です。週2日からOKのアルバイトから、週休2日の正社員まで幅広く募集されています。" 
          },
          { 
            title: "応募後の流れ", 
            content: "WebまたはLINEから応募後、店舗担当者より面接日程の調整連絡が入ります。当日は履歴書不要の店舗も多いです。まずは体験入店をお勧めします。" 
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between text-left group cursor-pointer">
              <span className="font-bold text-slate-800">{item.title}</span>
              <ChevronDown className="text-slate-300 transition" size={20} />
            </div>
            <div className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
              {item.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center text-white">
        <h3 className="text-xl font-bold mb-4">疑問が解決しない場合は</h3>
        <p className="text-slate-400 text-sm mb-8">公式LINEから直接担当者にお問い合わせいただけます。お気軽にご相談ください。</p>
        <button className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition">
          公式LINEで相談する
        </button>
      </div>
    </div>
  );
};

export default FAQ;
