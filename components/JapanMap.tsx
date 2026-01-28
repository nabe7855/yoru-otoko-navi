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
  hue: number;
  label: string;
  color: string;
  hoverColor: string;
  glowColor: string;
  labelPos: { x: number; y: number };
}

const getSlotColor = (
  hue: number,
  slot: "A" | "B" | "C" | "D",
  isHovered = false,
) => {
  const variations = {
    A: { s: 85, l: 55 },
    B: { s: 60, l: 75 },
    C: { s: 40, l: 35 },
    D: { s: 70, l: 45 },
  };
  const { s, l } = variations[slot];
  return `hsl(${hue}, ${s}%, ${isHovered ? l + 10 : l}%)`;
};

const REGION_MAP_DATA: RegionPathData[] = [
  {
    id: "hokkaido",
    hue: 230,
    label: "北海道",
    color: "fill-indigo-500/80",
    hoverColor: "hover:fill-indigo-400",
    glowColor: "shadow-indigo-500/40",
    labelPos: { x: 806, y: 154 },
  },
  {
    id: "tohoku",
    hue: 200,
    label: "東北",
    color: "fill-blue-500/80",
    hoverColor: "hover:fill-blue-400",
    glowColor: "shadow-blue-500/40",
    labelPos: { x: 662, y: 442 },
  },
  {
    id: "kanto",
    hue: 160,
    label: "関東",
    color: "fill-emerald-500/80",
    hoverColor: "hover:fill-emerald-400",
    glowColor: "shadow-emerald-500/40",
    labelPos: { x: 620, y: 645 },
  },
  {
    id: "chubu",
    hue: 45,
    label: "中部",
    color: "fill-amber-500/80",
    hoverColor: "hover:fill-amber-400",
    glowColor: "shadow-amber-500/40",
    labelPos: { x: 515, y: 633 },
  },
  {
    id: "kansai",
    hue: 15,
    label: "関西",
    color: "fill-orange-500/80",
    hoverColor: "hover:fill-orange-400",
    glowColor: "shadow-orange-500/40",
    labelPos: { x: 417, y: 718 },
  },
  {
    id: "chugoku",
    hue: 340,
    label: "中国",
    color: "fill-rose-500/80",
    hoverColor: "hover:fill-rose-400",
    glowColor: "shadow-rose-500/40",
    labelPos: { x: 276, y: 701 },
  },
  {
    id: "shikoku",
    hue: 65,
    label: "四国",
    color: "fill-yellow-500/80",
    hoverColor: "hover:fill-yellow-400",
    glowColor: "shadow-yellow-500/40",
    labelPos: { x: 310, y: 772 },
  },
  {
    id: "kyushu",
    hue: 280,
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
    // Only zoom, no direct search here
  };

  const handlePrefClick = (pref: string) => {
    setActivePref(pref);
    setView("municipal");
    // Only zoom, no direct search here
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

  const activePrefData =
    activeRegion && activePref
      ? DETAILED_MAP_DATA[activeRegion].prefectures.find(
          (p) => p.name === activePref,
        )
      : null;

  const municipalities = activePref
    ? MUNICIPALITIES_DATA[activePref.replace(/[県府都]$/, "")] ||
      MUNICIPALITIES_DATA[activePref] ||
      DEFAULT_MUNICIPALITIES
    : [];

  const nationalViewBox = "150 50 750 750";
  let currentViewBox = nationalViewBox;

  if (view === "municipal" && activePrefData) {
    currentViewBox = `${activePrefData.bbox.x} ${activePrefData.bbox.y} ${activePrefData.bbox.width} ${activePrefData.bbox.height}`;
  } else if (view === "regional" && activeRegion) {
    const b = DETAILED_MAP_DATA[activeRegion].bbox;
    // Special zoom factor for Kyushu to accommodate the inset
    const zoomFactor = activeRegion === "kyushu" ? 1.1 : 1.3;
    const w = b.width / zoomFactor;
    const h = b.height / zoomFactor;
    const x = b.x + (b.width - w) / 2;
    const y = b.y + (b.height - h) / 2;
    currentViewBox = `${x} ${y} ${w} ${h}`;
  }

  return (
    <div className="relative w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl p-6 md:p-8 transition-all duration-700 h-[600px] flex flex-col group/map">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Header Section */}
      {/* Header Section */}
      <div className="relative z-10 mb-8 flex flex-wrap items-start gap-4 md:gap-6 pr-16 md:pr-20">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-2 h-8 rounded-full transition-all duration-500 shadow-lg ${currentRegionData ? currentRegionData.color.replace("fill-", "bg-").replace("/80", "") : "bg-cyan-500 shadow-cyan-500/20"}`}
            ></div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              {view === "national"
                ? "エリアから探す"
                : view === "regional"
                  ? `${currentRegionData?.label}を選択`
                  : `${activePref}のエリア`}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-500 font-medium max-w-md">
            {view === "national"
              ? "日本地図から希望の地方をタップしてください"
              : view === "regional"
                ? "勤務を希望する都道府県を選んでください"
                : "さらに詳しいエリア（市区町村）を指定できます"}
          </p>
        </div>

        {(view === "regional" || view === "municipal") && (
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() =>
                view === "regional"
                  ? onRegionSelect?.(activeRegion!)
                  : onPrefectureSelect?.(activePref!)
              }
              className="group/search-btn flex items-center gap-2 px-3 md:px-5 py-2.5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl text-cyan-600 font-black text-[10px] md:text-sm tracking-tight md:tracking-widest shadow-lg hover:bg-cyan-500 hover:text-white active:scale-95 transition-all"
            >
              <Navigation2
                size={14}
                className="group-hover/search-btn:rotate-12 transition-transform"
              />
              <span className="whitespace-nowrap">
                {view === "regional"
                  ? `${currentRegionData?.label}地方すべて`
                  : `${activePref}全体`}
                で検索
              </span>
            </button>

            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[10px] md:text-xs font-black text-slate-500 hover:text-slate-800 transition-all bg-white border border-slate-200 hover:bg-slate-50 px-3 md:px-4 py-2.5 rounded-2xl active:scale-95 shrink-0 shadow-sm"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">戻る</span>
            </button>
          </div>
        )}
      </div>

      {/* Split Main Area */}
      <div className="relative flex-grow flex overflow-hidden rounded-3xl bg-slate-950/30 border border-white/5">
        {/* SVG Map Section */}
        <div
          className={`h-full transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1) flex items-center justify-center 
            ${view === "municipal" ? "w-[40%]" : "w-full"}`}
        >
          <svg
            viewBox={currentViewBox}
            className="w-full h-full p-4 transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1) filter drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)]"
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

              // Skip other regions in municipal view to focus only on the active one
              if (view === "municipal" && !isRegionActive) return null;

              return (
                <g
                  key={region.id}
                  className={`transition-all duration-500 ${isNational ? "cursor-pointer" : ""}`}
                  onClick={() => isNational && handleRegionClick(region.id)}
                  onMouseEnter={() => isNational && setHoveredRegion(region.id)}
                  onMouseLeave={() => isNational && setHoveredRegion(null)}
                >
                  {/* Prefecture Polygons */}
                  {detail.prefectures.map((pref, index: number) => {
                    const isPrefActive = activePref === pref.name;
                    // In municipal view, hide all other prefectures in the region
                    if (view === "municipal" && !isPrefActive) return null;

                    // Special trasform for Okinawa in regional view to move it closer (inset)
                    const isKyushuOkinawa =
                      activeRegion === "kyushu" &&
                      pref.name === "沖縄" &&
                      view === "regional";
                    const okinawaTransform = isKyushuOkinawa
                      ? "translate(-110, 520) scale(0.8)"
                      : "";

                    const fillColor = isNational
                      ? getSlotColor(
                          region.hue,
                          "A",
                          hoveredRegion === region.id,
                        )
                      : isRegionActive
                        ? getSlotColor(region.hue, pref.colorSlot)
                        : "rgba(255,255,255,0.05)";

                    return (
                      <path
                        key={pref.code}
                        d={pref.path}
                        transform={okinawaTransform}
                        onClick={(e) => {
                          if (view === "regional") {
                            e.stopPropagation();
                            handlePrefClick(pref.name);
                          }
                        }}
                        className={`transition-all duration-700 ease-out stroke-white/10 stroke-[1.5] 
                          ${view === "regional" ? (isRegionActive ? "cursor-pointer" : "opacity-10 grayscale brightness-[0.3]") : ""}
                          ${view === "municipal" && isPrefActive ? "!fill-amber-500/60 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]" : ""}
                        `}
                        style={{ fill: fillColor }}
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
                    detail.prefectures.map((pref, index: number) => {
                      const isOkinawaLabel =
                        activeRegion === "kyushu" && pref.name === "沖縄";
                      const finalX = isOkinawaLabel
                        ? 40
                        : pref.name === "東京"
                          ? 609.5
                          : pref.labelPos.x;
                      const finalY = isOkinawaLabel
                        ? 750
                        : pref.name === "東京"
                          ? 645
                          : pref.labelPos.y;

                      return (
                        <text
                          key={`label-${pref.code}`}
                          x={finalX}
                          y={finalY}
                          textAnchor="middle"
                          className="text-[16px] font-black fill-white pointer-events-none animate-label-in"
                          style={
                            {
                              textShadow:
                                "0 0 10px rgba(0,0,0,1), 0 0 5px rgba(0,0,0,1)",
                              "--delay": index * 60,
                            } as React.CSSProperties
                          }
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

        {/* Municipal View (Side List) */}
        <div
          className={`h-full border-l border-slate-200 bg-white/90 backdrop-blur-md transition-all duration-[1000ms] cubic-bezier(0.22, 1, 0.36, 1) flex flex-col p-6 
            ${view === "municipal" ? "w-[60%] opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-32 pointer-events-none"}`}
        >
          <div className="flex items-center gap-4 p-4 bg-white/50 rounded-3xl mb-6 border border-slate-100 backdrop-blur-sm shadow-sm">
            <div
              className={`p-3 rounded-2xl shadow-lg ${currentRegionData?.color.replace("fill-", "bg-").replace("/80", "")}`}
            >
              <Landmark size={24} className="text-white" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                SELECTED PREFECTURE
              </span>
              <p className="text-lg font-black text-slate-800 leading-tight">
                {activePref}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {municipalities.map((muni, index: number) => (
              <button
                key={muni}
                onClick={() => onMunicipalitySelect?.(activePref!, muni)}
                className="flex items-center gap-2 p-5 md:p-9 bg-white border border-slate-100 rounded-xl md:rounded-2xl text-left hover:bg-cyan-50 hover:border-cyan-200 transition-all group active:scale-[0.97] animate-nurutto overflow-hidden shadow-sm hover:shadow-md"
                style={
                  {
                    "--delay": index * 30,
                    animationDelay: `${index * 30}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-300 group-hover:bg-cyan-500 transition-all group-hover:scale-125 shrink-0"></div>
                <span className="text-[13px] md:text-sm font-bold text-slate-600 group-hover:text-cyan-700 transition-colors whitespace-nowrap">
                  {muni}
                </span>
                <Navigation2
                  size={10}
                  className="ml-auto opacity-0 group-hover:opacity-100 text-cyan-400 -rotate-45 transition-all shrink-0 hidden sm:block"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="mt-8 flex items-center justify-center shrink-0">
        <div className="flex items-center gap-3 px-6 py-2 bg-white/80 rounded-full border border-slate-200 backdrop-blur-md shadow-sm">
          <div className="flex gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full ${view === "national" ? "bg-amber-400 animate-pulse" : "bg-slate-300"}`}
            ></div>
            <div
              className={`w-1.5 h-1.5 rounded-full ${view === "regional" ? "bg-cyan-400 animate-pulse" : "bg-slate-300"}`}
            ></div>
            <div
              className={`w-1.5 h-1.5 rounded-full ${view === "municipal" ? "bg-emerald-400 animate-pulse" : "bg-slate-300"}`}
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
