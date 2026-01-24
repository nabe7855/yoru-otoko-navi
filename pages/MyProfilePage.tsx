import { BookOpen, Briefcase, Heart, History, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { LIFESTYLE_OPTIONS, MBTI_TYPES, PERSONALITY_TAGS } from "../constants";
import { jobService } from "../services/jobService";
import { Application, Job, JobHuntingStatus, SeekerProfile } from "../types";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface MyProfilePageProps {
  userId: string;
  onSave: () => void;
}

const MyProfilePage: React.FC<MyProfilePageProps> = ({ userId, onSave }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "profile" | "applications" | "favorites" | "scouts"
  >("profile");
  const [profile, setProfile] = useState<SeekerProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<
    { application: Application; job: Job }[]
  >([]);
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [scoutMessages, setScoutMessages] = useState<
    { id: string; employer: string; message: string; date: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      setLoading(true);

      // Fetch Profile
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

      // Fetch Applications
      const apps = await jobService.getAppliedJobs(userId);
      setAppliedJobs(apps);

      // Fetch Favorites
      const favs = await jobService.getFavoriteJobs(userId);
      setFavoriteJobs(favs);

      // Fetch Scouts
      const scouts = await jobService.getScoutMessages(userId);
      setScoutMessages(scouts);

      setLoading(false);
    };
    fetchData();
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    await jobService.saveSeekerProfile(profile);
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

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (!profile)
    return (
      <div className="p-20 text-center text-gray-400">
        プロフィールの読み込みに失敗しました
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 p-1 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-4xl font-black text-amber-500">
                {profile.display_name?.[0] || "U"}
              </span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black mb-2 flex items-center justify-center md:justify-start gap-3">
              {profile.display_name}
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                {profile.job_hunting_status === "active"
                  ? "🔥 積極活動中"
                  : profile.job_hunting_status === "passive"
                    ? "👀 検討中"
                    : "💤 休止中"}
              </span>
            </h1>
            <p className="text-slate-400 text-sm font-medium mb-4">
              {profile.email}
            </p>
            <div className="flex gap-4 justify-center md:justify-start text-xs font-bold text-slate-300">
              <div className="flex items-center gap-1">
                <History size={14} className="text-indigo-400" />
                <span>応募済み: {appliedJobs.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-rose-400" />
                <span>お気に入り: {favoriteJobs.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail size={14} className="text-emerald-400" />
                <span>スカウト: {scoutMessages.length}</span>
              </div>
            </div>

            <button
              onClick={async () => {
                await logout();
                router.push("/");
              }}
              className="mt-6 md:mt-4 px-6 py-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-full border border-slate-700 transition flex items-center gap-2 mx-auto md:mx-0"
            >
              <Briefcase size={14} />{" "}
              {/* Reusing Briefcase as a fallback icon since LogOut is not imported, or update imports */}
              ログアウト
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide gap-2 md:gap-4 sticky top-16 md:top-20 z-30 bg-slate-50/90 backdrop-blur-sm py-2">
        {[
          { id: "profile", label: "プロフィール", icon: User },
          { id: "favorites", label: "お気に入り", icon: Heart },
          { id: "applications", label: "応募履歴", icon: History },
          { id: "scouts", label: "スカウト", icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-sm ${
                isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                  : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={16} className={isActive ? "text-amber-400" : ""} />
              {tab.label}
              {tab.id === "scouts" && scoutMessages.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {scoutMessages.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 animate-fade-in">
            <form onSubmit={handleSave} className="space-y-12">
              {/* Status Section */}
              <section className="bg-indigo-50/50 p-6 md:p-8 rounded-3xl border border-indigo-100/50">
                <h3 className="text-lg font-black text-indigo-900 mb-6 flex items-center gap-2">
                  <Briefcase size={20} className="text-indigo-600" />
                  就職活動ステータス
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
                            ? "border-indigo-600 bg-white text-indigo-600 shadow-lg shadow-indigo-100"
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
                    ),
                  )}
                </div>
              </section>

              {/* Basic Info */}
              <section className="space-y-8">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <User size={20} className="text-indigo-600" />
                  基本プロフィール
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                      表示名
                    </label>
                    <input
                      type="text"
                      value={profile.display_name}
                      onChange={(e) =>
                        setProfile({ ...profile, display_name: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 outline-none font-bold text-slate-800 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-400 font-bold cursor-not-allowed"
                    />
                  </div>
                </div>
              </section>

              {/* Personality Diagnosis Section */}
              <section className="space-y-8">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-600" />
                  自己分析・パーソナリティ
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                      性格診断 (MBTI)
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none font-bold text-slate-800 appearance-none cursor-pointer hover:bg-slate-100 transition"
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
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                      ライフスタイル
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-purple-100 outline-none font-bold text-slate-800 appearance-none cursor-pointer hover:bg-slate-100 transition"
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
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-4 uppercase tracking-widest">
                    あなたの性格タグ（複数選択可）
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PERSONALITY_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          profile.personality_tags?.includes(tag)
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                            : "bg-slate-50 text-slate-500 hover:bg-white hover:text-indigo-500 border border-transparent hover:border-indigo-100"
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
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Heart size={20} className="text-rose-500" />
                  希望条件・タイプ
                </h3>

                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                      希望する店舗の雰囲気
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium leading-relaxed resize-none"
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
                    <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-widest">
                      会いたい客層・人物像
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-rose-100 outline-none text-sm font-medium leading-relaxed resize-none"
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

              <div className="flex justify-end pt-8 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 md:px-12 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/30 flex items-center justify-center transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                >
                  {isSaving ? "保存中..." : "プロフィールを保存"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {favoriteJobs.length > 0 ? (
              favoriteJobs.map((job) => (
                <div
                  key={job.id}
                  className="transform hover:scale-[1.01] transition-all"
                >
                  <JobCard job={job} onClick={() => {}} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Heart size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">
                  お気に入りはまだありません
                </h3>
                <p className="text-slate-400 text-sm">
                  気になる求人を見つけて「保存」しましょう
                </p>
                <Link
                  href="/jobs"
                  className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition"
                >
                  求人を探す
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="space-y-4 animate-fade-in">
            {appliedJobs.length > 0 ? (
              appliedJobs.map(({ application, job }) => (
                <div
                  key={application.id}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-indigo-100 transition"
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${
                      application.status === "rejected"
                        ? "bg-slate-300"
                        : application.status === "offer"
                          ? "bg-emerald-500"
                          : "bg-indigo-500"
                    }`}
                  ></div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          application.status === "rejected"
                            ? "bg-slate-100 text-slate-500"
                            : application.status === "offer"
                              ? "bg-emerald-100 text-emerald-600"
                              : application.status === "contacted"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-indigo-100 text-indigo-600"
                        }`}
                      >
                        {application.status === "submitted"
                          ? "応募済み"
                          : application.status === "contacted"
                            ? "連絡あり"
                            : application.status === "interview"
                              ? "面接調整中"
                              : application.status === "offer"
                                ? "採用"
                                : "不採用"}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {new Date(application.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-800 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm font-bold text-slate-500 mb-4">
                      {job.employer_name}
                    </p>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
                      <span className="px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        {job.employment_type}
                      </span>
                      <span className="px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        {job.area_city}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 md:w-48">
                    <button className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition">
                      求人詳細を見る
                    </button>
                    <button className="w-full py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-200 transition">
                      メッセージを送る
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <History size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">
                  まだ応募履歴がありません
                </h3>
                <p className="text-slate-400 text-sm">
                  気になる求人を見つけて応募してみましょう
                </p>
                <Link
                  href="/jobs"
                  className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition"
                >
                  求人を探す
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Scouts Tab */}
        {activeTab === "scouts" && (
          <div className="space-y-4 animate-fade-in">
            {scoutMessages.length > 0 ? (
              scoutMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm shadow-indigo-100 flex gap-4 hover:border-indigo-300 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
                    <Mail size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-indigo-900">
                        {msg.employer}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400">
                        {msg.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
                      {msg.message}
                    </p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-full border border-amber-100">
                        ✨ プレミアムスカウト
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Mail size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700 mb-2">
                  スカウトはまだ届いていません
                </h3>
                <p className="text-slate-400 text-sm">
                  プロフィールを充実させるとスカウトが届きやすくなります
                </p>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition"
                >
                  プロフィールを編集
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfilePage;
