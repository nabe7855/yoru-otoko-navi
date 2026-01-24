const fs = require("fs");

const bboxes = JSON.parse(
  fs.readFileSync("data/json/detailed_regional_paths_with_bboxes.json", "utf8"),
);

let tsContent = `import { Region } from "../types";

export interface PrefecturePathData {
  code: string;
  name: string;
  path: string;
  labelPos: { x: number; y: number };
  bbox: { x: number; y: number; width: number; height: number };
}

export interface RegionDetail {
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  prefectures: PrefecturePathData[];
}

export const DETAILED_MAP_DATA: Record<Region, RegionDetail> = {
`;

Object.keys(bboxes).forEach((regionKey) => {
  const region = bboxes[regionKey];
  tsContent += `  ${regionKey}: {
    bbox: { x: ${region.bbox.x.toFixed(2)}, y: ${region.bbox.y.toFixed(2)}, width: ${region.bbox.width.toFixed(2)}, height: ${region.bbox.height.toFixed(2)} },
    prefectures: [
`;
  region.prefectures.forEach((pref) => {
    tsContent += `      {
        code: "${pref.code}",
        name: "${pref.name}",
        path: "${pref.path}",
        labelPos: { x: ${pref.labelPos.x.toFixed(2)}, y: ${pref.labelPos.y.toFixed(2)} },
        bbox: { x: ${pref.bbox.x.toFixed(2)}, y: ${pref.bbox.y.toFixed(2)}, width: ${pref.bbox.width.toFixed(2)}, height: ${pref.bbox.height.toFixed(2)} },
      },
`;
  });
  tsContent += `    ],
  },
`;
});

tsContent += `};
`;

fs.writeFileSync("components/MapData.ts", tsContent);
console.log("Updated components/MapData.ts with prefecture bboxes");
