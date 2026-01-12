import React, { useEffect, useState } from "react";
import { jobService } from "../services/jobService";
import { Application, Employer, Job } from "../types";

interface EmployerDashboardProps {
  employer: Employer;
  onPostJob: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  employer,
  onPostJob,
}) => {
  if (!employer) return null;
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allJobs = await jobService.getJobs();
      const myJobs = allJobs.filter((j) => j.employer_id === employer.id);
      setJobs(myJobs);

      const allApps = await jobService.getApplications();
      const myJobIds = myJobs.map((j) => j.id);
      setApplications(allApps.filter((a) => myJobIds.includes(a.job_id)));
      setLoading(false);
    };
    fetchData();
  }, [employer.id]);

  const handleUpdateAppStatus = async (
    appId: string,
    status: Application["status"]
  ) => {
    await jobService.updateApplicationStatus(appId, status);
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status } : a))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{employer.name}</h1>
          <p className="text-gray-500">店舗ダッシュボード</p>
        </div>
        <button
          onClick={onPostJob}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>新規求人を投稿</span>
        </button>
      </div>

      {loading ? (
        <div className="p-20 text-center text-gray-400">読み込み中...</div>
      ) : (
        <>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                activeTab === "jobs"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              求人管理 ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                activeTab === "applications"
                  ? "bg-white shadow-sm text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              応募管理 ({applications.length})
            </button>
          </div>

          {activeTab === "jobs" ? (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">求人タイトル</th>
                    <th className="px-6 py-4">ステータス</th>
                    <th className="px-6 py-4">給与</th>
                    <th className="px-6 py-4">更新日</th>
                    <th className="px-6 py-4">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="text-sm">
                      <td className="px-6 py-4 font-bold text-gray-800">
                        {job.title}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            job.status === "published"
                              ? "bg-green-50 text-green-600"
                              : job.status === "pending"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {job.status === "published"
                            ? "公開中"
                            : job.status === "pending"
                            ? "審査中"
                            : "下書き"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {job.salary_min.toLocaleString()}円〜
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {job.updated_at.split("T")[0]}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-indigo-600 hover:underline">
                          編集
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {jobs.length === 0 && (
                <div className="py-20 text-center text-gray-400">
                  まだ求人がありません
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-lg">{app.seeker_name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase">
                          {app.contact_type}
                        </span>
                      </div>
                      <p className="text-sm text-indigo-600 font-medium mb-2">
                        対象求人: {app.job_title}
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {app.message || "メッセージなし"}
                      </p>
                      <div className="mt-3 flex items-center space-x-4 text-xs text-gray-400">
                        <span>連絡先: {app.contact_value}</span>
                        <span>応募日: {app.created_at.split("T")[0]}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <select
                        className="bg-gray-50 border border-gray-200 rounded-lg text-sm p-2 font-medium"
                        value={app.status}
                        onChange={(e) =>
                          handleUpdateAppStatus(app.id, e.target.value as any)
                        }
                      >
                        <option value="submitted">未対応</option>
                        <option value="contacted">連絡済</option>
                        <option value="interview">面接予定</option>
                        <option value="offer">採用</option>
                        <option value="rejected">不採用</option>
                      </select>
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
        </>
      )}
    </div>
  );
};

export default EmployerDashboard;
