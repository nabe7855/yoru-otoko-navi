import React from "react";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
  onClick: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col md:flex-row"
      onClick={() => onClick(job.id)}
    >
      <div className="w-full md:w-64 h-48 md:h-auto shrink-0 relative">
        <img
          src={
            job.images[0] || "https://picsum.photos/seed/placeholder/400/300"
          }
          alt={job.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded">
          {job.category}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
              {job.title}
            </h3>
          </div>
          <div className="flex items-center text-indigo-600 font-bold text-lg mb-2">
            <span className="text-sm mr-1">
              {job.salary_type === "hourly"
                ? "時給"
                : job.salary_type === "daily"
                ? "日給"
                : "月給"}
            </span>
            {job.salary_min.toLocaleString()}円 〜{" "}
            {job.salary_max.toLocaleString()}円
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
            {job.area_pref} {job.area_city}
            <span className="mx-2 text-gray-300">|</span>
            <i className="fas fa-store mr-2 text-gray-400"></i>
            {job.employer_name}
          </div>
          <div className="flex flex-wrap gap-1">
            {job.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span>更新日: {job.updated_at.split("T")[0]}</span>
          <span className="text-indigo-600 font-medium">
            詳細を見る <i className="fas fa-chevron-right ml-1"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
