"use client";

import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star as StarIcon,
} from "lucide-react";
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

const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  content?: string;
}> = ({ icon, label, content }) => {
  if (!content) return null;
  return (
    <div className="flex flex-col md:flex-row border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
      <div className="w-full md:w-64 bg-slate-50/50 p-6 md:p-8 shrink-0 flex items-center gap-4">
        <div className="text-indigo-500 bg-white p-2 rounded-lg shadow-sm">
          {icon}
        </div>
        <span className="text-xs md:text-sm font-black text-slate-600 uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="flex-grow p-6 md:p-8 bg-white">
        <p className="text-sm md:text-base text-slate-700 leading-loose whitespace-pre-wrap font-medium">
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
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (!job) return;
    const fetchRelatedJobs = async () => {
      const allJobs = await jobService.getJobs();
      const filtered = allJobs.filter((j) => j.id !== job.id);
      const related = filtered
        .filter(
          (j) => j.category === job.category || j.area_pref === job.area_pref,
        )
        .slice(0, 3);
      setRelatedJobs(related);
    };
    fetchRelatedJobs();
    window.scrollTo(0, 0);
  }, [job]);

  if (!job) return null;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-black text-xs md:text-sm bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 active:scale-95"
        >
          <ArrowLeft size={16} /> 検索結果一覧へ戻る
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-8 space-y-10 md:space-y-16">
            {/* Main Header Card */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-slate-100 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
              {/* Accent decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-[80px] pointer-events-none opacity-50"></div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-indigo-600 text-white text-[10px] md:text-xs font-black rounded-lg tracking-widest uppercase shadow-lg shadow-indigo-200">
                    {job.category}
                  </span>
                  <span className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] md:text-xs font-black rounded-lg tracking-widest uppercase">
                    {job.employment_type}
                  </span>
                </div>

                <h1 className="text-2xl md:text-5xl font-black text-slate-900 mb-10 leading-[1.2] tracking-tight">
                  {job.title}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
                  <div className="flex items-center p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl group hover:border-amber-500/30 transition-all">
                    <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mr-5 shrink-0 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                      <Banknote className="text-white" size={28} />
                    </div>
                    <div>
                      <span className="block text-[9px] md:text-[10px] text-slate-500 font-black uppercase mb-1 tracking-[0.2em]">
                        想定給与
                      </span>
                      <span className="text-xl md:text-3xl font-black text-white italic">
                        {job.salary_min.toLocaleString()}円〜
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mr-5 shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                      <MapPin
                        className="text-slate-400 group-hover:text-indigo-500 transition-colors"
                        size={28}
                      />
                    </div>
                    <div>
                      <span className="block text-[9px] md:text-[10px] text-slate-400 font-black uppercase mb-1 tracking-[0.2em]">
                        勤務地
                      </span>
                      <span className="text-sm md:text-lg font-black text-slate-700">
                        {job.area_pref} {job.area_city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative mb-12 group rounded-[2rem] overflow-hidden shadow-2xl">
                  {job.images.length > 0 ? (
                    <img
                      src={job.images[0]}
                      className="w-full h-[300px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                      alt="Job visual"
                    />
                  ) : (
                    <div className="w-full h-[300px] md:h-[500px] bg-slate-100 flex items-center justify-center text-slate-300">
                      <i className="fas fa-image text-8xl"></i>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <p className="text-white font-black text-sm md:text-lg drop-shadow-md">
                      {job.employer_name} の現場写真
                    </p>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 flex items-center mb-8 gap-4">
                    <div className="w-2 h-10 bg-indigo-600 rounded-full"></div>
                    仕事内容・メッセージ
                  </h3>
                  <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
                    <p className="text-slate-700 leading-[2] whitespace-pre-wrap text-base md:text-xl font-medium tracking-wide">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/*募集要項 Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="px-8 py-10 bg-slate-900 flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-4">
                  <FileText className="text-indigo-400" size={28} />
                  募集要項詳細
                </h2>
                <div className="hidden md:flex items-center gap-2 text-slate-500 font-black text-[10px] tracking-widest uppercase">
                  <CheckCircle2 size={14} className="text-emerald-500" /> AI
                  Validated
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                <DetailRow
                  icon={<StarIcon size={20} />}
                  label="経験・資格"
                  content={job.qualifications}
                />
                <DetailRow
                  icon={<MapPin size={20} />}
                  label="交通アクセス"
                  content={job.access_info}
                />
                <DetailRow
                  icon={<Banknote size={20} />}
                  label="給与・報酬"
                  content={job.salary_details}
                />
                <DetailRow
                  icon={<Clock size={20} />}
                  label="勤務時間"
                  content={job.working_hours}
                />
                <DetailRow
                  icon={<Calendar size={20} />}
                  label="休日・休暇"
                  content={job.holidays}
                />
                <DetailRow
                  icon={<Briefcase size={20} />}
                  label="雇用形態"
                  content={job.employment_type}
                />
                <DetailRow
                  icon={<ShieldCheck size={20} />}
                  label="待遇・福利厚生"
                  content={job.benefits}
                />
                <DetailRow
                  icon={<Briefcase size={20} />}
                  label="職場環境"
                  content={job.workplace_info}
                />
              </div>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center justify-between mb-10 px-2">
                  <h2 className="text-xl md:text-3xl font-black text-slate-900 flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                      <Sparkles size={28} />
                    </div>
                    こちらの求人も人気です
                  </h2>
                </div>
                <div className="grid gap-8">
                  {relatedJobs.map((rJob) => (
                    <JobCard key={rJob.id} job={rJob} onClick={onViewJob} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Floating Sidebar */}
          <div className="lg:col-span-4 lg:relative">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-2xl shadow-indigo-900/10">
                <div className="flex items-center gap-5 mb-10 pb-8 border-b border-slate-50">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-slate-200 shrink-0">
                    <Building2 size={32} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1 block">
                      掲載ストア
                    </span>
                    <h4 className="font-black text-slate-900 text-lg leading-tight line-clamp-2">
                      {job.employer_name}
                    </h4>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <button
                    onClick={() => onApply(job.id)}
                    className="w-full py-6 gradient-gold hover:brightness-110 text-slate-900 text-xl font-black rounded-3xl transition transform active:scale-[0.97] shadow-2xl shadow-amber-500/30 flex items-center justify-center group"
                  >
                    <span>応募画面へ進む</span>
                    <ChevronRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={24}
                    />
                  </button>
                  <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-black rounded-3xl transition transform active:scale-[0.97] shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3">
                    <MessageCircle size={24} />
                    <span>LINEで質問する</span>
                  </button>
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-50">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                      <Info size={20} />
                    </div>
                    <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed">
                      応募には無料会員登録が必要です。チャット機能でお店と直接やり取りできます。
                    </p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <ShieldCheck
                      className="text-emerald-500 shrink-0"
                      size={24}
                    />
                    <span className="text-xs font-black text-slate-700 tracking-wider">
                      AI審査・適正掲載確認済み
                    </span>
                  </div>
                </div>
              </div>

              {/* Recruitment Policy */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                <h5 className="font-black text-xl mb-6 flex items-center gap-3">
                  <HelpCircle className="text-indigo-400" /> お問い合わせ
                </h5>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                  この求人に興味がある方は、まずは「応募画面へ進む」からご連絡ください。WEBからは24時間いつでも受付中です。
                </p>
                <div className="flex items-center gap-3 text-amber-400 font-black text-sm tracking-widest uppercase bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                  <ExternalLink size={18} />
                  WEB応募は24時間受付
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
