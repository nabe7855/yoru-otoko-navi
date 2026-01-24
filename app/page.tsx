"use client";
import HomePage from "@/pages/HomePage";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearch = (filters: any) => {
    const params = new URLSearchParams();

    const appendParam = (key: string, value: any) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value as string);
      }
    };

    // HomePage から渡される ActiveFilters のキーとクエリパラメータの対応
    if (filters.categories) appendParam("category", filters.categories);
    if (filters.prefs) appendParam("pref", filters.prefs);
    if (filters.cities) appendParam("city", filters.cities);
    if (filters.regions) appendParam("region", filters.regions);
    if (filters.tags) appendParam("tags", filters.tags);
    if (filters.salaries) appendParam("salary", filters.salaries);
    if (filters.styles) appendParam("style", filters.styles);
    if (filters.keyword) appendParam("keyword", filters.keyword);

    // 互換性：直接 JobFilters が渡された場合
    if (filters.category && !filters.categories)
      appendParam("category", filters.category);
    if (filters.pref && !filters.prefs) appendParam("pref", filters.pref);

    router.push(`/jobs?${params.toString()}`);
  };

  return <HomePage onSearch={handleSearch} />;
}
