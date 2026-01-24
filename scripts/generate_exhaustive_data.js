const fs = require("fs");

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

  // Map to common key (no suffix)
  const prefKey = prefWithSuffix.replace(/[都府県]$/, "");

  if (!municipalitiesMap[prefKey]) {
    municipalitiesMap[prefKey] = [];
  }
  municipalitiesMap[prefKey].push(city);
});

// Sort prefectures to ensure stable output
const sortedPrefs = Object.keys(municipalitiesMap).sort();

let output = "export const MUNICIPALITIES_DATA: Record<string, string[]> = {\n";
sortedPrefs.forEach((pref) => {
  output += `  "${pref}": [\n`;
  const cities = municipalitiesMap[pref];
  // No slice(0, 30) - provide EVERYTHING
  cities.forEach((city, index) => {
    output += `    "${city}",${(index + 1) % 4 === 0 ? "\n" : " "}`;
  });
  if (cities.length % 4 !== 0) output += "\n";
  output += `  ],\n`;
});
// Add specific alias for "北海道" as key if missing (though the regex handles it)
output += "};\n";

fs.writeFileSync("scripts/exhaustive_municipalities.ts", output);
console.log("Generated scripts/exhaustive_municipalities.ts");
const totalCount = Object.values(municipalitiesMap).reduce(
  (acc, val) => acc + val.length,
  0,
);
console.log(
  `Processed ${sortedPrefs.length} prefectures and ${totalCount} municipalities.`,
);
