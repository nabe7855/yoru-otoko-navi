"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Banknote,
  BookOpen,
  Car,
  Home,
  LogOut,
  Phone,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MENU_BANNERS, QUICK_MENU_ITEMS } from "../constants";

interface RichHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  Banknote,
  UserCheck,
  Trophy,
  Home,
  TrendingUp,
  Car,
  Target,
  Star,
  BookOpen,
};

const RichHamburgerMenu: React.FC<RichHamburgerMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    onClose();
    router.push("/");
  };

  const handleNavigation = (link: string) => {
    onClose();
    router.push(link);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-[101] overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* ① アカウント・アクションエリア */}
          <section className="pt-4">
            <div className="flex items-center gap-4 mb-6">
              {user ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-black text-xl">
                    {user.display_name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {user.display_name || "ユーザー"}
                    </p>
                    <p className="text-slate-400 text-xs">{user.email}</p>
                  </div>
                </>
              ) : (
                <div className="flex gap-3 w-full">
                  <Link
                    href="/login"
                    onClick={() => onClose()}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-white/20 text-white font-bold text-center hover:bg-white/10 transition"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => onClose()}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 font-black text-center hover:brightness-110 transition shadow-lg"
                  >
                    新規登録
                  </Link>
                </div>
              )}
            </div>

            {/* LINE登録ボタン */}
            <div className="relative">
              <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10">
                PayPayマネーが当たる！
              </div>
              <button className="w-full bg-gradient-to-r from-[#06C755] to-[#00B900] text-white font-black py-4 rounded-2xl shadow-xl hover:brightness-110 transition flex items-center justify-center gap-3">
                <Image
                  src="/line-icon.png"
                  alt="LINE"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>LINE無料登録で特典GET</span>
              </button>
            </div>
          </section>

          {/* ② 9グリッド・クイックメニュー */}
          <section>
            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
              クイックメニュー
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {QUICK_MENU_ITEMS.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.link)}
                    className="group relative aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:border-white/30 transition-all overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center gap-2 p-2">
                      {Icon && (
                        <Icon
                          className="text-amber-400 group-hover:scale-110 transition-transform"
                          size={24}
                        />
                      )}
                      <span className="text-white text-[10px] font-bold text-center leading-tight">
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ③ インフィニティ・バナーエリア */}
          <section>
            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              特集コンテンツ
            </h3>
            <div className="space-y-4">
              {MENU_BANNERS.map((banner) => (
                <button
                  key={banner.id}
                  onClick={() => handleNavigation(banner.link)}
                  className="group relative w-full h-32 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-80 group-hover:opacity-70 transition-opacity`}
                  />
                  <div className="absolute inset-0 flex flex-col items-start justify-center p-6">
                    <h4 className="text-white font-black text-lg mb-1">
                      {banner.title}
                    </h4>
                    <p className="text-white/90 text-sm font-bold">
                      {banner.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* ④ 直接コンタクトエリア */}
          <section>
            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
              お問い合わせ
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-[#06C755] to-[#00B900] text-white font-bold py-4 rounded-xl hover:brightness-110 transition flex items-center justify-center gap-3">
                <Image
                  src="/line-icon.png"
                  alt="LINE"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>LINEでお問い合わせ</span>
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:brightness-110 transition flex items-center justify-center gap-3">
                <Phone size={20} />
                <div className="text-left">
                  <div>電話で相談する</div>
                  <div className="text-xs opacity-80">12:00〜22:00</div>
                </div>
              </button>
              <button
                onClick={() => handleNavigation("/faq")}
                className="w-full bg-slate-800 border border-white/20 text-white font-bold py-4 rounded-xl hover:bg-slate-700 transition"
              >
                よくある質問
              </button>
            </div>
          </section>

          {/* ⑤ その他・サイト情報 */}
          <section className="border-t border-white/10 pt-6">
            <div className="space-y-2">
              <Link
                href="/terms"
                onClick={() => onClose()}
                className="block text-slate-400 hover:text-white transition text-sm py-2"
              >
                利用規約
              </Link>
              <Link
                href="/privacy"
                onClick={() => onClose()}
                className="block text-slate-400 hover:text-white transition text-sm py-2"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/about"
                onClick={() => onClose()}
                className="block text-slate-400 hover:text-white transition text-sm py-2"
              >
                運営会社について
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition text-sm py-2"
                >
                  <LogOut size={16} />
                  <span>ログアウト</span>
                </button>
              )}
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-slate-500 text-xs pb-8">
            © 2024 夜漢ナビ All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default RichHamburgerMenu;
