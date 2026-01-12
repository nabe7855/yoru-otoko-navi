import React, { useState } from "react";
import { CATEGORIES, EMPLOYMENT_TYPES, PREFECTURES } from "../constants";

interface PostJobPageProps {
  employerId: string;
  employerName: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const PostJobPage: React.FC<PostJobPageProps> = ({
  employerId,
  employerName,
  onSubmit,
  onCancel,
}) => {
  if (!employerId) return null;
  const [formData, setFormData] = useState({
    title: "",
    category: CATEGORIES[0],
    employment_type: EMPLOYMENT_TYPES[1],
    area_pref: PREFECTURES[0],
    area_city: "",
    salary_type: "hourly",
    salary_min: 1200,
    salary_max: 1500,
    description: "",
    tags: [] as string[],
    qualifications: "",
    access_info: "",
    salary_details: "",
    benefits: "",
    insurance: "",
    working_hours: "",
    holidays: "",
    workplace_info: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      employer_id: employerId,
      employer_name: employerName,
      updated_at: new Date().toISOString(),
      status: "pending",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 overflow-hidden">
        <div className="bg-slate-900 px-10 py-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-2 tracking-tight">
              求人を掲載する
            </h1>
            <p className="text-slate-400">
              求人情報を入力して、新しい募集を作成しましょう。
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-12">
          <section className="space-y-8">
            <h3 className="text-xl font-black text-gray-800 flex items-center">
              <span className="w-1.5 h-6 bg-blue-600 mr-4 rounded-full"></span>
              基本設定
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  求人タイトル
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-gray-800"
                  placeholder="例: 【安平町】時給1200円！日払いOKの工場スタッフ"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  業態
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  雇用形態
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold"
                  value={formData.employment_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employment_type: e.target.value,
                    })
                  }
                >
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-xl font-black text-gray-800 flex items-center">
              <span className="w-1.5 h-6 bg-blue-600 mr-4 rounded-full"></span>
              募集要項の詳細入力
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {[
                {
                  label: "経験・資格",
                  field: "qualifications",
                  placeholder: "未経験可、資格不要など",
                },
                {
                  label: "勤務地・交通手段",
                  field: "access_info",
                  placeholder: "北海道勇払郡安平町、植苗駅より車9分など",
                },
                {
                  label: "給与・報酬の詳細",
                  field: "salary_details",
                  placeholder: "時給1200円、月収例20.8万円など",
                },
                {
                  label: "待遇・福利厚生",
                  field: "benefits",
                  placeholder: "社会保険完備、日払いOK、食堂ありなど",
                },
                {
                  label: "加入保険",
                  field: "insurance",
                  placeholder: "社会保険あり（健康・厚生・雇用・労災）など",
                },
                {
                  label: "勤務時間",
                  field: "working_hours",
                  placeholder: "8:30～17:00（実働7.5h）など",
                },
                {
                  label: "休日・休暇",
                  field: "holidays",
                  placeholder: "土日祝（工場カレンダー）など",
                },
                {
                  label: "職場情報・PR",
                  field: "workplace_info",
                  placeholder: "2020～2022年度、全国277名が社員登用！など",
                },
              ].map((item) => (
                <div key={item.field} className="group">
                  <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest group-focus-within:text-blue-600 transition">
                    {item.label}
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm leading-relaxed"
                    placeholder={item.placeholder}
                    value={(formData as any)[item.field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [item.field]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="flex gap-4 pt-12">
            <button
              type="button"
              onClick={onCancel}
              className="px-10 py-5 text-gray-400 font-black hover:text-gray-600 transition"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-grow py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl shadow-2xl shadow-blue-900/20 flex items-center justify-center transition active:scale-95"
            >
              <i className="fas fa-paper-plane mr-3"></i>
              <span>求人を公開申請する</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
