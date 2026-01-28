"use client";

import { ListFilter, MapPin, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import JapanMap from "../components/JapanMap";
import JobCard from "../components/JobCard";
import SearchSection from "../components/SearchSection";
import {
  CATEGORIES,
  JOB_TYPES_FOR_OVERLAY,
  PREFECTURES,
  SALARY_OPTIONS_FOR_OVERLAY,
  TAGS,
  WORK_STYLE_OPTIONS_FOR_OVERLAY,
} from "../constants";
import { jobService } from "../services/jobService";
import { Job, JobFilters } from "../types";

interface ActiveFilters {
  categories: string[];
  prefs: string[];
  cities: string[];
  tags: string[];
  salaries: string[];
  styles: string[];
  regions: string[];
}

interface JobListPageProps {
  initialFilters: JobFilters;
  onViewJob: (id: string) => void;
}

const JobListPage: React.FC<JobListPageProps> = ({
  initialFilters,
  onViewJob,
}) => {
  const router = useRouter();
  const safeFilters = initialFilters || {};
  const [filters, setFilters] = useState<JobFilters>(safeFilters);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  // Search UI states
  const [isSearchAccordionOpen, setIsSearchAccordionOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isWorkStyleOpen, setIsWorkStyleOpen] = useState(false);

  // Initialize activeFilters from initialFilters
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(() => {
    return {
      categories: Array.isArray(safeFilters.category)
        ? safeFilters.category
        : safeFilters.category
          ? [safeFilters.category]
          : [],
      prefs: Array.isArray(safeFilters.pref)
        ? safeFilters.pref
        : safeFilters.pref
          ? [safeFilters.pref]
          : [],
      cities: Array.isArray(safeFilters.city)
        ? safeFilters.city
        : safeFilters.city
          ? [safeFilters.city]
          : [],
      regions: Array.isArray(safeFilters.region)
        ? safeFilters.region
        : safeFilters.region
          ? [safeFilters.region]
          : [],
      tags: Array.isArray(safeFilters.tags) ? safeFilters.tags : [],
      salaries: Array.isArray(safeFilters.salary)
        ? safeFilters.salary
        : safeFilters.salary
          ? [safeFilters.salary]
          : [],
      styles: Array.isArray(safeFilters.style)
        ? safeFilters.style
        : safeFilters.style
          ? [safeFilters.style]
          : [],
    };
  });

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

  const toggleFilter = (type: keyof ActiveFilters, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[type];
      const isSelected = current.includes(value);
      if (isSelected) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (activeFilters.categories.length > 0) {
      activeFilters.categories.forEach((c) => params.append("category", c));
    }
    if (activeFilters.prefs.length > 0) {
      activeFilters.prefs.forEach((p) => params.append("pref", p));
    }
    if (activeFilters.cities.length > 0) {
      activeFilters.cities.forEach((c) => params.append("city", c));
    }
    if (activeFilters.regions.length > 0) {
      activeFilters.regions.forEach((r) => params.append("region", r));
    }
    if (activeFilters.tags.length > 0) {
      activeFilters.tags.forEach((t) => params.append("tags", t));
    }
    if (activeFilters.salaries.length > 0) {
      activeFilters.salaries.forEach((s) => params.append("salary", s));
    }
    if (activeFilters.styles.length > 0) {
      activeFilters.styles.forEach((s) => params.append("style", s));
    }
    if (keyword) {
      params.set("keyword", keyword);
    }

    router.push(`/jobs?${params.toString()}`);
  };

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
      <div className="mb-8">
        <SearchSection
          keyword={keyword}
          onKeywordChange={setKeyword}
          activeFilters={activeFilters}
          onFilterToggle={toggleFilter}
          onSearch={handleSearch}
          onMapOpen={() => setIsMapOpen(true)}
          onJobTypeOpen={() => setIsJobTypeOpen(true)}
          onSalaryOpen={() => setIsSalaryOpen(true)}
          onWorkStyleOpen={() => setIsWorkStyleOpen(true)}
          isAccordionOpen={isSearchAccordionOpen}
          onAccordionToggle={() =>
            setIsSearchAccordionOpen(!isSearchAccordionOpen)
          }
        />
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
                <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                  <ListFilter size={16} className="text-indigo-600" />
                  職種で絞る
                </h4>
                <div className="space-y-3">
                  {CATEGORIES.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={
                            Array.isArray(filters.category) &&
                            filters.category.includes(category)
                          }
                          onChange={() =>
                            toggleArrayFilter("category", category)
                          }
                        />
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all"></div>
                        <svg
                          className="absolute w-3 h-3 text-white top-1 left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                  <ListFilter size={16} className="text-indigo-600" />
                  特徴で絞る
                </h4>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleArrayFilter("tags", tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        Array.isArray(filters.tags) &&
                        filters.tags.includes(tag)
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                          : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-black text-slate-900">
                  {keyword ? `"${keyword}" の検索結果` : "検索結果"}
                </h2>
                <span className="text-sm font-bold text-slate-500">
                  {filteredJobs.length}件
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {Object.keys(filters).map((key) => {
                  const value = filters[key as keyof JobFilters];
                  if (!value || (Array.isArray(value) && value.length === 0))
                    return null;
                  if (key === "salary_min") return null;

                  if (Array.isArray(value)) {
                    return value.map((v) => (
                      <span
                        key={`${key}-${v}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold"
                      >
                        {v}
                        <X
                          size={12}
                          className="cursor-pointer hover:text-indigo-900"
                          onClick={() => removeFilter(key as any, v)}
                        />
                      </span>
                    ));
                  }

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold"
                    >
                      {value}
                      <X
                        size={12}
                        className="cursor-pointer hover:text-indigo-900"
                        onClick={() => removeFilter(key as any)}
                      />
                    </span>
                  );
                })}
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
                  <Search size={40} />
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
                    router.push(`/jobs`);
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

      {/* Modals */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl overflow-hidden">
            <JapanMap
              onRegionSelect={(region) => {
                // Determine current params to keep other filters if needed,
                // or just search by region as implied by "Search by Region"
                // Usually "Search by Region" implies clearing other area filters but keeping refined filters?
                // For simplicity and "Search by Region" semantics, let's toggle the region and search.

                // Construct params for immediate search
                const params = new URLSearchParams();

                // Keep existing non-area filters (categories, tags, etc.)
                activeFilters.categories.forEach((c) =>
                  params.append("category", c),
                );
                activeFilters.tags.forEach((t) => params.append("tags", t));
                activeFilters.salaries.forEach((s) =>
                  params.append("salary", s),
                );
                activeFilters.styles.forEach((s) => params.append("style", s));
                if (keyword) params.set("keyword", keyword);

                // Set the selected region
                params.append("region", region);

                router.push(`/jobs?${params.toString()}`);
                setIsMapOpen(false);
              }}
              onPrefectureSelect={(pref) => {
                const params = new URLSearchParams();

                // Keep existing non-area filters
                activeFilters.categories.forEach((c) =>
                  params.append("category", c),
                );
                activeFilters.tags.forEach((t) => params.append("tags", t));
                activeFilters.salaries.forEach((s) =>
                  params.append("salary", s),
                );
                activeFilters.styles.forEach((s) => params.append("style", s));
                if (keyword) params.set("keyword", keyword);

                // Set the selected prefecture
                params.append("pref", pref);

                router.push(`/jobs?${params.toString()}`);
                setIsMapOpen(false);
              }}
              onMunicipalitiesSelect={(pref, munis) => {
                const params = new URLSearchParams();
                activeFilters.categories.forEach((c) =>
                  params.append("category", c),
                );
                activeFilters.tags.forEach((t) => params.append("tags", t));
                activeFilters.salaries.forEach((s) =>
                  params.append("salary", s),
                );
                activeFilters.styles.forEach((s) => params.append("style", s));
                if (keyword) params.set("keyword", keyword);

                params.append("pref", pref);
                munis.forEach((m) => params.append("city", m));

                router.push(`/jobs?${params.toString()}`);
                setIsMapOpen(false);
              }}
            />
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {isJobTypeOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white">職種で探す</h3>
              <button
                onClick={() => setIsJobTypeOpen(false)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {JOB_TYPES_FOR_OVERLAY.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    toggleFilter("categories", type.id);
                    setIsJobTypeOpen(false);
                  }}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-left"
                >
                  <span className="text-sm font-bold text-white">
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isSalaryOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white">給与で探す</h3>
              <button
                onClick={() => setIsSalaryOpen(false)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SALARY_OPTIONS_FOR_OVERLAY.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    toggleFilter("salaries", option.id);
                    setIsSalaryOpen(false);
                  }}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-left"
                >
                  <span className="text-sm font-bold text-white">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isWorkStyleOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-white">働き方で探す</h3>
              <button
                onClick={() => setIsWorkStyleOpen(false)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {WORK_STYLE_OPTIONS_FOR_OVERLAY.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    toggleFilter("styles", option.id);
                    setIsWorkStyleOpen(false);
                  }}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition text-left"
                >
                  <span className="text-sm font-bold text-white">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
