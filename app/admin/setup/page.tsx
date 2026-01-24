"use client";
import { useAuth } from "@/context/AuthContext";
import { UserPlus } from "lucide-react";
import React, { useState } from "react";

const AdminSetupPage: React.FC = () => {
  const { signup } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Hardcoded credentials as requested
  const ADMIN_EMAIL = "yoruotoko@gmail.com";
  const ADMIN_PASS = "460105";

  const handleCreateAdmin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await signup(
        ADMIN_EMAIL,
        ADMIN_PASS,
        "admin",
        "管理者",
      );

      if (error) {
        setMessage("エラー: " + error.message);
      } else {
        setMessage(
          "管理者アカウントを作成しました。ログインページからログインしてください。",
        );
      }
    } catch (e) {
      setMessage("予期せぬエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">
          管理者アカウント セットアップ
        </h1>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6 text-left">
          <p className="text-sm font-bold text-amber-800 mb-2">
            作成されるアカウント:
          </p>
          <ul className="text-sm text-amber-700 space-y-1 font-mono">
            <li>Email: {ADMIN_EMAIL}</li>
            <li>Pass: {ADMIN_PASS}</li>
            <li>Role: admin</li>
          </ul>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-bold ${message.includes("エラー") ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleCreateAdmin}
          disabled={loading}
          className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />
          {loading ? "作成中..." : "管理者アカウントを作成"}
        </button>

        <a
          href="/admin/login"
          className="block mt-6 text-sm text-indigo-600 font-bold hover:underline"
        >
          管理者ログインページへ移動
        </a>
      </div>
    </div>
  );
};

export default AdminSetupPage;
