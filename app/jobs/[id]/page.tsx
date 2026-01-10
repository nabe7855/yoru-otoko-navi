"use client";
import { useAuth } from "@/context/AuthContext";
import JobDetailPage from "@/pages/JobDetailPage";
import { jobService } from "@/services/jobService";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
    <JobDetailPage
      job={job}
      onApply={() => {
        if (!user) router.push("/login");
        else router.push(`/apply/${job.id}`);
      }}
      onBack={() => router.push("/jobs")}
      onViewJob={(id) => {
        router.push(`/jobs/${id}`);
      }}
    />
  );
}
