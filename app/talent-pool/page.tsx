"use client";
import { useAuth } from "@/context/AuthContext";
import TalentPoolPage from "@/pages/TalentPoolPage";
import { jobService } from "@/services/jobService";

export default function TalentPool() {
  const { user } = useAuth();

  if (!user || user.role !== "employer") {
    return (
      <div className="p-20 text-center text-gray-400">権限がありません。</div>
    );
  }

  const employer = jobService
    .getEmployers()
    .find((e) => e.ownerUserId === user.id);

  return employer ? <TalentPoolPage employer={employer} /> : null;
}
