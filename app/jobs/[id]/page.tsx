"use client";
import { useAuth } from "@/context/AuthContext";
import JobDetailPage from "@/pages/JobDetailPage";
import { jobService } from "@/services/jobService";
import { Job } from "@/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      const data = await jobService.getJobById(resolvedParams.id);
      setJob(data);
      setLoading(false);
    };
    fetchJob();
  }, [resolvedParams.id]);

  if (loading)
    return <div className="p-20 text-center text-gray-400">読み込み中...</div>;

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
