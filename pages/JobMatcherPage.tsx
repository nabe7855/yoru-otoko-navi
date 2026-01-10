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
  if (!onViewJob) return null;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
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
    <div className="container mx-auto px-4 py-8 max-w-2xl h-[calc(100vh-140px)] flex flex-col">
      <div className="flex-grow overflow-y-auto space-y-4 p-4 no-scrollbar">
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.type === "bot" ? "justify-start" : "justify-end"
            } animate-fade-in`}
          >
            <div
              className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm font-medium shadow-sm ${
                msg.type === "bot"
                  ? "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                  : "bg-indigo-600 text-white rounded-br-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl mt-4">
        <div className="grid grid-cols-2 gap-2">
          {MATCHING_QUESTIONS[step].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="px-4 py-3 bg-slate-50 border border-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition active:scale-95"
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center px-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Question {step + 1} / {MATCHING_QUESTIONS.length}
          </span>
          <div className="flex gap-1">
            {[...Array(MATCHING_QUESTIONS.length)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i <= step ? "bg-indigo-600" : "bg-gray-200"
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
