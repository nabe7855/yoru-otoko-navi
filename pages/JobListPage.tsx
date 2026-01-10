import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { CATEGORIES, PREFECTURES, TAGS } from "../constants";
import { jobService } from "../services/jobService";
import { Job } from "../types";

interface JobListPageProps {
  initialFilters: any;
  onViewJob: (id: string) => void;
}

const JobListPage: React.FC<JobListPageProps> = ({
  initialFilters,
  onViewJob,
}) => {
  if (!initialFilters) return null;
  const [filters, setFilters] = useState(initialFilters);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(jobService.searchJobs(filters));
  }, [filters]);

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    if (currentTags.includes(tag)) {
      setFilters({
        ...filters,
        tags: currentTags.filter((t: string) => t !== tag),
      });
    } else {
      setFilters({ ...filters, tags: [...currentTags, tag] });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-72 shrink-0 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <i className="fas fa-filter mr-2 text-indigo-500"></i>
            条件を絞り込む
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                業態
              </label>
              <select
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                value={filters.category || ""}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">全ての業態</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                エリア
              </label>
              <select
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                value={filters.pref || ""}
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
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                最低時給
              </label>
              <input
                type="number"
                placeholder="金額を入力"
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                value={filters.salaryMin || ""}
                onChange={(e) =>
                  setFilters({ ...filters, salaryMin: Number(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                こだわり条件
              </label>
              <div className="space-y-2 mt-2">
                {TAGS.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      checked={filters.tags?.includes(tag) || false}
                      onChange={() => toggleTag(tag)}
                    />
                    <span className="text-sm text-gray-600 group-hover:text-indigo-600">
                      {tag}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setFilters({})}
            className="w-full mt-6 py-2 text-sm text-gray-500 hover:text-indigo-600 font-medium border border-gray-200 rounded-lg transition"
          >
            フィルターをリセット
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-grow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {jobs.length}{" "}
            <span className="text-gray-400 font-normal text-lg">
              件の求人が見つかりました
            </span>
          </h2>
          <select className="bg-transparent text-sm font-medium text-gray-500 focus:outline-none cursor-pointer">
            <option>新着順</option>
            <option>給与が高い順</option>
          </select>
        </div>

        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={onViewJob} />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 py-20 flex flex-col items-center justify-center">
              <i className="fas fa-search text-gray-200 text-6xl mb-4"></i>
              <p className="text-gray-400 font-medium">
                条件に合う求人は見つかりませんでした
              </p>
              <button
                onClick={() => setFilters({})}
                className="text-indigo-600 mt-2 hover:underline"
              >
                全ての求人を表示
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListPage;
