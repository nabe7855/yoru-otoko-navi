"use client";
import PrefSearchPage from "@/pages/PrefSearchPage";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function PrefPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const handleSearch = (filters: any) => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.pref) params.set("pref", filters.pref);
    if (filters.city) params.set("city", filters.city);
    if (filters.keyword) params.set("keyword", filters.keyword);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <PrefSearchPage
      prefName={decodeURIComponent(resolvedParams.name)}
      onBack={() => router.push("/")}
      onSearch={handleSearch}
    />
  );
}
