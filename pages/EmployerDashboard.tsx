import { Briefcase, Edit, LogOut, Mail, Search, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { jobService } from "../services/jobService";
import { Application, Employer, Job, SeekerProfile } from "../types";

interface EmployerDashboardProps {
  employer: Employer;
  onPostJob: () => void;
}

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  employer,
  onPostJob,
}) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [talents, setTalents] = useState<SeekerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "jobs" | "applications" | "scouts"
  >("jobs");

  // Edit Job State
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!employer) return;
    const fetchData = async () => {
      setLoading(true);
      const allJobs = await jobService.getJobs();
      const myJobs = allJobs.filter((j) => j.employer_id === employer.id);
      setJobs(myJobs);

      const allApps = await jobService.getApplications();
      const myJobIds = myJobs.map((j) => j.id);
      setApplications(allApps.filter((a) => myJobIds.includes(a.job_id)));

      // Fetch Mock Talents for Scout
      const matchingTalents = await jobService.getMatchingTalents();
      setTalents(matchingTalents);

      setLoading(false);
    };
    fetchData();
  }, [employer?.id, employer]);

  if (!employer) return null;

  const handleUpdateAppStatus = async (
    appId: string,
    status: Application["status"],
  ) => {
    await jobService.updateApplicationStatus(appId, status);
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status } : a)),
    );
  };

  const handleOpenEditJob = (job: Job) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    try {
      await jobService.updateJob(editingJob.id, {
        title: editingJob.title,
        salary_min: editingJob.salary_min,
        salary_max: editingJob.salary_max,
        description: editingJob.description,
      });

      setJobs((prev) =>
        prev.map((j) => (j.id === editingJob.id ? editingJob : j)),
      );
      setIsEditModalOpen(false);
      setEditingJob(null);
      alert("求人情報を更新しました");
    } catch (error) {
      alert("更新に失敗しました");
    }
  };

  const handleScout = (talentName: string) => {
    if (confirm(`${talentName}さんにスカウトメッセージを送信しますか？`)) {
      alert("スカウトを送信しました！");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{employer.name}</h1>
          <p className="text-gray-500 font-bold">店舗情報管理ダッシュボード</p>
          <button
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className="mt-2 text-xs font-bold text-gray-400 hover:text-rose-500 flex items-center gap-1 transition"
          >
            <LogOut size={12} /> ログアウト
          </button>
        </div>
        <button
          onClick={onPostJob}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 transition active:scale-95"
        >
          <i className="fas fa-plus"></i>
          <span>新規求人を投稿</span>
        </button>
      </div>

      {loading ? (
        <div className="p-20 text-center text-gray-400">読み込み中...</div>
      ) : (
        <>
          <div className="flex overflow-x-auto space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-full md:w-fit scrollbar-hide">
            {[
              {
                id: "jobs",
                label: "求人管理",
                icon: Briefcase,
                count: jobs.length,
              },
              {
                id: "applications",
                label: "応募管理",
                icon: Users,
                count: applications.length,
              },
              {
                id: "scouts",
                label: "スカウト",
                icon: Search,
                count: talents.length,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition whitespace-nowrap ${
                    isActive
                      ? "bg-white shadow-sm text-indigo-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>

          <div className="min-h-[400px]">
            {/* Jobs Tab */}
            {activeTab === "jobs" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                        <th className="px-6 py-4">求人タイトル</th>
                        <th className="px-6 py-4">ステータス</th>
                        <th className="px-6 py-4">給与</th>
                        <th className="px-6 py-4">更新日</th>
                        <th className="px-6 py-4 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {jobs.map((job) => (
                        <tr
                          key={job.id}
                          className="text-sm hover:bg-gray-50/50 transition"
                        >
                          <td className="px-6 py-4 font-bold text-gray-800">
                            {job.title}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                job.status === "published"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : job.status === "pending"
                                    ? "bg-amber-50 text-amber-600 border border-amber-100"
                                    : "bg-gray-100 text-gray-500 border border-gray-200"
                              }`}
                            >
                              {job.status === "published"
                                ? "公開中"
                                : job.status === "pending"
                                  ? "審査中"
                                  : "下書き"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-medium">
                            {job.salary_min.toLocaleString()}円〜
                          </td>
                          <td className="px-6 py-4 text-gray-400 font-medium">
                            {new Date(job.updated_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleOpenEditJob(job)}
                              className="text-indigo-600 hover:text-indigo-800 font-bold px-3 py-1 hover:bg-indigo-50 rounded-lg transition"
                            >
                              <Edit size={16} className="inline mr-1" />
                              編集
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {jobs.length === 0 && (
                  <div className="py-20 text-center text-gray-400">
                    まだ求人がありません
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-black text-xl text-gray-800">
                            {app.seeker_name}
                          </h3>
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-black rounded uppercase border border-gray-200">
                            {app.contact_type}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">
                            {new Date(app.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-indigo-600 font-bold mb-3 flex items-center gap-1">
                          <Briefcase size={14} />
                          対象求人: {app.job_title}
                        </p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-sm text-gray-700 font-medium leading-relaxed">
                            {app.message || "メッセージなし"}
                          </p>
                          <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-gray-500 font-bold">
                            連絡先: {app.contact_value}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col md:items-end gap-3 min-w-[200px]">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          ステータス更新
                        </label>
                        <select
                          className={`w-full bg-white border-2 rounded-xl text-sm p-3 font-bold outline-none focus:border-indigo-500 transition cursor-pointer ${
                            app.status === "submitted"
                              ? "border-indigo-100 text-indigo-600"
                              : app.status === "rejected"
                                ? "border-gray-200 text-gray-400"
                                : app.status === "offer"
                                  ? "border-emerald-200 text-emerald-600"
                                  : "border-gray-200 text-gray-700"
                          }`}
                          value={app.status}
                          onChange={(e) =>
                            handleUpdateAppStatus(
                              app.id,
                              e.target.value as Application["status"],
                            )
                          }
                        >
                          <option value="submitted">未対応</option>
                          <option value="contacted">連絡済</option>
                          <option value="interview">面接予定</option>
                          <option value="offer">採用</option>
                          <option value="rejected">不採用</option>
                        </select>
                        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                          <Mail size={14} />
                          メッセージを送る
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && (
                  <div className="py-20 text-center text-gray-400">
                    まだ応募がありません
                  </div>
                )}
              </div>
            )}

            {/* Scout Tab (New!) */}
            {activeTab === "scouts" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {talents.map((talent) => (
                  <div
                    key={talent.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition group"
                  >
                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                      <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white p-1">
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-2xl">
                          {/* Mock Avatar */}
                          👤
                        </div>
                      </div>
                    </div>
                    <div className="pt-10 px-6 pb-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">
                        {talent.display_name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {talent.personality_tags &&
                        talent.personality_tags.length > 0 ? (
                          talent.personality_tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded border border-indigo-100"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400">
                            タグ未設定
                          </span>
                        )}
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold">
                            ステータス
                          </span>
                          <span
                            className={`font-bold ${talent.job_hunting_status === "active" ? "text-rose-500" : "text-gray-600"}`}
                          >
                            {talent.job_hunting_status === "active"
                              ? "積極活動中 🔥"
                              : "検討中"}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold">
                            希望雰囲気
                          </span>
                          <span className="font-bold text-gray-700 truncate max-w-[120px]">
                            {talent.desired_atmosphere || "未設定"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleScout(talent.display_name)}
                        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-xl shadow-lg shadow-orange-200 hover:brightness-110 transition active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Mail size={16} />
                        スカウトを送る
                      </button>
                    </div>
                  </div>
                ))}
                {talents.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-400">
                    マッチする求職者が見つかりませんでした
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Job Modal */}
      {isEditModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-black text-gray-900">
                求人情報を編集
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <form
              onSubmit={handleSaveJob}
              className="p-6 md:p-8 max-h-[70vh] overflow-y-auto"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                    求人タイトル
                  </label>
                  <input
                    type="text"
                    value={editingJob.title}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      最低給与
                    </label>
                    <input
                      type="number"
                      value={editingJob.salary_min}
                      onChange={(e) =>
                        setEditingJob({
                          ...editingJob,
                          salary_min: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      最高給与
                    </label>
                    <input
                      type="number"
                      value={editingJob.salary_max}
                      onChange={(e) =>
                        setEditingJob({
                          ...editingJob,
                          salary_max: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                    仕事内容・アピール
                  </label>
                  <textarea
                    rows={6}
                    value={editingJob.description}
                    onChange={(e) =>
                      setEditingJob({
                        ...editingJob,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:border-indigo-500 outline-none leading-relaxed"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition"
                >
                  保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
