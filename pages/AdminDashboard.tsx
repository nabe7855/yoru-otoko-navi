import React, { useEffect, useState } from "react";
import { jobService } from "../services/jobService";
import { Employer, Job } from "../types";

const AdminDashboard: React.FC = () => {
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [pendingEmployers, setPendingEmployers] = useState<Employer[]>([]);

  useEffect(() => {
    setPendingJobs(jobService.getJobs().filter((j) => j.status === "pending"));
    setPendingEmployers(
      jobService.getEmployers().filter((e) => e.status === "pending")
    );
  }, []);

  const handleApproveJob = (jobId: string) => {
    jobService.updateJobStatus(jobId, "published");
    setPendingJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const handleApproveEmployer = (id: string) => {
    jobService.updateEmployerStatus(id, "approved");
    setPendingEmployers((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">
          管理者ダッシュボード
        </h1>
        <p className="text-gray-500">審査待ちのコンテンツを管理します</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-2 text-sm">
              {pendingEmployers.length}
            </span>
            店舗の審査
          </h2>
          <div className="space-y-4">
            {pendingEmployers.map((emp) => (
              <div
                key={emp.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{emp.name}</h3>
                  <p className="text-xs text-gray-400">
                    {emp.areaPref} {emp.areaCity} | {emp.businessType}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproveEmployer(emp.id)}
                    className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700"
                  >
                    承認
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200">
                    詳細
                  </button>
                </div>
              </div>
            ))}
            {pendingEmployers.length === 0 && (
              <p className="text-gray-400 py-10 text-center">
                審査待ちの店舗はありません
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-2 text-sm">
              {pendingJobs.length}
            </span>
            求人の審査
          </h2>
          <div className="space-y-4">
            {pendingJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="mb-4">
                  <h3 className="font-bold line-clamp-1">{job.title}</h3>
                  <p className="text-xs text-indigo-600 font-medium">
                    店舗: {job.employerName}
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleApproveJob(job.id)}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700"
                  >
                    承認して公開
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100">
                    却下
                  </button>
                </div>
              </div>
            ))}
            {pendingJobs.length === 0 && (
              <p className="text-gray-400 py-10 text-center">
                審査待ちの求人はありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
