"use client";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: Role) => {
    login(role);
    if (role === "employer") router.push("/employer");
    else if (role === "admin") router.push("/admin");
    else router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center">
      <h2 className="text-3xl font-black mb-10">デモ用ログイン選択</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <button
          onClick={() => handleLogin("jobseeker")}
          className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl hover:border-indigo-600 transition flex flex-col items-center"
        >
          <i className="fas fa-user text-4xl text-indigo-500 mb-4"></i>
          <span className="font-bold">求職者として</span>
        </button>
        <button
          onClick={() => handleLogin("employer")}
          className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl hover:border-indigo-600 transition flex flex-col items-center"
        >
          <i className="fas fa-store text-4xl text-purple-500 mb-4"></i>
          <span className="font-bold">店舗として</span>
        </button>
        <button
          onClick={() => handleLogin("admin")}
          className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl hover:border-indigo-600 transition flex flex-col items-center"
        >
          <i className="fas fa-user-shield text-4xl text-red-500 mb-4"></i>
          <span className="font-bold">管理者として</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
