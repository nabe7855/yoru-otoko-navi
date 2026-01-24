
import React, { useState } from 'react';
import { Region } from '../types';
import { REGIONS_DATA, MUNICIPALITIES_DATA, DEFAULT_MUNICIPALITIES } from '../constants';
import { ChevronLeft, MapPin, Building2, Landmark, Navigation2 } from 'lucide-react';

interface JapanMapProps {
  onRegionSelect: (region: Region) => void;
  onPrefectureSelect?: (pref: string) => void;
  onMunicipalitySelect?: (pref: string, muni: string) => void;
}

interface RegionPathData {
  id: Region;
  label: string;
  path: string;
  color: string;
  hoverColor: string;
  glowColor: string;
  labelPos: { x: number; y: number };
}

const REGION_MAP_DATA: RegionPathData[] = [
  {
    id: 'hokkaido',
    label: '北海道',
    path: "M360 20 C380 15, 410 15, 435 30 C445 40, 440 60, 430 85 C420 100, 370 95, 350 90 C330 85, 325 70, 335 55 C345 45, 350 25, 360 20 Z",
    color: "fill-indigo-500/80",
    hoverColor: "hover:fill-indigo-400",
    glowColor: "shadow-indigo-500/40",
    labelPos: { x: 388, y: 60 }
  },
  {
    id: 'tohoku',
    label: '東北',
    path: "M330 105 L365 110 L370 140 L355 185 L325 180 L315 140 Z",
    color: "fill-blue-500/80",
    hoverColor: "hover:fill-blue-400",
    glowColor: "shadow-blue-500/40",
    labelPos: { x: 342, y: 150 }
  },
  {
    id: 'kanto',
    label: '関東',
    path: "M305 195 L340 205 L335 235 L320 250 L285 240 L295 210 Z",
    color: "fill-emerald-500/80",
    hoverColor: "hover:fill-emerald-400",
    glowColor: "shadow-emerald-500/40",
    labelPos: { x: 315, y: 228 }
  },
  {
    id: 'chubu',
    label: '中部',
    path: "M245 185 L295 190 L300 230 L275 255 L225 245 L230 200 Z",
    color: "fill-amber-500/80",
    hoverColor: "hover:fill-amber-400",
    glowColor: "shadow-amber-500/40",
    labelPos: { x: 262, y: 220 }
  },
  {
    id: 'kansai',
    label: '関西',
    path: "M185 235 L220 240 L210 270 L195 285 L165 275 L175 245 Z",
    color: "fill-orange-500/80",
    hoverColor: "hover:fill-orange-400",
    glowColor: "shadow-orange-500/40",
    labelPos: { x: 192, y: 262 }
  },
  {
    id: 'chugoku',
    label: '中国',
    path: "M105 235 L160 245 L150 275 L115 285 L95 270 L100 240 Z",
    color: "fill-rose-500/80",
    hoverColor: "hover:fill-rose-400",
    glowColor: "shadow-rose-500/40",
    labelPos: { x: 128, y: 258 }
  },
  {
    id: 'shikoku',
    label: '四国',
    path: "M115 295 L155 305 L145 325 L105 320 Z",
    color: "fill-yellow-500/80",
    hoverColor: "hover:fill-yellow-400",
    glowColor: "shadow-yellow-500/40",
    labelPos: { x: 130, y: 315 }
  },
  {
    id: 'kyushu',
    label: '九州',
    path: "M35 290 L75 300 L65 340 L30 350 L25 310 Z M65 375 L85 385 L80 395 L60 390 Z",
    color: "fill-purple-500/80",
    hoverColor: "hover:fill-purple-400",
    glowColor: "shadow-purple-500/40",
    labelPos: { x: 50, y: 325 }
  }
];

const JapanMap: React.FC<JapanMapProps> = ({ onRegionSelect, onPrefectureSelect, onMunicipalitySelect }) => {
  const [view, setView] = useState<'national' | 'regional' | 'municipal'>('national');
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [activePref, setActivePref] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  const handleRegionClick = (regionId: Region) => {
    setActiveRegion(regionId);
    setView('regional');
    onRegionSelect(regionId);
  };

  const handlePrefClick = (pref: string) => {
    setActivePref(pref);
    setView('municipal');
    onPrefectureSelect?.(pref);
  };

  const handleBack = () => {
    if (view === 'municipal') {
      setView('regional');
      setActivePref(null);
    } else {
      setView('national');
      setActiveRegion(null);
    }
  };

  const currentRegionData = activeRegion ? REGION_MAP_DATA.find(r => r.id === activeRegion) : null;
  const municipalities = activePref ? (MUNICIPALITIES_DATA[activePref] || DEFAULT_MUNICIPALITIES) : [];

  return (
    <div className="relative w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 transition-all duration-700 h-[600px] flex flex-col group/map">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Header Section */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
             <div className={`w-2 h-8 rounded-full transition-all duration-500 shadow-lg ${currentRegionData ? currentRegionData.color.replace('fill-', 'bg-').replace('/80', '') : 'bg-amber-500 shadow-amber-500/20'}`}></div>
             <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {view === 'national' ? 'エリアから探す' : view === 'regional' ? `${currentRegionData?.label}を選択` : `${activePref}のエリア`}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            {view === 'national' ? '日本地図から希望の地方をタップしてください' : view === 'regional' ? '勤務を希望する都道府県を選んでください' : 'さらに詳しいエリア（市区町村）を指定できます'}
          </p>
        </div>
        
        {(view === 'regional' || view === 'municipal') && (
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-black text-slate-300 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 active:scale-95 shrink-0"
          >
            <ChevronLeft size={16} />
            戻る
          </button>
        )}
      </div>

      {/* Map Display Area */}
      <div className="relative flex-grow flex items-center justify-center overflow-hidden rounded-3xl bg-slate-950/30 border border-white/5">
        
        {/* National Map Container */}
        <div className={`absolute inset-0 transition-all duration-1000 ease-out transform ${view === 'national' ? 'scale-100 opacity-100' : 'scale-[2] opacity-0 pointer-events-none'}`}>
          <svg viewBox="0 0 450 450" className="w-full h-full p-4 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {REGION_MAP_DATA.map((region) => (
              <g
                key={region.id}
                onClick={() => handleRegionClick(region.id)}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="cursor-pointer transition-all duration-500"
              >
                <path
                  d={region.path}
                  className={`transition-all duration-500 stroke-white/20 stroke-[1.5] ${region.color} ${region.hoverColor} ${
                    hoveredRegion === region.id ? 'filter drop-shadow-lg scale-[1.03]' : ''
                  }`}
                  style={{ transformOrigin: 'center', filter: hoveredRegion === region.id ? 'url(#glow)' : 'none' }}
                />
                <text
                  x={region.labelPos.x}
                  y={region.labelPos.y}
                  textAnchor="middle"
                  className={`text-[13px] font-black fill-white pointer-events-none transition-all duration-500 ${
                    hoveredRegion === region.id ? 'opacity-100 scale-110' : 'opacity-80'
                  }`}
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)', transformOrigin: `${region.labelPos.x}px ${region.labelPos.y}px` }}
                >
                  {region.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* regional View (Buttons Grid) */}
        <div className={`absolute inset-0 transition-all duration-500 flex items-center justify-center p-6 ${view === 'regional' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          {activeRegion && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg max-h-full overflow-y-auto scrollbar-hide py-4 px-1">
              {REGIONS_DATA[activeRegion].map((pref) => (
                <button
                  key={pref}
                  onClick={() => handlePrefClick(pref)}
                  className={`group relative flex flex-col items-center justify-center p-5 rounded-3xl border transition-all duration-300 shadow-xl active:scale-95 ${currentRegionData?.color.replace('fill-', 'bg-').replace('/80', '/10')} border-white/5 hover:border-white/20 hover:bg-white/5`}
                >
                  <div className={`w-10 h-10 rounded-2xl mb-3 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 ${currentRegionData?.color.replace('fill-', 'bg-').replace('/80', '')}`}>
                    <MapPin className="text-white" size={20} />
                  </div>
                  <span className="text-sm md:text-base font-black text-white">{pref}</span>
                  <div className={`absolute -bottom-1 left-4 right-4 h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${currentRegionData?.color.replace('fill-', 'bg-').replace('/80', '')}`}></div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Municipal View (Detailed List) */}
        <div className={`absolute inset-0 transition-all duration-500 flex flex-col p-6 ${view === 'municipal' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl mb-6 border border-white/10 backdrop-blur-sm">
            <div className={`p-3 rounded-2xl shadow-lg ${currentRegionData?.color.replace('fill-', 'bg-').replace('/80', '')}`}>
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">SELECTED PREFECTURE</span>
              <p className="text-lg font-black text-white leading-tight">{activePref}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {municipalities.map((muni) => (
              <button
                key={muni}
                onClick={() => onMunicipalitySelect?.(activePref!, muni)}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl text-left hover:bg-indigo-600/20 hover:border-indigo-500/50 transition-all group active:scale-[0.97]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-amber-400 transition-all group-hover:scale-125"></div>
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{muni}</span>
                <Navigation2 size={12} className="ml-auto opacity-0 group-hover:opacity-100 text-indigo-400 -rotate-45 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="mt-8 flex items-center justify-center shrink-0">
        <div className="flex items-center gap-3 px-6 py-2 bg-slate-950/50 rounded-full border border-white/5 backdrop-blur-md">
          <div className="flex gap-1">
             <div className={`w-1.5 h-1.5 rounded-full ${view === 'national' ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`}></div>
             <div className={`w-1.5 h-1.5 rounded-full ${view === 'regional' ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'}`}></div>
             <div className={`w-1.5 h-1.5 rounded-full ${view === 'municipal' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`}></div>
          </div>
          <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            {view === 'national' ? (
              <>マップ上の地方をタップ</>
            ) : view === 'regional' ? (
              <>都道府県を選択</>
            ) : (
              <span className="text-amber-400">エリアを決定して検索</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JapanMap;
