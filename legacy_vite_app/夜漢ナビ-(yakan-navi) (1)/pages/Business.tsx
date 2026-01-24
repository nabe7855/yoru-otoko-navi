
import React from 'react';
import { Building2, TrendingUp, Users, CheckCircle2, ChevronRight, Mail } from 'lucide-react';

const Business: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-xs font-bold mb-6">
            RECRUITER PROGRAM
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">店舗様の採用を、<br /><span className="text-amber-400">劇的に変える。</span></h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            夜漢ナビは、意欲の高い男性求職者と店舗を繋ぐ、国内最大級の特化型プラットフォームです。
          </p>
          <button className="gradient-gold text-slate-900 font-bold px-10 py-4 rounded-xl shadow-xl hover:brightness-110 transition">
            掲載のお問い合わせはこちら
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">圧倒的な集客力</h3>
              <p className="text-slate-500 text-sm">SEO・広告運用に特化し、「稼ぎたい」男性ユーザーへダイレクトにリーチします。</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">質の高いマッチング</h3>
              <p className="text-slate-500 text-sm">業界特有のこだわり検索により、店舗の求める人材が応募しやすい設計になっています。</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">簡単な管理システム</h3>
              <p className="text-slate-500 text-sm">直感的な管理画面で、求人の更新や応募者対応がスムーズに行えます。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Mail className="text-amber-500" />
              掲載資料請求・お問い合わせ
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">店舗名・会社名</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ご担当者名</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">メールアドレス</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">お問い合わせ内容</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"></textarea>
              </div>
              <button type="button" className="md:col-span-2 py-4 gradient-dark text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition">
                送信する
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;
