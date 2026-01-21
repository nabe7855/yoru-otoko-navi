"use client";
import React, { useEffect, useRef, useState } from "react";
import { PREFECTURE_CODE_MAP } from "../constants";

interface JapanMapProps {
  onPrefectureClick: (prefectureName: string) => void;
}

const JapanMap: React.FC<JapanMapProps> = ({ onPrefectureClick }) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [hoveredPref, setHoveredPref] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load SVG file
    fetch("/map-full.svg")
      .then((res) => res.text())
      .then((svg) => {
        setSvgContent(svg);
      })
      .catch((err) => console.error("Failed to load map:", err));
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    const prefectures = containerRef.current.querySelectorAll(".prefecture");

    prefectures.forEach((pref) => {
      const prefElement = pref as SVGElement;
      const code = prefElement.getAttribute("data-code");

      if (code && PREFECTURE_CODE_MAP[code]) {
        // Mouse enter - show prefecture name
        prefElement.addEventListener("mouseenter", () => {
          setHoveredPref(PREFECTURE_CODE_MAP[code]);
        });

        // Mouse leave - hide prefecture name
        prefElement.addEventListener("mouseleave", () => {
          setHoveredPref(null);
        });

        // Click - navigate to prefecture page
        prefElement.addEventListener("click", () => {
          const prefName = PREFECTURE_CODE_MAP[code];
          onPrefectureClick(prefName);
        });
      }
    });

    // Cleanup event listeners
    return () => {
      prefectures.forEach((pref) => {
        const prefElement = pref as SVGElement;
        prefElement.replaceWith(prefElement.cloneNode(true));
      });
    };
  }, [svgContent, onPrefectureClick]);

  return (
    <div className="relative w-full">
      {/* Map Container */}
      <div
        ref={containerRef}
        className="japan-map-container w-full max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Hover Tooltip - Mobile & Desktop */}
      {hoveredPref && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-sm md:text-base animate-fade-in">
            {hoveredPref}
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.japan-map-container svg) {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Base prefecture styling */
        :global(.geolonia-svg-map .prefecture) {
          fill: #f0f4f8;
          stroke: #cbd5e0;
          stroke-width: 1;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        /* Hover effect */
        :global(.geolonia-svg-map .prefecture:hover) {
          fill: #667eea;
          stroke: #5a67d8;
          stroke-width: 2;
          filter: drop-shadow(0 4px 6px rgba(102, 126, 234, 0.3));
        }

        /* Active/Click effect */
        :global(.geolonia-svg-map .prefecture:active) {
          fill: #5a67d8;
          transform: scale(0.98);
        }

        /* Boundary lines */
        :global(.geolonia-svg-map .boundary-line) {
          stroke: #a0aec0;
          stroke-width: 0.5;
          fill: none;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          :global(.geolonia-svg-map .prefecture) {
            stroke-width: 1.5;
          }

          :global(.geolonia-svg-map .prefecture:hover) {
            stroke-width: 2.5;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
          :global(.japan-map-container) {
            max-width: 600px;
          }
        }

        /* Desktop optimizations */
        @media (min-width: 1025px) {
          :global(.japan-map-container) {
            max-width: 800px;
          }
        }

        /* Animation for tooltip */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-fade-in) {
          animation: fade-in 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default JapanMap;
