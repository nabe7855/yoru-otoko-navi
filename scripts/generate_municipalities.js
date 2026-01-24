const fs = require("fs");
const path = require("path");

const csvPath =
  "app/area/localgovlistjp-master/localgovlistjp-master/localgov_utf8_lf.csv";
const content = fs.readFileSync(csvPath, "utf8");

const lines = content.split("\n");
const municipalitiesMap = {};

lines.forEach((line) => {
  if (!line.trim()) return;
  const parts = line.split(",");
  if (parts.length < 3) return;

  const prefWithSuffix = parts[0];
  const city = parts[2];

  // Remove 都, 府, 県 suffix for the key
  const prefKey = prefWithSuffix.replace(/[都府県]$/, "");

  if (!municipalitiesMap[prefKey]) {
    municipalitiesMap[prefKey] = [];
  }
  municipalitiesMap[prefKey].push(city);
});

// Sort cities in each prefecture
Object.keys(municipalitiesMap).forEach((pref) => {
  municipalitiesMap[pref].sort();
});

// Sort prefectures alphabetically (or just keep them as is)
const sortedPrefs = Object.keys(municipalitiesMap).sort();

let output = "export const MUNICIPALITIES_DATA: Record<string, string[]> = {\n";
sortedPrefs.forEach((pref) => {
  output += `  "${pref}": [\n`;
  // Limit to maybe 30 cities to keep UI clean? Or keep all?
  // The user asked to show "correctly", usually this means all important ones.
  // For UI, maybe we keep the first 30 if there are too many.
  const cities = municipalitiesMap[pref];
  cities.forEach((city, index) => {
    output += `    "${city}",${(index + 1) % 4 === 0 ? "\n" : " "}`;
  });
  if (cities.length % 4 !== 0) output += "\n";
  output += `  ],\n`;
});
output += "};\n";

fs.writeFileSync("scripts/generated_municipalities.ts", output);
console.log("Generated scripts/generated_municipalities.ts");
const resultCount = Object.keys(municipalitiesMap).length;
console.log(`Processed ${resultCount} prefectures.`);
