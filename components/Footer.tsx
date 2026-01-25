"use client";

import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 lg:py-20 border-t border-slate-800 pb-28 lg:pb-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                夜男ナビ{" "}
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100">
                  -ヨルオナビ-
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm font-medium">
              夜男ナビ（よるおナビ）は、男性ナイトワークに特化した日本最大級の求人プラットフォームです。
              全国の厳選された優良店舗のみを掲載し、あなたの「稼ぎたい」を全力でサポートします。
            </p>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 tracking-widest uppercase text-sm">
              サイトマップ
            </h4>
            <ul className="text-sm space-y-4 font-bold">
              <li>
                <Link
                  href="/jobs"
                  className="hover:text-amber-400 transition-colors"
                >
                  求人を検索
                </Link>
              </li>
              <li>
                <Link
                  href="/matcher"
                  className="hover:text-amber-400 transition-colors"
                >
                  30秒診断
                </Link>
              </li>
              <li>
                <Link
                  href="/employer"
                  className="hover:text-amber-400 transition-colors"
                >
                  店舗掲載について
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 tracking-widest uppercase text-sm">
              法的情報
            </h4>
            <ul className="text-sm space-y-4 font-bold">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-amber-400 transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-400 transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="hover:text-amber-400 transition-colors"
                >
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-[10px] md:text-xs text-center font-black tracking-widest text-slate-600">
          &copy; {new Date().getFullYear()} YORUO NAVI. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
