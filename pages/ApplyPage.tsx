"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Job } from "../types";

export interface ApplyFormData {
  name: string;
  contact_type: "line" | "phone" | "email";
  contact_value: string;
  message: string;
  start_date: string;
}

interface ApplyPageProps {
  job: Job;
  onSubmit: (data: ApplyFormData) => void;
  onCancel: () => void;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact_type: "line" as "line" | "phone" | "email",
    contact_value: "",
    message: "",
    start_date: "",
  });

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex justify-center bg-slate-50 min-h-screen">
      <div className="w-full max-w-2xl">
        <button
          onClick={onCancel}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-black text-xs md:text-sm bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 active:scale-95"
        >
          <ArrowLeft size={16} /> 戻る
        </button>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
          {/* Header */}
          <div className="relative z-10 mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] md:text-xs font-black rounded-full uppercase tracking-widest mb-6">
              <Send size={12} /> Entry Form
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
              求人に応募する
            </h1>
            <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                <User size={16} />
              </div>
              <p className="text-slate-500 font-black text-sm">
                {job.employer_name}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
            {/* Name */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                placeholder="例: 山田 太郎"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Contact Type */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                希望の連絡手段 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(["line", "phone", "email"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, contact_type: type })
                    }
                    className={`py-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                      formData.contact_type === type
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100 scale-100"
                        : "border-slate-50 bg-white text-slate-400 hover:border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    {type === "line" && <MessageCircle size={24} />}
                    {type === "phone" && <Phone size={24} />}
                    {type === "email" && <Mail size={24} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {type === "line"
                        ? "LINE"
                        : type === "phone"
                          ? "電話"
                          : "メール"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                連絡先情報 <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                placeholder={`${
                  formData.contact_type === "line"
                    ? "LINE IDを入力"
                    : formData.contact_type === "phone"
                      ? "電話番号を入力"
                      : "メールアドレスを入力"
                }`}
                value={formData.contact_value}
                onChange={(e) =>
                  setFormData({ ...formData, contact_value: e.target.value })
                }
              />
            </div>

            {/* Start Date */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                勤務開始可能日
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-700"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest">
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full"></div>
                店舗へのメッセージ
              </label>
              <textarea
                rows={4}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300"
                placeholder="勤務時間の希望や、質問などがあれば自由に入力してください。"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4">
              <AlertCircle className="text-amber-500 shrink-0" size={20} />
              <p className="text-xs text-amber-700 font-bold leading-relaxed">
                応募完了後、お店の担当者より選択した連絡手段へ24時間以内にご連絡いたします。迷惑メール設定やブロック解除等をご確認ください。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-5 text-slate-400 font-black hover:bg-slate-50 rounded-2xl transition-all uppercase tracking-widest text-xs"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-200 transform active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <CheckCircle2 size={20} />
                応募を完了する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
