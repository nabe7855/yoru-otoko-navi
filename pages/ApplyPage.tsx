import React, { useState } from "react";
import { Job } from "../types";

interface ApplyPageProps {
  job: Job;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ job, onSubmit, onCancel }) => {
  if (!job) return null;
  const [formData, setFormData] = useState({
    name: "",
    contact_type: "line",
    contact_value: "",
    message: "",
    start_date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
        <div className="text-center mb-10">
          <span className="text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
            Application
          </span>
          <h1 className="text-3xl font-black text-gray-900 mt-4">
            求人に応募する
          </h1>
          <p className="text-gray-400 mt-2">店舗: {job.employer_name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              お名前（ニックネーム可）<span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="例: たなか"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              優先する連絡手段<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["line", "phone", "email"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, contact_type: type })
                  }
                  className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center transition ${
                    formData.contact_type === type
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "border-gray-100 text-gray-400 hover:border-gray-200"
                  }`}
                >
                  <i
                    className={`fab fa-${
                      type === "line"
                        ? "line"
                        : type === "phone"
                        ? "flipboard"
                        : "envelope"
                    } text-xl mb-1`}
                  ></i>
                  <span className="text-xs font-bold uppercase">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              連絡先情報（ID、番号、アドレスなど）
              <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={`${
                formData.contact_type === "line"
                  ? "LINE ID"
                  : formData.contact_type === "phone"
                  ? "電話番号"
                  : "メールアドレス"
              }を入力`}
              value={formData.contact_value}
              onChange={(e) =>
                setFormData({ ...formData, contact_value: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              勤務開始可能日
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              店舗へのメッセージ
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="勤務時間の希望や、質問などがあれば記入してください。"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl transition shadow-xl shadow-indigo-100"
            >
              応募を完了する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
