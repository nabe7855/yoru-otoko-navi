"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const userRole = user?.role || "guest";

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-moon text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            NightJob JP
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/jobs"
            className={`text-sm font-medium ${
              pathname === "/jobs"
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }`}
          >
            求人を探す
          </Link>
          {userRole === "jobseeker" && (
            <>
              <Link
                href="/my-apps"
                className={`text-sm font-medium ${
                  pathname === "/my-apps"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                応募履歴
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium ${
                  pathname === "/profile"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                プロフィール設定
              </Link>
            </>
          )}
          {userRole === "employer" && (
            <>
              <Link
                href="/employer"
                className={`text-sm font-medium ${
                  pathname === "/employer"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                求人・応募管理
              </Link>
              <Link
                href="/talent-pool"
                className={`text-sm font-medium ${
                  pathname === "/talent-pool"
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                タレントを探す
              </Link>
            </>
          )}
          {userRole === "admin" && (
            <Link
              href="/admin"
              className={`text-sm font-medium ${
                pathname === "/admin"
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              管理者ツール
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {userRole === "guest" ? (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
            >
              ログイン
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                {userRole[0].toUpperCase()}
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
