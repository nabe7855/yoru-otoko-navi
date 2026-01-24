"use client";
import HomePage from "@/pages/HomePage";
import { JobFilters } from "@/types";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearch = (filters: JobFilters) => {
    // 検索条件をクエリパラメータに変換して /jobs へ遷移、または都道府県検索へ
    if (
      filters.pref &&
      !filters.category &&
      !filters.city &&
      !filters.keyword
    ) {
      router.push(`/pref/${filters.pref}`);
    } else {
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category as string);
      if (filters.pref) params.set("pref", filters.pref as string);
      if (filters.city) params.set("city", filters.city as string);
      if (filters.region) params.set("region", filters.region as string);
      if (filters.employmentType)
        params.set("employmentType", filters.employmentType as string);
      if (filters.keyword) params.set("keyword", filters.keyword as string);
      router.push(`/jobs?${params.toString()}`);
    }
  };

  return <HomePage onSearch={handleSearch} />;
}
