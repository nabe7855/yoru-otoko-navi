import React, { useEffect, useRef, useState } from "react";
import JobCard from "../components/JobCard";
import { MATCHING_QUESTIONS } from "../constants";
import { jobService } from "../services/jobService";
import { Job } from "../types";

interface JobMatcherPageProps {
  onViewJob: (id: string) => void;
  onBack: () => void;
}

const JobMatcherPage: React.FC<JobMatcherPageProps> = ({
  onViewJob,
  onBack,
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [chatHistory, setChatHistory] = useState<
    { type: "bot" | "user"; text: string }[]
  >([
    {
      type: "bot",
      text: "こんにちは！あなたの希望に合わせて、30秒でぴったりの仕事を提案します。",
    },
  ]);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{ matched: Job[]; hot: Job[] }>({
    matched: [],
    hot: [],
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  if (!onViewJob) return null;

  const handleAnswer = (option: string) => {
    const currentQuestion = MATCHING_QUESTIONS[step];
    const newAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(newAnswers);
    setChatHistory((prev) => [...prev, { type: "user", text: option }]);

    if (step < MATCHING_QUESTIONS.length - 1) {
      setTimeout(() => {
        setStep(step + 1);
        setChatHistory((prev) => [
          ...prev,
          { type: "bot", text: MATCHING_QUESTIONS[step + 1].question },
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            type: "bot",
            text: "ありがとうございます！あなたにぴったりの求人を解析しました...",
          },
        ]);
        const fetchResults = async () => {
          const matched = await jobService.searchJobs(newAnswers);
          // hot は暫定的に全公開求人を代入
          const hot = await jobService.getJobs();
          setResults({ matched: matched.slice(0, 5), hot: hot.slice(0, 3) });
          setIsFinished(true);
        };
        fetchResults();
      }, 1000);
    }
  };

  if (isFinished) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-4">
            MATCHING RESULT
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-2">
            あなたへの提案
          </h2>
          <p className="text-gray-500">
            条件に最も近い求人をピックアップしました。
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-indigo-600 mr-4 rounded-full"></span>
              おすすめの求人 (Top 5)
            </h3>
            <div className="grid gap-4">
              {results.matched.map((job) => (
                <JobCard key={job.id} job={job} onClick={onViewJob} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-1.5 h-6 bg-orange-500 mr-4 rounded-full"></span>
              今、特にアツい案件！
            </h3>
            <div className="grid gap-4">
              {results.hot.map((job) => (
                <JobCard key={job.id} job={job} onClick={onViewJob} />
              ))}
            </div>
          </section>

          <div className="pt-10 border-t flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition"
            >
              ホームへ戻る
            </button>
            <button
              onClick={() => {
                setStep(0);
                setIsFinished(false);
                setChatHistory([
                  { type: "bot", text: "こんにちは！再診断を始めます。" },
                ]);
              }}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-20 bottom-0 z-50 flex flex-col bg-slate-50 w-full md:static md:h-auto md:bg-transparent md:container md:mx-auto md:max-w-2xl md:py-8 md:px-4 md:z-0">
      {/* Chat History */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar pb-32 md:pb-8">
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.type === "bot" ? "justify-start" : "justify-end"
            } animate-fade-in`}
          >
            <div
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-bold shadow-sm leading-relaxed ${
                msg.type === "bot"
                  ? "bg-white text-gray-800 border border-indigo-50 rounded-bl-none"
                  : "bg-indigo-600 text-white rounded-br-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area (Fixed at bottom of this container, above mobile nav) */}
      <div className="bg-white border-t border-indigo-50 p-4 pb-28 md:pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-[60] w-full">
        <div className="grid grid-cols-2 gap-3">
          {MATCHING_QUESTIONS[step].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="px-2 py-4 bg-slate-50 border-2 border-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-indigo-50 hover:border-indigo-600 hover:text-indigo-600 transition active:scale-95 shadow-sm"
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-3 flex justify-between items-center px-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Question {step + 1} / {MATCHING_QUESTIONS.length}
          </span>
          <div className="flex gap-1.5">
            {[...Array(MATCHING_QUESTIONS.length)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i <= step ? "bg-indigo-600 scale-125" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatcherPage;
