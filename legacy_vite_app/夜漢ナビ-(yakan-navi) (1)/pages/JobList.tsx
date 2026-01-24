import React, { useState, useMemo } from 'react';
// @ts-ignore - Fixing "Module 'react-router-dom' has no exported member 'useSearchParams'" compiler error
import { useSearchParams } from 'react-router-dom';
import { MOCK_JOBS, INDUSTRIES, PERKS } from '../constants';
import JobCard from '../components/JobCard';
import { MapPin, X, ListFilter, Search as SearchIcon } from 'lucide-react';

const JobList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const activePrefecture = searchParams.get('prefecture');
  const activeArea = searchParams.get('area');

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchPref = activePrefecture ? job.location.includes(activePrefecture) : true;
      const matchArea = activeArea ? job.location.includes(activeArea) : true;
      const matchIndustry = selectedIndustries.length > 0 ? selectedIndustries.includes(job.industry) : true;
      const matchKeyword = keyword ? (
        job.storeName.toLowerCase().includes(keyword.toLowerCase()) || 
        job.location.toLowerCase().includes(keyword.toLowerCase())
      ) : true;
      
      return matchPref && matchArea && matchIndustry && matchKeyword;
    });
  }, [activePrefecture, activeArea, selectedIndustries, keyword]);

  const toggleIndustry = (id: string) => {
    setSelectedIndustries(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const removeFilter = (key: 'prefecture' | 'area') => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-black text-slate-900">
          求人一覧
          {activePrefecture && <span className="ml-2 text-indigo-600">in {activePrefecture}{activeArea && ` ${activeArea}`}</span>}
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
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
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

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setIsFilterOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-slate-900">絞り込み</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2"><X size={24} /></button>
            </div>
            
            <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-120px)]">
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-600" />
                  エリア (URLから指定中)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activePrefecture && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100">
                      {activePrefecture}
                      <X size={14} className="cursor-pointer" onClick={() => removeFilter('prefecture')} />
                    </span>
                  )}
                  {activeArea && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100">
                      {activeArea}
                      <X size={14} className="cursor-pointer" onClick={() => removeFilter('area')} />
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-4">業種</h4>
                <div className="grid grid-cols-1 gap-3">
                  {INDUSTRIES.map(ind => (
                    <label key={ind.id} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={selectedIndustries.includes(ind.id)}
                        onChange={() => toggleIndustry(ind.id)}
                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                      <span className="text-sm font-medium text-slate-700">{ind.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={() => setIsFilterOpen(false)} className="w-full py-4 gradient-dark text-white font-black rounded-xl shadow-lg mt-8">
                条件を適用する
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters Desktop */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-800">絞り込み条件</h3>
              <button 
                onClick={() => {
                  setSearchParams({});
                  setSelectedIndustries([]);
                  setKeyword('');
                }}
                className="text-[10px] font-black text-slate-400 hover:text-red-500 transition tracking-widest"
              >
                RESET
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-600" />
                  選択中のエリア
                </h4>
                <div className="space-y-2">
                  {activePrefecture || activeArea ? (
                    <>
                      {activePrefecture && (
                        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700">
                          {activePrefecture}
                          <X size={14} className="cursor-pointer text-slate-300 hover:text-red-500" onClick={() => removeFilter('prefecture')} />
                        </div>
                      )}
                      {activeArea && (
                        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700">
                          {activeArea}
                          <X size={14} className="cursor-pointer text-slate-300 hover:text-red-500" onClick={() => removeFilter('area')} />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs text-slate-400 italic">マップから選択してください</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4">業種から絞り込む</h4>
                <div className="space-y-3">
                  {INDUSTRIES.map(ind => (
                    <label key={ind.id} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedIndustries.includes(ind.id)}
                        onChange={() => toggleIndustry(ind.id)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition">{ind.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-800 mb-4">こだわり条件</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {PERKS.map(perk => (
                    <label key={perk} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition">{perk}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main List Area */}
        <main className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="text-sm font-bold text-slate-500">
                ヒット件数: <span className="font-black text-slate-900 text-lg">{filteredJobs.length}</span> 件
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activePrefecture && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded border border-indigo-100 uppercase tracking-tighter">
                    {activePrefecture} <X size={10} className="cursor-pointer" onClick={() => removeFilter('prefecture')} />
                  </span>
                )}
                {activeArea && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded border border-indigo-100 uppercase tracking-tighter">
                    {activeArea} <X size={10} className="cursor-pointer" onClick={() => removeFilter('area')} />
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">SORT:</span>
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none">
                <option>新着順</option>
                <option>給与の高い順</option>
                <option>おすすめ順</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 font-bold mb-4">条件に合う求人が見つかりませんでした</p>
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setSelectedIndustries([]);
                    setKeyword('');
                  }}
                  className="text-indigo-600 font-black hover:underline"
                >
                  すべての求人を見る
                </button>
              </div>
            )}
          </div>

          {filteredJobs.length > 0 && (
            <div className="flex justify-center pt-8">
              <nav className="flex items-center gap-2 overflow-x-auto pb-2">
                <button className="min-w-[40px] h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30" disabled>
                  &larr;
                </button>
                <button className="min-w-[40px] h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-black shadow-md">1</button>
                <button className="min-w-[40px] h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold">2</button>
                <button className="min-w-[40px] h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold">3</button>
                <span className="px-2 text-slate-300 font-bold">...</span>
                <button className="min-w-[40px] h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold">12</button>
                <button className="min-w-[40px] h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
                  &rarr;
                </button>
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobList;