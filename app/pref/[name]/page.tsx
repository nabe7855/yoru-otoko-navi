"use client";
import { City, LocationService, Prefecture } from "@/lib/location";
import PrefSearchPage from "@/pages/PrefSearchPage";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function PrefPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [pref, setPref] = useState<Prefecture | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const nameOrSlug = decodeURIComponent(resolvedParams.name);
      const prefectures = LocationService.getAllPrefectures();

      // Find by slug or name (handles cases like "tokyo" or "東京都" or "東京")
      const foundPref = prefectures.find(
        (p) =>
          p.id === nameOrSlug.toLowerCase() ||
          p.name === nameOrSlug ||
          p.name.replace(/[県府都]$/, "") === nameOrSlug,
      );

      if (foundPref) {
        setPref(foundPref);
        const cityData = await LocationService.getCitiesByPrefCode(
          foundPref.code,
        );
        setCities(cityData);
      }
      setLoading(false);
    };

    fetchData();
  }, [resolvedParams.name]);

  const handleSearch = (filters: any) => {
    const searchParams = new URLSearchParams();
    if (filters.category)
      searchParams.set("category", filters.category as string);
    if (filters.pref) searchParams.set("pref", filters.pref as string);
    if (filters.city) searchParams.set("city", filters.city as string);
    if (filters.keyword) searchParams.set("keyword", filters.keyword as string);
    router.push(`/jobs?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!pref) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center max-w-md">
          <h2 className="text-2xl font-black text-slate-800 mb-4">
            ページが見つかりません
          </h2>
          <p className="text-slate-500 mb-8">
            指定された地域は存在しないか、現在準備中です。
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-4 gradient-gold text-slate-900 font-black rounded-2xl shadow-lg"
          >
            トップページへ戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <PrefSearchPage
      prefName={pref.name}
      prefSlug={pref.id}
      cities={cities}
      onBack={() => router.push("/")}
      onSearch={handleSearch}
    />
  );
}
