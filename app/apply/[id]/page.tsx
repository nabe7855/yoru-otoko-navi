"use client";
import { useAuth } from "@/context/AuthContext";
import ApplyPage from "@/pages/ApplyPage";
import { jobService } from "@/services/jobService";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Apply({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const job = jobService.getJobById(resolvedParams.id);

  if (!job)
    return (
      <div className="p-20 text-center text-gray-400">
        求人が見つかりませんでした。
      </div>
    );

  return (
    <ApplyPage
      job={job}
      onCancel={() => router.push(`/jobs/${job.id}`)}
      onSubmit={(data) => {
        jobService.submitApplication({
          ...data,
          jobId: job.id,
          jobTitle: job.title,
          seekerUserId: user?.id,
        });
        alert("応募が完了しました！店舗からの連絡をお待ちください。");
        router.push("/");
      }}
    />
  );
}
