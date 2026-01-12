import React, { useEffect, useState } from "react";
import { jobService } from "../services/jobService";
import { Employer, SeekerProfile } from "../types";

interface TalentPoolPageProps {
  employer: Employer;
}

const TalentPoolPage: React.FC<TalentPoolPageProps> = ({ employer }) => {
  if (!employer) return null;
  const [talents, setTalents] = useState<SeekerProfile[]>([]);
  const [selectedTalent, setSelectedTalent] = useState<SeekerProfile | null>(
    null
  );

  useEffect(() => {
    const fetchTalents = async () => {
      const list = await jobService.getMatchingTalents(employer.id);
      setTalents(list);
    };
    fetchTalents();
  }, [employer.id]);

  const handleSendOffer = (talent: SeekerProfile) => {
    const message = prompt(
      `${talent.display_name}さんに送るメッセージを入力してください:`,
      "当店の雰囲気にぴったりだと思いスカウトさせていただきました！一度お話しませんか？"
    );
    if (message) {
      jobService.submitApplication({
        jobId: "offer",
        jobTitle: `スカウト (${employer.name})`,
        seekerUserId: talent.id,
        seekerName: talent.display_name,
        contactType: "line",
        contactValue: "N/A",
        message: message,
        isOffer: true,
      });
      alert("スカウトを送信しました！");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900">
          マッチング・タレント
        </h1>
        <p className="text-gray-500">
          店舗の雰囲気や条件に合う、現在お仕事探し中の求職者です。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talents.map((talent) => (
          <div
            key={talent.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
          >
            <div className="p-6 bg-indigo-50/30 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-indigo-500">
                {talent.display_name?.[0] || talent.id[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {talent.display_name}
                </h3>
                <span className="text-[10px] px-2 py-0.5 bg-indigo-600 text-white font-bold rounded-full uppercase tracking-widest">
                  {talent.mbti || "MBTI不明"}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow space-y-4">
              <div className="flex flex-wrap gap-1">
                {talent.personality_tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="block text-[8px] text-gray-400 font-bold uppercase mb-1">
                    希望する雰囲気
                  </span>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {talent.desired_atmosphere || "未設定"}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="block text-[8px] text-gray-400 font-bold uppercase mb-1">
                    会いたい人物像
                  </span>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {talent.desired_person_type || "未設定"}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button
                onClick={() => handleSendOffer(talent)}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition flex items-center justify-center shadow-lg shadow-indigo-100"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                スカウトを送る
              </button>
            </div>
          </div>
        ))}
        {talents.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
            現在、条件に合う求職者は見つかりませんでした。
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentPoolPage;
