import { LocationService, Prefecture, Region } from "@/lib/location";
import React, { useEffect, useRef, useState } from "react";

interface JapanMapProps {
  onRegionSelect?: (region: Region) => void;
  onPrefectureSelect?: (pref: Prefecture) => void;
  selectedRegion?: Region | null;
  className?: string;
}

const JapanMap: React.FC<JapanMapProps> = ({
  onRegionSelect,
  onPrefectureSelect,
  selectedRegion,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    // Load Regions data
    setRegions(LocationService.getRegions());

    // Load SVG
    fetch("/map-mobile.svg")
      .then((res) => res.text())
      .then((svg) => setSvgContent(svg))
      .catch((err) => console.error("Failed to load map svg", err));
  }, []);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const svgElement = containerRef.current.querySelector("svg");
    if (!svgElement) return;

    // Apply basic styles to SVG
    svgElement.style.width = "100%";
    svgElement.style.height = "auto";
    svgElement.style.display = "block";

    // Add event listeners to prefectures
    const prefElements = svgElement.querySelectorAll(".prefecture");

    // Reset all styles first
    prefElements.forEach((el) => {
      const element = el as SVGElement;
      element.style.fill = "#e2e8f0"; // slate-200 default
      element.style.stroke = "#fff";
      element.style.strokeWidth = "1";
      element.style.cursor = "pointer";
      element.style.transition = "fill 0.3s ease";

      // Remove old listeners (cloning is a quick way, but let's just re-attach safely if simple)
      // For now, simpler to just set onclick
      (element as any).onclick = (e: MouseEvent) => {
        e.stopPropagation();
        handlePrefClick(element);
      };
    });

    // Highlight logic
    regions.forEach((region) => {
      const isRegionSelected = selectedRegion?.id === region.id;

      region.prefectures.forEach((pref) => {
        // Find element by class (e.g. "tokyo")
        // Classes in SVG: "tokyo prefecture kanto" etc.
        // We look for class containing the pref.id ("tokyo")
        const el = Array.from(prefElements).find((e) =>
          e.classList.contains(pref.id),
        ) as SVGElement;

        if (el) {
          if (selectedRegion) {
            // If a region is selected
            if (isRegionSelected) {
              el.style.fill = getRegionColor("selected"); // Active Region Color
              el.style.pointerEvents = "auto";
            } else {
              el.style.fill = "#f1f5f9"; // Inactive (slate-100)
              el.style.pointerEvents = "none"; // Disable interactions for others
            }
          } else {
            // No region selected (Overview mode)
            el.style.fill = getRegionColor(region.id); // Region Color
            el.style.pointerEvents = "auto";
          }
        }
      });
    });

    // Zoom to region if selected
    if (selectedRegion) {
      zoomToRegion(selectedRegion, svgElement);
    } else {
      resetZoom(svgElement);
    }
  }, [svgContent, regions, selectedRegion]);

  const handlePrefClick = (el: SVGElement) => {
    // Extract pref ID from class
    const classList = Array.from(el.classList);
    const prefId = classList.find(
      (c) =>
        c !== "prefecture" &&
        c !== "geolonia-svg-map-prefecture" &&
        !REGIONS_IDS.includes(c),
    ); // Heuristic

    if (!prefId) return;

    const pref = LocationService.getPrefectureBySlug(prefId);
    if (!pref) return;

    // Find which region this pref belongs to
    const region = regions.find((r) =>
      r.prefectures.some((p) => p.code === pref.code),
    );
    if (!region) return;

    if (!selectedRegion) {
      // Region Selection Mode
      if (onRegionSelect) onRegionSelect(region);
    } else {
      // Prefecture Selection Mode (only if in selected region)
      if (selectedRegion.id === region.id) {
        if (onPrefectureSelect) onPrefectureSelect(pref);
      }
    }
  };

  const zoomToRegion = (region: Region, svg: SVGSVGElement) => {
    // Calculate bbox of the region
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    let found = false;

    region.prefectures.forEach((pref) => {
      const el = svg.querySelector(`.${pref.id}`) as SVGGraphicsElement;
      if (el) {
        const bbox = el.getBBox();
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
        found = true;
      }
    });

    if (found) {
      // Add padding
      const padding = 20;
      const vb = `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`;
      svg.setAttribute("viewBox", vb);
    }
  };

  const resetZoom = (svg: SVGSVGElement) => {
    // Assuming original viewBox is somewhere in the SVG string or we can infer roughly
    // map-mobile.svg usually covers whole Japan.
    // Let's check original viewBox or set a default one if known.
    // Or just re-parse the string to get original viewBox?
    // Simpler: hardcode rough Japan bbox or remove attribute to let it default (if set in SVG)
    // But we overwrote it.
    // A safe way is to capture initial viewBox.
    // For now, reload SVG content handles resetting naturally because we re-render.
    // Actually, we are updating the DOM node directly, so we need to reset.

    // Hack: Finding Hokkaido and Okinawa and making a box
    // ... Or just use the original viewBox if we parsed it.
    // Let's assume the SVG has a viewBox.
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    const originalVB = doc.documentElement.getAttribute("viewBox");
    if (originalVB) {
      svg.setAttribute("viewBox", originalVB);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-slate-50/50 rounded-3xl ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

// Colors for Regions (Tailwind Palette approximate)
const getRegionColor = (regionId: string) => {
  switch (regionId) {
    case "hokkaido":
      return "#3b82f6"; // blue-500
    case "tohoku":
      return "#06b6d4"; // cyan-500
    case "kanto":
      return "#8b5cf6"; // violet-500
    case "chubu":
      return "#10b981"; // emerald-500
    case "kansai":
      return "#f59e0b"; // amber-500
    case "chugoku":
      return "#f97316"; // orange-500
    case "shikoku":
      return "#ef4444"; // red-500
    case "kyushu":
      return "#ec4899"; // pink-500
    case "selected":
      return "#4f46e5"; // indigo-600 (active pref?)
    default:
      return "#cbd5e1";
  }
};

const REGIONS_IDS = [
  "hokkaido",
  "tohoku",
  "kanto",
  "chubu",
  "kansai",
  "chugoku",
  "shikoku",
  "kyushu",
];

export default JapanMap;
