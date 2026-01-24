"use client";

import { ChevronLeft, Landmark, Navigation2 } from "lucide-react";
import React, { useState } from "react";
import { DEFAULT_MUNICIPALITIES, MUNICIPALITIES_DATA } from "../constants";
import { Region } from "../types";
import { DETAILED_MAP_DATA } from "./MapData";

interface JapanMapProps {
  onRegionSelect?: (region: Region) => void; // Optional to keep backward compatibility
  onPrefectureSelect?: (pref: string) => void;
  onMunicipalitySelect?: (pref: string, muni: string) => void;
  onPrefectureClick?: (prefName: string) => void; // Existing prop in current system
}

interface RegionPathData {
  id: Region;
  label: string;
  color: string;
  hoverColor: string;
  glowColor: string;
  labelPos: { x: number; y: number };
}

const REGION_MAP_DATA: RegionPathData[] = [
  {
    id: "hokkaido",
    label: "北海道",
    color: "fill-indigo-500/80",
    hoverColor: "hover:fill-indigo-400",
    glowColor: "shadow-indigo-500/40",
    labelPos: { x: 806, y: 154 },
  },
  {
    id: "tohoku",
    label: "東北",
    color: "fill-blue-500/80",
    hoverColor: "hover:fill-blue-400",
    glowColor: "shadow-blue-500/40",
    labelPos: { x: 662, y: 442 },
  },
  {
    id: "kanto",
    label: "関東",
    color: "fill-emerald-500/80",
    hoverColor: "hover:fill-emerald-400",
    glowColor: "shadow-emerald-500/40",
    labelPos: { x: 620, y: 645 },
  },
  {
    id: "chubu",
    label: "中部",
    color: "fill-amber-500/80",
    hoverColor: "hover:fill-amber-400",
    glowColor: "shadow-amber-500/40",
    labelPos: { x: 515, y: 633 },
  },
  {
    id: "kansai",
    label: "関西",
    color: "fill-orange-500/80",
    hoverColor: "hover:fill-orange-400",
    glowColor: "shadow-orange-500/40",
    labelPos: { x: 417, y: 718 },
  },
  {
    id: "chugoku",
    label: "中国",
    color: "fill-rose-500/80",
    hoverColor: "hover:fill-rose-400",
    glowColor: "shadow-rose-500/40",
    labelPos: { x: 276, y: 701 },
  },
  {
    id: "shikoku",
    label: "四国",
    color: "fill-yellow-500/80",
    hoverColor: "hover:fill-yellow-400",
    glowColor: "shadow-yellow-500/40",
    labelPos: { x: 310, y: 772 },
  },
  {
    id: "kyushu",
    label: "九州",
    color: "fill-purple-500/80",
    hoverColor: "hover:fill-purple-400",
    glowColor: "shadow-purple-500/40",
    labelPos: { x: 174, y: 700 },
  },
];

const JapanMap: React.FC<JapanMapProps> = ({
  onRegionSelect,
  onPrefectureSelect,
  onMunicipalitySelect,
  onPrefectureClick,
}) => {
  const [view, setView] = useState<"national" | "regional" | "municipal">(
    "national",
  );
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [activePref, setActivePref] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  const handleRegionClick = (regionId: Region) => {
    setActiveRegion(regionId);
    setView("regional");
    onRegionSelect?.(regionId);
  };

  const handlePrefClick = (pref: string) => {
    setActivePref(pref);
    setView("municipal");
    onPrefectureSelect?.(pref);
    onPrefectureClick?.(pref);
  };

  const handleBack = () => {
    setActivePref(null);
    if (view === "municipal") {
      setView("regional");
    } else {
      setView("national");
      setActiveRegion(null);
    }
  };

  const currentRegionData = activeRegion
    ? REGION_MAP_DATA.find((r) => r.id === activeRegion)
    : null;
  const municipalities = activePref
    ? MUNICIPALITIES_DATA[activePref.replace(/[県府都]$/, "")] ||
      MUNICIPALITIES_DATA[activePref] ||
      DEFAULT_MUNICIPALITIES
    : [];

  const nationalViewBox = "0 0 1000 1000";
  const currentViewBox =
    view === "regional" && activeRegion
      ? `${DETAILED_MAP_DATA[activeRegion].bbox.x} ${DETAILED_MAP_DATA[activeRegion].bbox.y} ${DETAILED_MAP_DATA[activeRegion].bbox.width} ${DETAILED_MAP_DATA[activeRegion].bbox.height}`
      : nationalViewBox;

  return (
    <div className="relative w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 md:p-8 transition-all duration-700 h-[600px] flex flex-col group/map">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Header Section */}
      <div className="relative z-10 mb-8 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-2 h-8 rounded-full transition-all duration-500 shadow-lg ${currentRegionData ? currentRegionData.color.replace("fill-", "bg-").replace("/80", "") : "bg-amber-500 shadow-amber-500/20"}`}
            ></div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {view === "national"
                ? "エリアから探す"
                : view === "regional"
                  ? `${currentRegionData?.label}を選択`
                  : `${activePref}のエリア`}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            {view === "national"
              ? "日本地図から希望の地方をタップしてください"
              : view === "regional"
                ? "勤務を希望する都道府県を選んでください"
                : "さらに詳しいエリア（市区町村）を指定できます"}
          </p>
        </div>

        {(view === "regional" || view === "municipal") && (
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
        <div
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${view !== "municipal" ? "scale-100 opacity-100" : "scale-[0.8] opacity-0 pointer-events-none"}`}
        >
          <svg
            viewBox={currentViewBox}
            className="w-full h-full p-4 transition-all duration-1000 ease-in-out filter drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)]"
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {REGION_MAP_DATA.map((region) => {
              const detail = DETAILED_MAP_DATA[region.id];
              const isRegionActive = activeRegion === region.id;
              const isNational = view === "national";

              return (
                <g
                  key={region.id}
                  className={`transition-all duration-500 ${isNational ? "cursor-pointer" : ""}`}
                  onClick={() => isNational && handleRegionClick(region.id)}
                  onMouseEnter={() => isNational && setHoveredRegion(region.id)}
                  onMouseLeave={() => isNational && setHoveredRegion(null)}
                >
                  {/* Prefecture Polygons */}
                  {detail.prefectures.map((pref) => {
                    const isPrefHovered = activePref === pref.name; // For future detailed hover if needed
                    return (
                      <path
                        key={pref.code}
                        d={pref.path}
                        onClick={(e) => {
                          if (view === "regional") {
                            e.stopPropagation();
                            handlePrefClick(pref.name);
                          }
                        }}
                        className={`transition-all duration-500 stroke-white/10 stroke-[2] 
                          ${view === "regional" ? (isRegionActive ? "cursor-pointer" : "opacity-20 grayscale") : ""}
                          ${
                            isNational
                              ? hoveredRegion === region.id
                                ? region.hoverColor.replace("hover:", "")
                                : region.color
                              : isRegionActive
                                ? region.id === "hokkaido"
                                  ? "fill-indigo-500/60 hover:fill-indigo-400"
                                  : "fill-indigo-600/40 hover:fill-indigo-400"
                                : region.color
                          }`}
                        active-pref={pref.name}
                      />
                    );
                  })}

                  {/* Region Label (Only in National View) */}
                  {isNational && (
                    <text
                      x={region.labelPos.x}
                      y={region.labelPos.y}
                      textAnchor="middle"
                      className={`text-[28px] font-black fill-white pointer-events-none transition-all duration-500 ${
                        hoveredRegion === region.id
                          ? "opacity-100 scale-110"
                          : "opacity-60"
                      }`}
                      style={{
                        textShadow: "0 4px 8px rgba(0,0,0,1)",
                        transformOrigin: `${region.labelPos.x}px ${region.labelPos.y}px`,
                      }}
                    >
                      {region.label}
                    </text>
                  )}

                  {/* Prefecture Labels (Only in Regional View) */}
                  {view === "regional" &&
                    isRegionActive &&
                    detail.prefectures.map((pref) => {
                      return (
                        <text
                          key={`label-${pref.code}`}
                          x={pref.labelPos.x}
                          y={pref.labelPos.y}
                          textAnchor="middle"
                          className="text-[18px] font-black fill-white pointer-events-none"
                          style={{
                            textShadow:
                              "0 0 10px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,1)",
                          }}
                        >
                          {pref.name}
                        </text>
                      );
                    })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Municipal View (Detailed List) */}
        <div
          className={`absolute inset-0 transition-all duration-500 flex flex-col p-6 ${view === "municipal" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"}`}
        >
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl mb-6 border border-white/10 backdrop-blur-sm">
            <div
              className={`p-3 rounded-2xl shadow-lg ${currentRegionData?.color.replace("fill-", "bg-").replace("/80", "")}`}
            >
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                SELECTED PREFECTURE
              </span>
              <p className="text-lg font-black text-white leading-tight">
                {activePref}
              </p>
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
                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                  {muni}
                </span>
                <Navigation2
                  size={12}
                  className="ml-auto opacity-0 group-hover:opacity-100 text-indigo-400 -rotate-45 transition-all"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="mt-8 flex items-center justify-center shrink-0">
        <div className="flex items-center gap-3 px-6 py-2 bg-slate-950/50 rounded-full border border-white/5 backdrop-blur-md">
          <div className="flex gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full ${view === "national" ? "bg-amber-400 animate-pulse" : "bg-slate-700"}`}
            ></div>
            <div
              className={`w-1.5 h-1.5 rounded-full ${view === "regional" ? "bg-indigo-400 animate-pulse" : "bg-slate-700"}`}
            ></div>
            <div
              className={`w-1.5 h-1.5 rounded-full ${view === "municipal" ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`}
            ></div>
          </div>
          <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            {view === "national" ? (
              <>マップ上の地方をタップ</>
            ) : view === "regional" ? (
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
