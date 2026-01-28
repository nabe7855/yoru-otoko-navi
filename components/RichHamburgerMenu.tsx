"use client";

import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
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

// Animation Variants with explicit typing to avoid lint errors
const overlayVariants: Variants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(8px)" },
};

const panelVariants: Variants = {
  hidden: {
    x: "100%",
    transition: { type: "spring", damping: 25, stiffness: 200 },
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-[101] overflow-y-auto shadow-2xl sidebar-scrollbar"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10 backdrop-blur-md border border-white/10"
            >
              <X size={24} />
            </motion.button>

            {/* Content */}
            <div className="p-8 pt-20 space-y-10">
              {/* ① アカウント・アクションエリア */}
              <motion.section variants={itemVariants} className="pt-4">
                <div className="flex items-center gap-5 mb-8">
                  {user ? (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg rotate-3">
                        {user.display_name?.[0] || "U"}
                      </div>
                      <div>
                        <p className="text-white font-black text-lg">
                          {user.display_name || "ユーザー様"}
                        </p>
                        <p className="text-slate-400 text-xs font-medium">
                          {user.email}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-4 w-full">
                      <Link
                        href="/login"
                        onClick={() => onClose()}
                        className="flex-1 px-6 py-4 rounded-2xl border-2 border-white/10 text-white font-bold text-center hover:bg-white/5 transition active:scale-95"
                      >
                        ログイン
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => onClose()}
                        className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-center hover:brightness-110 transition shadow-lg shadow-cyan-500/20 active:scale-95"
                      >
                        新規登録
                      </Link>
                    </div>
                  )}
                </div>

                {/* LINE登録ボタン */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -top-3 left-6 bg-amber-400 text-slate-900 text-[10px] font-black px-4 py-1 rounded-full shadow-lg z-10 animate-bounce">
                    PayPayマネーが当たる！
                  </div>
                  <button className="w-full bg-[#06C755] text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:brightness-110 transition flex items-center justify-center gap-4 border border-white/10">
                    <Image
                      src="/line-icon.png"
                      alt="LINE"
                      width={28}
                      height={28}
                      className="brightness-0 invert group-hover:rotate-12 transition-transform"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="text-lg">LINE無料登録で特典GET</span>
                  </button>
                </motion.div>
              </motion.section>

              {/* ② 9グリッド・クイックメニュー */}
              <motion.section variants={itemVariants}>
                <h3 className="text-slate-400 font-black text-xs mb-6 flex items-center gap-3 uppercase tracking-[0.2em]">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></span>
                  Quick Menu
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {QUICK_MENU_ITEMS.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNavigation(item.link)}
                        className="group relative aspect-square rounded-[2rem] bg-slate-800/50 border border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden backdrop-blur-sm"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                        />
                        <div className="relative h-full flex flex-col items-center justify-center gap-3 p-2">
                          {Icon && (
                            <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                              <Icon className="text-cyan-400" size={24} />
                            </div>
                          )}
                          <span className="text-white text-[10px] font-black text-center leading-tight tracking-tighter">
                            {item.label}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>

              {/* ③ インフィニティ・バナーエリア */}
              <motion.section variants={itemVariants}>
                <h3 className="text-slate-400 font-black text-xs mb-6 flex items-center gap-3 uppercase tracking-[0.2em]">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></span>
                  Discover Features
                </h3>
                <div className="space-y-5">
                  {MENU_BANNERS.map((banner) => (
                    <motion.button
                      key={banner.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(banner.link)}
                      className="group relative w-full h-36 rounded-[2rem] overflow-hidden border border-white/10 shadow-xl"
                    >
                      <Image
                        src={banner.image}
                        alt={banner.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-80 group-hover:opacity-60 transition-opacity`}
                      />
                      <div className="absolute inset-0 flex flex-col items-start justify-center p-8">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="text-white font-black text-xl mb-1 drop-shadow-lg">
                            {banner.title}
                          </h4>
                          <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                            {banner.subtitle}
                          </p>
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.section>

              {/* ④ 直接コンタクトエリア */}
              <motion.section variants={itemVariants}>
                <h3 className="text-slate-400 font-black text-xs mb-6 flex items-center gap-3 uppercase tracking-[0.2em]">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></span>
                  Contact Us
                </h3>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-slate-100 text-slate-900 font-black py-5 rounded-[1.5rem] hover:brightness-110 transition flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Image
                      src="/line-icon.png"
                      alt="LINE"
                      width={24}
                      height={24}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>LINEでお問い合わせ</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black py-5 rounded-[1.5rem] hover:brightness-110 transition flex items-center justify-center gap-4 shadow-xl shadow-blue-900/40"
                  >
                    <div className="p-2 bg-white/10 rounded-xl">
                      <Phone size={24} />
                    </div>
                    <div className="text-left">
                      <div className="text-base">電話で相談する</div>
                      <div className="text-[10px] opacity-70 font-bold uppercase tracking-widest">
                        Available 12:00〜22:00
                      </div>
                    </div>
                  </motion.button>
                </div>
              </motion.section>

              {/* ⑤ その他・サイト情報 */}
              <motion.section
                variants={itemVariants}
                className="pt-6 border-t border-white/5"
              >
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <Link
                    href="/terms"
                    onClick={() => onClose()}
                    className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={() => onClose()}
                    className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => onClose()}
                    className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    Company
                  </Link>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest"
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </motion.section>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] pb-12"
              >
                © 2024 YORU-OTOKO NAVI
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RichHamburgerMenu;
