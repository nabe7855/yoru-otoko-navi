"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Fixed Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.08)] bg-white">
        {/* 1st Row: Diagnosis Banner */}
        <Link href="/matcher" className="w-full block">
          <img
            src="/フッターナビゲーション1.png"
            alt="30秒診断"
            className="w-full h-auto object-cover max-h-24"
          />
        </Link>

        {/* 2nd Row: Navigation Buttons */}
        <div className="flex border-t border-gray-100 pb-4">
          <Link
            href="/"
            className={`flex-1 flex flex-col items-center justify-center py-2 transition ${
              pathname === "/"
                ? "text-indigo-600 bg-indigo-50/50"
                : "text-gray-400"
            }`}
          >
            <i className="fas fa-home text-lg"></i>
            <span className="text-[10px] font-black mt-0.5">ホーム</span>
          </Link>

          <button
            onClick={() => window.open("https://line.me/", "_blank")}
            className="flex-1 flex flex-col items-center justify-center py-2 text-[#06C755]"
          >
            <i className="fab fa-line text-2xl"></i>
            <span className="text-[10px] font-black mt-0.5">LINE相談</span>
          </button>

          <Link
            href="/jobs"
            className={`flex-1 flex flex-col items-center justify-center py-2 transition ${
              pathname === "/jobs"
                ? "text-indigo-600 bg-indigo-50/50"
                : "text-gray-400"
            }`}
          >
            <i className="fas fa-search text-lg"></i>
            <span className="text-[10px] font-black mt-0.5">探す</span>
          </Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12 pb-48 md:pb-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-moon text-indigo-400 text-2xl"></i>
              <span className="text-2xl font-bold">NightJob JP</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm">
              水商売に特化した、安心・安全な求人プラットフォーム。
              厳しい店舗基準で、あなたの夜のスタートを支えます。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">サービス</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/jobs">求人検索</Link>
              </li>
              <li>タレントマッチング</li>
              <li>求職者ガイド</li>
              <li>安心への取り組み</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">サポート</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>お問い合わせ</li>
              <li>利用規約</li>
              <li>プライバシーポリシー</li>
              <li>運営会社</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          © 2024 NightJob JP. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
