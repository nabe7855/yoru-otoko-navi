"use client";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<Role>("jobseeker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signup(email, password, role, displayName);
    if (error) {
      setError(error.message || "登録に失敗しました。");
      setLoading(false);
    } else {
      alert("確認メールを送信しました。メールをご確認ください。");
      router.push("/login");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black mb-8 text-center text-gray-900">
          新規登録
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              表示名
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
              placeholder="山田 太郎"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
              placeholder="example@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition font-bold"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              あなたはどっち？
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRole("jobseeker")}
                className={`flex-1 py-4 px-2 rounded-2xl font-bold text-xs transition border-2 ${
                  role === "jobseeker"
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-gray-100 text-gray-400"
                }`}
              >
                求職者
              </button>
              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`flex-1 py-4 px-2 rounded-2xl font-bold text-xs transition border-2 ${
                  role === "employer"
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-white border-gray-100 text-gray-400"
                }`}
              >
                店舗
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black transition shadow-lg shadow-indigo-100 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm font-bold">
            すでにアカウントをお持ちですか？
          </p>
          <Link
            href="/login"
            className="text-indigo-600 font-black hover:underline mt-2 inline-block"
          >
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
