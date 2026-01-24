"use client";

import { ListFilter, MapPin, Search as SearchIcon, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import JobCard from "../components/JobCard";
import { CATEGORIES, PREFECTURES, TAGS } from "../constants";
import { jobService } from "../services/jobService";
import { Job, JobFilters } from "../types";

interface JobListPageProps {
  initialFilters: JobFilters;
  onViewJob: (id: string) => void;
}

const JobListPage: React.FC<JobListPageProps> = ({
  initialFilters,
  onViewJob,
}) => {
  const [filters, setFilters] = useState<JobFilters>(initialFilters || {});
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await jobService.searchJobs(filters);
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, [filters]);

  const filteredJobs = useMemo(() => {
    if (!keyword) return jobs;
    return jobs.filter(
      (job) =>
        job.employer_name.toLowerCase().includes(keyword.toLowerCase()) ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.area_city.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [jobs, keyword]);

  const toggleArrayFilter = (key: string, value: string) => {
    const current = (filters[key] as string[]) || [];
    if (current.includes(value)) {
      setFilters({
        ...filters,
        [key]: current.filter((v) => v !== value),
      });
    } else {
      setFilters({ ...filters, [key]: [...current, value] });
    }
  };

  const removeFilter = (key: string, value?: string) => {
    const newFilters = { ...filters };
    if (value && Array.isArray(newFilters[key])) {
      newFilters[key] = (newFilters[key] as string[]).filter(
        (v) => v !== value,
      );
      if ((newFilters[key] as string[]).length === 0) delete newFilters[key];
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-black text-slate-900">
          求人一覧
          {filters.pref && (
            <span className="ml-2 text-indigo-600">in {filters.pref}</span>
          )}
        </h1>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="店名やキーワードで検索"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-black shadow-sm"
          >
            <ListFilter size={18} />
            絞り込み
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters Desktop */}
        <aside
          className={`${isFilterOpen ? "fixed inset-0 z-[60] bg-black/50 overflow-y-auto p-4" : "hidden"} lg:block lg:relative lg:inset-auto lg:col-span-3 lg:bg-transparent lg:p-0 lg:z-auto`}
        >
          <div
            className="bg-white rounded-[2rem] border border-slate-200 p-6 md:p-8 sticky top-24 shadow-xl lg:shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-800 text-lg">
                絞り込み条件
              </h3>
              <button
                onClick={() => {
                  setFilters({});
                  setKeyword("");
                  setIsFilterOpen(false);
                }}
                className="text-[10px] font-black text-slate-400 hover:text-red-500 transition tracking-widest uppercase"
              >
                RESET
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-600" />
                  エリアで絞る
                </h4>
                <select
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                  value={(filters.pref as string) || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, pref: e.target.value })
                  }
                >
                  <option value="">全てのエリア</option>
                  {PREFECTURES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4">
                  業態から選ぶ
                </h4>
                <div className="space-y-3">
                  {CATEGORIES.slice(0, 8).map((c) => {
                    const isSelected = Array.isArray(filters.category)
                      ? filters.category.includes(c)
                      : filters.category === c;
                    return (
                      <label
                        key={c}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleArrayFilter("category", c)}
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition"
                        />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition">
                          {c}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4">
                  こだわり条件
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {TAGS.slice(0, 8).map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.tags?.includes(tag) || false}
                        onChange={() => toggleArrayFilter("tags", tag)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition"
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition">
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {isFilterOpen && (
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full mt-8 py-4 gradient-gold text-slate-900 font-black rounded-xl shadow-lg"
              >
                条件を適用する
              </button>
            )}
          </div>
        </aside>

        {/* Main List Area */}
        <main className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p className="text-sm font-bold text-slate-500">
                ヒット件数:{" "}
                <span className="font-black text-slate-900 text-lg">
                  {filteredJobs.length}
                </span>{" "}
                件
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {(Object.keys(filters) as Array<keyof JobFilters>).map(
                  (key) => {
                    if (key === "keyword") return null;
                    const val = filters[key];
                    if (!val) return null;

                    const colorClass =
                      key === "category"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-indigo-50 text-indigo-600 border-indigo-100";

                    if (Array.isArray(val)) {
                      return val.map((v) => (
                        <span
                          key={`${key}-${v}`}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 ${colorClass} text-[10px] font-black rounded-lg border uppercase tracking-tighter`}
                        >
                          {v}{" "}
                          <X
                            size={10}
                            className="cursor-pointer hover:text-red-500"
                            onClick={() => removeFilter(key as any, v)}
                          />
                        </span>
                      ));
                    }

                    return (
                      <span
                        key={key}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 ${colorClass} text-[10px] font-black rounded-lg border uppercase tracking-tighter`}
                      >
                        {val as string}{" "}
                        <X
                          size={10}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => removeFilter(key as any)}
                        />
                      </span>
                    );
                  },
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 justify-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                SORT:
              </span>
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition">
                <option>新着順</option>
                <option>給与の高い順</option>
                <option>おすすめ順</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-8">
            {loading ? (
              <div className="py-20 text-center text-slate-400 font-bold">
                読み込み中...
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onClick={onViewJob} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                  <SearchIcon size={40} />
                </div>
                <div>
                  <p className="text-slate-500 font-black text-lg">
                    条件に合う求人が見つかりませんでした
                  </p>
                  <p className="text-slate-400 text-sm font-medium mt-1">
                    条件を広げて探してみてください
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFilters({});
                    setKeyword("");
                  }}
                  className="text-indigo-600 font-black hover:underline px-6 py-2 bg-indigo-50 rounded-full transition"
                >
                  すべての求人を表示する
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobListPage;
