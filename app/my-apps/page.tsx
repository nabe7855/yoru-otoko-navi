"use client";
import { useAuth } from "@/context/AuthContext";
import { jobService } from "@/services/jobService";
import { Application } from "@/types";
import { useEffect, useState } from "react";

export default function MyApps() {
  const { user } = useAuth();
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    if (user) {
      const allApps = jobService.getApplications();
      setApps(allApps.filter((a) => a.seekerUserId === user.id));
    }
  }, [user]);

  if (!user)
    return (
      <div className="p-20 text-center text-gray-400">ログインが必要です。</div>
    );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-black mb-10">応募履歴</h1>
      <div className="space-y-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-indigo-600">
                  {app.jobTitle}
                </h3>
                <p className="text-gray-400 text-xs">
                  応募日: {app.createdAt.split("T")[0]}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  app.status === "offer"
                    ? "bg-green-100 text-green-600"
                    : app.status === "rejected"
                    ? "bg-red-50 text-red-400"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                {app.status === "submitted"
                  ? "応募済み"
                  : app.status === "contacted"
                  ? "連絡待ち"
                  : app.status === "interview"
                  ? "面接予定"
                  : app.status === "offer"
                  ? "採用内定"
                  : "不採用"}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
              <p className="font-bold mb-1">あなたのメッセージ:</p>
              <p>{app.message}</p>
            </div>
          </div>
        ))}
        {apps.length === 0 && (
          <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
            まだ応募した求人はありません。
          </div>
        )}
      </div>
    </div>
  );
}
