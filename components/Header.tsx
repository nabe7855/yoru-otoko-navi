"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
            <i className="fas fa-moon text-white"></i>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tighter">
            ヨルオトコナビ
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/jobs"
            className={`text-sm font-bold ${
              pathname === "/jobs"
                ? "text-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            求人を探す
          </Link>
          <Link
            href="/matcher"
            className={`text-sm font-bold ${
              pathname === "/matcher"
                ? "text-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            30秒診断
          </Link>
          {user?.role === "jobseeker" && (
            <Link
              href="/my-apps"
              className={`text-sm font-bold ${
                pathname === "/my-apps"
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              応募履歴
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!isLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href={
                      user.role === "employer"
                        ? "/employer"
                        : user.role === "admin"
                        ? "/admin"
                        : "/profile"
                    }
                    className="flex items-center gap-3 px-4 py-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">
                      {user.displayName?.[0] || user.id[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-gray-700 hidden lg:inline">
                      {user.displayName || "マイページ"}
                    </span>
                  </Link>
                  <button
                    onClick={async () => {
                      await logout();
                      router.push("/");
                    }}
                    className="text-xs font-bold text-gray-400 hover:text-red-500"
                  >
                    ログアウト
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/signup"
                    className="px-6 py-3 bg-indigo-600 text-white text-sm font-black rounded-xl hover:bg-indigo-700 transition active:scale-95 flex items-center shadow-lg shadow-indigo-100"
                  >
                    新規登録
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
