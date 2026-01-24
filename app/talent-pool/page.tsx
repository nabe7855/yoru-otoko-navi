"use client";
import { useAuth } from "@/context/AuthContext";
import TalentPoolPage from "@/pages/TalentPoolPage";
import { jobService } from "@/services/jobService";
import type { Employer } from "@/types";
import { useEffect, useState } from "react";

export default function TalentPool() {
  const { user } = useAuth();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployer = async () => {
      if (!user || user.role !== "employer") {
        setLoading(false);
        return;
      }
      setLoading(true);
      const employers = await jobService.getEmployers();
      const emp = employers.find((e) => e.owner_user_id === user.id);
      setEmployer(emp || null);
      setLoading(false);
    };
    fetchEmployer();
  }, [user]);

  if (!user || user.role !== "employer") {
    return (
      <div className="p-20 text-center text-gray-400">権限がありません。</div>
    );
  }

  if (loading)
    return <div className="p-20 text-center text-gray-400">読み込み中...</div>;

  return employer ? (
    <TalentPoolPage employer={employer} />
  ) : (
    <div className="p-20 text-center">店舗情報の登録が必要です。</div>
  );
}
