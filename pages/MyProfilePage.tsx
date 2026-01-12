import React, { useEffect, useState } from "react";
import { LIFESTYLE_OPTIONS, MBTI_TYPES, PERSONALITY_TAGS } from "../constants";
import { jobService } from "../services/jobService";
import { JobHuntingStatus, SeekerProfile } from "../types";

interface MyProfilePageProps {
  userId: string;
  onSave: () => void;
}

const MyProfilePage: React.FC<MyProfilePageProps> = ({ userId, onSave }) => {
  if (!userId) return null;
  const [profile, setProfile] = useState<SeekerProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const p = await jobService.getSeekerProfile(userId);
      if (p) {
        setProfile({
          ...p,
          personality_tags: p.personality_tags || [],
          job_hunting_status: p.job_hunting_status || "passive",
          desired_atmosphere: p.desired_atmosphere || "",
          desired_person_type: p.desired_person_type || "",
          lifestyle: p.lifestyle || "",
        });
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    jobService.saveSeekerProfile(profile);
    setTimeout(() => {
      setIsSaving(false);
      alert("プロフィールを更新しました。");
      onSave();
    }, 500);
  };

  const toggleTag = (tag: string) => {
    if (!profile) return;
    const current = profile.personality_tags || [];
    if (current.includes(tag)) {
      setProfile({
        ...profile,
        personality_tags: current.filter((t) => t !== tag),
      });
    } else {
      setProfile({ ...profile, personality_tags: [...current, tag] });
    }
  };

  if (!profile)
    return <div className="p-20 text-center text-gray-400">読み込み中...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-12 text-white relative">
          <h1 className="text-4xl font-black mb-2">マイプロフィール</h1>
          <p className="opacity-80">
            自己分析と条件を設定して、あなたにぴったりの店舗と出会いましょう。
          </p>
        </div>

        <form onSubmit={handleSave} className="p-10 space-y-12">
          {/* Status Section */}
          <section className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100">
            <h3 className="text-xl font-black text-indigo-900 mb-6 flex items-center">
              <i className="fas fa-search-dollar mr-3"></i> 就職活動ステータス
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["active", "passive", "closed"] as JobHuntingStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setProfile({ ...profile, job_hunting_status: status })
                    }
                    className={`py-4 px-6 rounded-2xl border-2 transition-all font-bold text-sm ${
                      profile.job_hunting_status === status
                        ? "border-indigo-600 bg-white text-indigo-600 shadow-md"
                        : "border-white bg-white/50 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    {status === "active"
                      ? "🔥 積極的に探し中"
                      : status === "passive"
                      ? "👀 良い所があれば"
                      : "💤 お休み中"}
                    <p className="text-[10px] mt-1 opacity-70 font-normal">
                      {status === "active"
                        ? "店舗からスカウトが届きます"
                        : status === "passive"
                        ? "条件が合う場合のみ通知"
                        : "非公開になります"}
                    </p>
                  </button>
                )
              )}
            </div>
          </section>

          {/* Personality Diagnosis Section */}
          <section className="space-y-8">
            <h3 className="text-xl font-black text-gray-800 flex items-center">
              <span className="w-1.5 h-6 bg-indigo-600 mr-4 rounded-full"></span>
              自己分析・パーソナリティ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  性格診断 (MBTI)
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-gray-800"
                  value={profile.mbti || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, mbti: e.target.value })
                  }
                >
                  <option value="">未設定</option>
                  {MBTI_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-400 mt-2 ml-2">
                  ※相性の良い店舗マッチングに使用されます。
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  ライフスタイル
                </label>
                <select
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-gray-800"
                  value={profile.lifestyle}
                  onChange={(e) =>
                    setProfile({ ...profile, lifestyle: e.target.value })
                  }
                >
                  <option value="">未設定</option>
                  {LIFESTYLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">
                あなたの性格タグ（複数選択可）
              </label>
              <div className="flex flex-wrap gap-2">
                {PERSONALITY_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-5 py-2 rounded-full border-2 text-sm font-bold transition-all ${
                      profile.personality_tags?.includes(tag)
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "bg-white border-gray-100 text-gray-400 hover:border-indigo-100 hover:text-indigo-400"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Desired Match Section */}
          <section className="space-y-8">
            <h3 className="text-xl font-black text-gray-800 flex items-center">
              <span className="w-1.5 h-6 bg-purple-600 mr-4 rounded-full"></span>
              希望するマッチング情報
            </h3>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  希望する店舗の雰囲気
                </label>
                <textarea
                  rows={3}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none text-sm leading-relaxed"
                  placeholder="例: アットホームで派閥がない、落ち着いた大人な雰囲気、など"
                  value={profile.desired_atmosphere}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      desired_atmosphere: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">
                  会いたい客層・人物像
                </label>
                <textarea
                  rows={3}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none text-sm leading-relaxed"
                  placeholder="例: 経営者の方、静かに飲まれる方、紳士的な方、など"
                  value={profile.desired_person_type}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      desired_person_type: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-12">
            <button
              type="submit"
              disabled={isSaving}
              className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-2xl shadow-indigo-900/20 flex items-center justify-center transition active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <i className="fas fa-spinner fa-spin mr-3"></i>
              ) : (
                <i className="fas fa-save mr-3"></i>
              )}
              <span>プロフィールを保存する</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfilePage;
