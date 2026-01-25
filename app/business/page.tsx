"use client";

import { CheckCircle2, Mail, TrendingUp, Users } from "lucide-react";
import React from "react";

const BusinessPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-900 text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8">
            RECRUITER PROGRAM
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            店舗様の採用を、
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">
              劇的に変える。
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12 font-bold text-base md:text-lg leading-relaxed">
            夜男ナビは、意欲の高い男性求職者と店舗を繋ぐ、国内最大級の特化型プラットフォームです。最新のテクノロジーでマッチングを最適化します。
          </p>
          <button className="bg-white text-slate-900 font-black px-10 py-5 rounded-2xl shadow-2xl hover:bg-slate-100 transition-all active:scale-95 text-base md:text-lg">
            掲載のお問い合わせはこちら
          </button>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
            <div className="space-y-6 group">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:rotate-6 transition-transform duration-500">
                <TrendingUp size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                圧倒的な集客力
              </h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                SEO・広告運用に特化し、「稼ぎたい」男性ユーザーへダイレクトにリーチします。他媒体を凌駕するPV数を実現。
              </p>
            </div>
            <div className="space-y-6 group text-center">
              <div className="w-20 h-20 bg-cyan-50 text-cyan-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:-rotate-6 transition-transform duration-500">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                質の高いマッチング
              </h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                業界特有のこだわり検索やMBTI診断により、店舗の求める人材が正確に応募しやすい設計になっています。
              </p>
            </div>
            <div className="space-y-6 group">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm group-hover:rotate-6 transition-transform duration-500">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                簡単な管理システム
              </h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                直感的な管理画面で、求人の更新や応募者対応がスムーズに行えます。モバイルからの操作も快適です。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-indigo-900/5 border border-slate-200">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-12 flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-500">
                <Mail size={32} />
              </div>
              掲載資料請求・お問い合わせ
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  店舗名・会社名
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  placeholder="株式会社 〇〇"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  ご担当者名
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  placeholder="山田 太郎"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold"
                  placeholder="example@domain.com"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  お問い合わせ内容
                </label>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 h-48 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold resize-none"
                  placeholder="掲載プランの詳細を聞きたい...など"
                ></textarea>
              </div>
              <button
                type="button"
                className="md:col-span-2 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-[0.98] text-lg"
              >
                内容を送信する
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;
