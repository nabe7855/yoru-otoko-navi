const fs = require("fs");
const path = require("path");

// Read MapData.ts content
const content = fs.readFileSync("components/MapData.ts", "utf8");

// Simple parser for the DETAILED_MAP_DATA object in the TS file
// Since I can't easily parse TS directly with require without setup, I'll extract it using regex or just read the JSON from my previous task if available
// Actually, I have data/json/detailed_regional_paths.json which is the source.

const rawData = JSON.parse(
  fs.readFileSync("data/json/detailed_regional_paths.json", "utf8"),
);

const regionLabels = {};

Object.keys(rawData).forEach((regionKey) => {
  const region = rawData[regionKey];
  let sumX = 0;
  let sumY = 0;
  const count = region.prefectures.length;

  region.prefectures.forEach((pref) => {
    sumX += pref.labelPos.x;
    sumY += pref.labelPos.y;
  });

  regionLabels[regionKey] = {
    x: Math.round(sumX / count),
    y: Math.round(sumY / count),
  };
});

console.log(JSON.stringify(regionLabels, null, 2));
