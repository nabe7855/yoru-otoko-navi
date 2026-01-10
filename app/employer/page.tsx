"use client";
import { useAuth } from "@/context/AuthContext";
import EmployerDashboard from "@/pages/EmployerDashboard";
import { jobService } from "@/services/jobService";
import { useRouter } from "next/navigation";

export default function Employer() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.role !== "employer") {
    return (
      <div className="p-20 text-center text-gray-400">権限がありません。</div>
    );
  }

  const employer = jobService
    .getEmployers()
    .find((e) => e.ownerUserId === user.id);

  return employer ? (
    <EmployerDashboard
      employer={employer}
      onPostJob={() => router.push("/employer/post")}
    />
  ) : (
    <div className="p-20 text-center">店舗情報の登録が必要です。</div>
  );
}
