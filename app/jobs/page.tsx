"use client";
import JobListPage from "@/pages/JobListPage";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams?.get("category") || undefined;
  const pref = searchParams?.get("pref") || undefined;
  const employmentType = searchParams?.get("employmentType") || undefined;
  const city = searchParams?.get("city") || undefined;
  const keyword = searchParams?.get("keyword") || undefined;

  const filters = {
    category,
    pref,
    employmentType,
    city,
    keyword,
  };

  return (
    <JobListPage
      initialFilters={filters}
      onViewJob={(id) => router.push(`/jobs/${id}`)}
    />
  );
}

export default function Jobs() {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center text-gray-400">読み込み中...</div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
