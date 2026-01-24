"use client";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminLoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await login(email, password);
    if (error) {
      setError("認証に失敗しました。管理者権限がない可能性があります。");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-md border border-slate-800">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
            <ShieldAlert size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-black mb-2 text-center text-white">
          Admin Console
        </h2>
        <p className="text-slate-500 text-center text-sm font-bold mb-8">
          管理者専用ログイン
        </p>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl text-sm font-bold animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
              管理者ID (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-indigo-500 text-white outline-none transition font-bold"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-indigo-500 text-white outline-none transition font-bold"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-black transition shadow-lg shadow-indigo-900/20 ${
              loading
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {loading ? "認証中..." : "管理画面へアクセス"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
