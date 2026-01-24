"use client";
import JobListPage from "@/pages/JobListPage";
import { JobFilters } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categories = searchParams?.getAll("category");
  const prefs = searchParams?.getAll("pref");
  const cities = searchParams?.getAll("city");
  const tags = searchParams?.getAll("tags");
  const salaries = searchParams?.getAll("salary");
  const styles = searchParams?.getAll("style");
  const keyword = searchParams?.get("keyword") || undefined;

  const filters: JobFilters = {
    category: categories?.length ? categories : undefined,
    pref: prefs?.length ? prefs : undefined,
    city: cities?.length ? cities : undefined,
    tags: tags?.length ? tags : undefined,
    salary: salaries?.length ? salaries : undefined,
    style: styles?.length ? styles : undefined,
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
