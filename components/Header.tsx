"use client";

import RichHamburgerMenu from "@/components/RichHamburgerMenu";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Header: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-cyan-100 text-slate-800 shadow-sm h-14 md:h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl md:text-3xl font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent group-hover:brightness-110 transition tracking-tighter">
                夜男ナビ{" "}
                <span className="text-sm md:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
                  -ヨルオナビ-
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-sm font-bold">
            <Link
              href="/jobs"
              className={`hover:text-cyan-500 transition-colors ${pathname === "/jobs" ? "text-cyan-600" : "text-slate-600"}`}
            >
              求人を探す
            </Link>
            <Link
              href="/features"
              className={`hover:text-cyan-500 transition-colors ${pathname === "/features" ? "text-cyan-600" : "text-slate-600"}`}
            >
              特集
            </Link>
            <Link
              href="/faq"
              className={`hover:text-cyan-500 transition-colors ${pathname === "/faq" ? "text-cyan-600" : "text-slate-600"}`}
            >
              よくある質問
            </Link>
            <Link
              href="/matcher"
              className={`hover:text-cyan-500 transition-colors ${pathname === "/matcher" ? "text-cyan-600" : "text-slate-600"}`}
            >
              30秒診断
            </Link>
            <Link
              href="/business"
              className="hover:text-cyan-500 transition-colors border-l border-slate-200 pl-10 text-slate-500"
            >
              店舗様向け
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    <Link
                      href={
                        user.role === "employer"
                          ? "/employer"
                          : user.role === "admin"
                            ? "/admin"
                            : "/profile"
                      }
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition text-xs font-bold text-slate-700"
                    >
                      <User size={14} className="text-cyan-500" />
                      <span className="hidden sm:inline">
                        {user.display_name || "マイページ"}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-xs font-bold text-slate-400 hover:text-red-400 transition px-2"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition text-xs font-bold text-slate-600"
                    >
                      <LogIn size={14} />
                      <span>ログイン</span>
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center gap-1.5 px-4 md:px-6 py-2 md:py-3 rounded-full gradient-cyan text-white font-black hover:brightness-110 transition text-xs md:text-sm shadow-lg shadow-cyan-500/20"
                    >
                      <User size={16} />
                      <span>新規登録</span>
                    </Link>
                  </>
                )}
              </>
            )}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-cyan-500 transition"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <RichHamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default Header;
