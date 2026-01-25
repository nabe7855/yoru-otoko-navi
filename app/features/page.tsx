"use client";

import { Award, ChevronRight, DollarSign, Star, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

const FeaturesPage: React.FC = () => {
  const featureLists = [
    {
      title: "高収入・賞与あり求人",
      desc: "月給40万オーバー確実。結果を出せば即昇格、即昇給。",
      icon: <DollarSign className="text-amber-500" />,
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-200",
      link: "/jobs?tags=高収入",
    },
    {
      title: "未経験・研修充実の店舗",
      desc: "黒服デビューを完全サポート。接客の基礎から学べます。",
      icon: <Zap className="text-indigo-500" />,
      color: "from-indigo-500/20 to-indigo-500/5",
      borderColor: "border-indigo-200",
      link: "/jobs?tags=未経験歓迎",
    },
    {
      title: "寮・社宅完備で即入居OK",
      desc: "鞄一つでスタート。住環境も整った優良店のみを厳選。",
      icon: <Star className="text-emerald-500" />,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-200",
      link: "/jobs?tags=寮・社宅あり",
    },
    {
      title: "業界大手グループ特集",
      desc: "圧倒的な安定感。福利厚生や将来性で選ぶならこちら。",
      icon: <Award className="text-purple-500" />,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-200",
      link: "/jobs?tags=大手グループ",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
      <div className="mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            特集
          </span>
          から探す
        </h1>
        <p className="text-slate-500 font-bold">
          あなたの希望にぴったりのカテゴリーを厳選しました。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-24">
        {featureLists.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={`group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border-2 ${item.borderColor} bg-gradient-to-br ${item.color} hover:shadow-2xl transition-all duration-500 overflow-hidden active:scale-[0.98]`}
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000 grayscale group-hover:grayscale-0">
              {React.cloneElement(item.icon as React.ReactElement<any>, {
                size: 160,
              })}
            </div>

            <div className="mb-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform duration-500">
              {React.cloneElement(item.icon as React.ReactElement<any>, {
                size: 32,
              })}
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
              {item.title}
            </h3>
            <p className="text-slate-600 mb-8 max-w-sm font-medium leading-relaxed">
              {item.desc}
            </p>

            <div className="mt-auto flex items-center gap-3 text-sm font-black text-slate-800">
              求人を詳しく見る
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6">
            掲載リクエスト受付中
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-bold">
            「地元の駅周辺で探したい」「特定のグループの求人が見たい」などのご要望があれば、運営事務局までお気軽にお寄せください。
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-black rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all">
            リクエストを送信する
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
