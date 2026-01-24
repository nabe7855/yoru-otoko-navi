const fs = require("fs");
const path = require("path");

const svgPath =
  "app/area/japanese-prefectures-master/japanese-prefectures-master/map-polygon.svg";
const content = fs.readFileSync(svgPath, "utf8");

const regionGroups = {
  hokkaido: [],
  tohoku: [],
  kanto: [],
  chubu: [],
  kansai: [],
  chugoku: [],
  shikoku: [],
  kyushu: [],
};

const regionMapping = {
  hokkaido: "hokkaido",
  tohoku: "tohoku",
  kanto: "kanto",
  chubu: "chubu",
  kinki: "kansai",
  chugoku: "chugoku",
  shikoku: "shikoku",
  kyushu: "kyushu",
  "kyushu-okinawa": "kyushu",
};

const gRegex =
  /<g class="([^"]+)"[^>]*data-code="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g;
let match;

while ((match = gRegex.exec(content)) !== null) {
  const classes = match[1].split(" ");
  const code = match[2];
  const inner = match[3];

  const titleMatch = /<title>([^<]+)<\/title>/.exec(inner);
  const name = titleMatch ? titleMatch[1].split(" / ")[0] : "";

  if (classes.includes("prefecture")) {
    let mappedRegion = null;
    for (const cls of classes) {
      if (regionMapping[cls]) {
        mappedRegion = regionMapping[cls];
        break;
      }
    }

    if (mappedRegion) {
      const dRegex = /d="([^"]+)"/g;
      let dMatch;
      const paths = [];
      while ((dMatch = dRegex.exec(inner)) !== null) {
        paths.push(dMatch[1]);
      }

      regionGroups[mappedRegion].push({
        code,
        name,
        path: paths.join(" "),
      });
    }
  }
}

// Calculate bboxes
const result = {};
Object.keys(regionGroups).forEach((region) => {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const prefectures = regionGroups[region];

  prefectures.forEach((pref) => {
    // Extract numbers from path
    const nums = pref.path.match(/-?\d+(\.\d+)?/g);
    if (nums) {
      nums.forEach((val, idx) => {
        const n = parseFloat(val);
        if (idx % 2 === 0) {
          if (n < minX) minX = n;
          if (n > maxX) maxX = n;
        } else {
          if (n < minY) minY = n;
          if (n > maxY) maxY = n;
        }
      });
    }
  });

  // Add some padding
  const width = maxX - minX;
  const height = maxY - minY;
  const padding = Math.max(width, height) * 0.15;

  result[region] = {
    bbox: {
      x: minX - padding,
      y: minY - padding,
      width: width + padding * 2,
      height: height + padding * 2,
    },
    prefectures,
  };
});

fs.writeFileSync(
  path.join("data/json", "detailed_regional_paths.json"),
  JSON.stringify(result, null, 2),
);

console.log("Generated data/json/detailed_regional_paths.json with bboxes");
