"use client";

import {
  BookOpen,
  ChevronDown,
  CreditCard,
  HelpCircle,
  UserCheck,
} from "lucide-react";
import React from "react";

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl animate-in fade-in duration-700">
      <div className="text-center mb-16 md:mb-24">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-[2rem] mb-6 shadow-sm">
          <HelpCircle className="text-indigo-600" size={40} />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          よくあるご質問
        </h1>
        <p className="text-slate-500 font-bold max-w-xl mx-auto">
          業界に関する疑問や不安を解消するためのガイドです。初めての方でも安心してスタートできるようサポートします。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-32">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-3">仕事内容</h3>
          <p className="text-sm text-slate-500 font-medium">
            ボーイ・黒服の具体的な業務について
          </p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
            <CreditCard size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-3">給料・待遇</h3>
          <p className="text-sm text-slate-500 font-medium">
            日払いや昇給制度の詳細について
          </p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
            <UserCheck size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-3">採用の流れ</h3>
          <p className="text-sm text-slate-500 font-medium">
            応募から体験入店までのステップ
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 text-center md:text-left">
          主要なQA
        </h2>
        {[
          {
            title: "未経験でも本当に稼げますか？",
            content:
              "はい、可能です。多くの店舗で充実した研修制度があり、未経験から始めて月収50万円以上を目指すスタッフも少なくありません。やる気と真面目さが評価に直結する業界です。",
          },
          {
            title: "お酒が飲めなくても大丈夫ですか？",
            content:
              "全く問題ありません。スタッフ（ボーイ・黒服）の主な業務は接客サポートや店舗運営であり、基本的にお客様とお酒を飲むことはありません。下戸のスタッフも多数活躍しています。",
          },
          {
            title: "給与・待遇について詳しく知りたい",
            content:
              "日払いや週払い、昇給制度などは店舗により異なります。求人詳細の『給与』欄を必ずご確認ください。多くの店舗で日払い制度を導入しており、急な出費にも対応可能です。",
          },
          {
            title: "勤務時間・シフトの融通は利きますか？",
            content:
              "基本的に夜間（18時〜LAST）の勤務が中心ですが、週2日からOKのアルバイトから、週休2日の正社員まで幅広く募集されています。Wワークの方も多くいらっしゃいます。",
          },
          {
            title: "応募から採用までの流れは？",
            content:
              "WebまたはLINEから応募後、店舗担当者より面接日程の調整連絡が入ります。当日は履歴書不要の店舗も多いです。まずは体験入店で職場の雰囲気を確認することをお勧めします。",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-200 transition-colors overflow-hidden group shadow-sm"
          >
            <div className="p-6 md:p-8 flex items-center justify-between text-left cursor-pointer">
              <span className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                <ChevronDown size={20} />
              </div>
            </div>
            <div className="px-6 md:px-8 pb-8 transition-all">
              <div className="border-t border-slate-100 pt-6 text-base text-slate-600 font-medium leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 md:mt-32 bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
        <h3 className="text-2xl md:text-4xl font-black text-white mb-6">
          解決しない場合は
        </h3>
        <p className="text-slate-400 font-bold max-w-xl mx-auto mb-10 leading-relaxed">
          公式LINEから直接担当者にお問い合わせいただけます。24時間以内にサポートスタッフが回答いたします。
        </p>
        <button className="px-10 py-5 bg-emerald-500 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto">
          <span>公式LINEで個別に質問する</span>
        </button>
      </div>
    </div>
  );
};

export default FAQPage;
