import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { jobService } from "../services/jobService";
import { Job } from "../types";

interface JobDetailPageProps {
  job: Job;
  onApply: (jobId: string) => void;
  onBack: () => void;
  onViewJob: (jobId: string) => void;
}

const DetailRow: React.FC<{ label: string; content?: string }> = ({
  label,
  content,
}) => {
  if (!content) return null;
  return (
    <div className="flex flex-col md:flex-row border-b border-gray-100 last:border-0">
      <div className="w-full md:w-56 bg-slate-50 p-4 md:p-6 shrink-0 flex items-center">
        <span className="text-sm font-bold text-gray-700">{label}</span>
      </div>
      <div className="flex-grow p-4 md:p-6 bg-white">
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};

const JobDetailPage: React.FC<JobDetailPageProps> = ({
  job,
  onApply,
  onBack,
  onViewJob,
}) => {
  if (!job) return null;
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      const allJobs = await jobService.getJobs();
      const filtered = allJobs.filter((j) => j.id !== job.id);
      const related = filtered
        .filter(
          (j) => j.category === job.category || j.areaPref === job.areaPref
        )
        .slice(0, 3);
      setRelatedJobs(related);
    };
    fetchRelatedJobs();
  }, [job]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={onBack}
        className="mb-8 flex items-center text-gray-500 hover:text-blue-600 transition font-medium text-sm"
      >
        <i className="fas fa-chevron-left mr-2"></i> 検索結果一覧へ戻る
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Main Hero Header */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-md tracking-wider">
                {job.category}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-md tracking-wider">
                {job.employmentType}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="flex-1 flex items-center p-5 bg-blue-50/40 rounded-2xl border border-blue-100/50">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-yen-sign text-blue-600"></i>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5 tracking-widest">
                    給与目安
                  </span>
                  <span className="text-xl font-black text-blue-600">
                    {job.salaryMin.toLocaleString()}円〜
                  </span>
                </div>
              </div>
              <div className="flex-1 flex items-center p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-slate-200/50 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <i className="fas fa-map-marker-alt text-slate-500"></i>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5 tracking-widest">
                    勤務地
                  </span>
                  <span className="text-sm font-bold text-gray-700">
                    {job.areaPref} {job.areaCity}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mb-10 group">
              {job.images.length > 0 ? (
                <img
                  src={job.images[0]}
                  className="w-full h-[400px] object-cover rounded-3xl shadow-sm"
                  alt="Job visual"
                />
              ) : (
                <div className="w-full h-[400px] bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                  <i className="fas fa-image text-6xl"></i>
                </div>
              )}
            </div>

            <div className="prose prose-blue max-w-none">
              <h3 className="text-xl font-black text-gray-800 flex items-center mb-4">
                <span className="w-1 h-6 bg-blue-600 mr-3 rounded-full"></span>
                仕事内容・メッセージ
              </h3>
              <p className="text-gray-600 leading-loose whitespace-pre-wrap text-lg font-medium">
                {job.description}
              </p>
            </div>
          </div>

          {/* Structured Details Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-8 bg-slate-900">
              <h2 className="text-xl font-bold text-white flex items-center">
                <i className="fas fa-file-alt text-blue-400 mr-3"></i> 募集要項
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              <DetailRow label="経験・資格" content={job.qualifications} />
              <DetailRow label="勤務地・交通" content={job.accessInfo} />
              <DetailRow label="給与・報酬" content={job.salaryDetails} />
              <DetailRow label="待遇・福利厚生" content={job.benefits} />
              <DetailRow label="加入保険" content={job.insurance} />
              <DetailRow label="雇用形態" content={job.employmentType} />
              <DetailRow label="勤務時間" content={job.workingHours} />
              <DetailRow label="休日・休暇" content={job.holidays} />
              <DetailRow label="PR・職場情報" content={job.workplaceInfo} />
            </div>
          </div>

          {/* Related Jobs Section */}
          {relatedJobs.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center mb-8">
                <div className="w-2 h-8 bg-blue-600 mr-4 rounded-full"></div>
                <h2 className="text-2xl font-black text-gray-800">
                  こちらの求人もおすすめです
                </h2>
              </div>
              <div className="grid gap-4">
                {relatedJobs.map((rJob) => (
                  <JobCard key={rJob.id} job={rJob} onClick={onViewJob} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Floating Sidebar Action */}
        <div className="relative">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl shadow-blue-900/10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">
                  <i className="fas fa-building"></i>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    掲載主
                  </span>
                  <h4 className="font-bold text-gray-800 line-clamp-1">
                    {job.employerName}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => onApply(job.id)}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white text-xl font-black rounded-2xl transition transform active:scale-95 shadow-xl shadow-blue-200 mb-6 flex items-center justify-center group"
              >
                <span>応募画面へ進む</span>
                <i className="fas fa-chevron-right ml-3 group-hover:translate-x-1 transition"></i>
              </button>

              <div className="space-y-5 pt-6 border-t border-gray-50">
                <div className="flex items-start space-x-3 text-sm text-gray-500">
                  <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                  <p>求人への応募には無料の会員登録・ログインが必要です。</p>
                </div>
                <div className="flex items-center space-x-3 text-sm font-bold text-gray-700">
                  <i className="fas fa-shield-alt text-green-500"></i>
                  <span>24時間365日のAI審査済み</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
              <h5 className="font-black mb-4">お問い合わせ</h5>
              <p className="text-slate-400 text-xs mb-6">
                この求人についてご不明な点がある場合は、応募後のチャット機能にて直接店舗へお問い合わせいただけます。
              </p>
              <div className="flex items-center space-x-2 text-blue-400 font-bold">
                <i className="far fa-envelope"></i>
                <span className="text-sm">WEBからは24時間受付中</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
