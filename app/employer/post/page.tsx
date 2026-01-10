"use client";
import { useAuth } from "@/context/AuthContext";
import PostJobPage from "@/pages/PostJobPage";
import { jobService } from "@/services/jobService";
import { useRouter } from "next/navigation";

export default function PostJob() {
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
    <PostJobPage
      employerId={employer.id}
      employerName={employer.name}
      onCancel={() => router.push("/employer")}
      onSubmit={(data) => {
        jobService.createJob(data);
        alert("求人を申請しました。管理者の承認をお待ちください。");
        router.push("/employer");
      }}
    />
  ) : null;
}
