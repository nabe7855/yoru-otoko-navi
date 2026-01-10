"use client";
import HomePage from "@/pages/HomePage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearch = (filters: any) => {
    // 検索条件をクエリパラメータに変換して /jobs へ遷移、または都道府県検索へ
    if (filters.pref && !filters.category) {
      router.push(`/pref/${filters.pref}`);
    } else {
      const params = new URLSearchParams();
      if (filters.category) params.set("category", filters.category);
      if (filters.pref) params.set("pref", filters.pref);
      if (filters.employmentType)
        params.set("employmentType", filters.employmentType);
      router.push(`/jobs?${params.toString()}`);
    }
  };

  return <HomePage onSearch={handleSearch} />;
}
