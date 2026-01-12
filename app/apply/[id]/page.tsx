"use client";
import { useAuth } from "@/context/AuthContext";
import ApplyPage from "@/pages/ApplyPage";
import { jobService } from "@/services/jobService";
import { Job } from "@/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Apply({ params }: { params: Promise<{ id: string }> }) {
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
    <ApplyPage
      job={job}
      onCancel={() => router.push(`/jobs/${job.id}`)}
      onSubmit={async (data) => {
        await jobService.submitApplication({
          ...data,
          job_id: job.id,
          job_title: job.title,
          seeker_user_id: user?.id,
          seeker_name: data.name,
        });
        alert("応募が完了しました！店舗からの連絡をお待ちください。");
        router.push("/");
      }}
    />
  );
}
