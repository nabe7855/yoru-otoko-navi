const fs = require("fs");
const path = require("path");

const svgPath =
  "app/area/japanese-prefectures-master/japanese-prefectures-master/map-full.svg";
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
  /<g class="([^"]+)"[^>]*data-code="([^"]+)"[^>]*transform="translate\(([^,]+),\s*([^)]+)\)"[^>]*>([\s\S]*?)<\/g>/g;
let match;

while ((match = gRegex.exec(content)) !== null) {
  const classes = match[1].split(" ");
  const code = match[2];
  const tx = parseFloat(match[3]);
  const ty = parseFloat(match[4]);
  const inner = match[5];

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
      const paths = [];

      // Parse polygons
      const polyRegex = /<polygon points="([^"]+)"/g;
      let pMatch;
      while ((pMatch = polyRegex.exec(inner)) !== null) {
        const pts = pMatch[1]
          .trim()
          .split(/\s+/)
          .map((p) => parseFloat(p));
        const absPts = [];
        for (let i = 0; i < pts.length; i += 2) {
          absPts.push(`${pts[i] + tx},${pts[i + 1] + ty}`);
        }
        paths.push(`M ${absPts.join(" L ")} Z`);
      }

      // Parse paths (M ... L ... Z format)
      const pathRegex = /<path d="([^"]+)"/g;
      let dMatch;
      while ((dMatch = pathRegex.exec(inner)) !== null) {
        // Very basic translate for paths - assumes only M and L with simple coordinates
        const d = dMatch[1].replace(
          /([ML])\s*(-?\d+),(-?\d+)/g,
          (m, op, x, y) => {
            return `${op}${parseFloat(x) + tx},${parseFloat(y) + ty}`;
          },
        );
        paths.push(d);
      }

      regionGroups[mappedRegion].push({
        code,
        name,
        path: paths.join(" "),
      });
    }
  }
}

// Calculate bboxes and centers
const result = {};
Object.keys(regionGroups).forEach((region) => {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const prefectures = regionGroups[region];

  prefectures.forEach((pref) => {
    const nums = pref.path.match(/-?\d+(\.\d+)?/g);
    let pMinX = Infinity,
      pMinY = Infinity,
      pMaxX = -Infinity,
      pMaxY = -Infinity;
    if (nums) {
      nums.forEach((val, idx) => {
        const n = parseFloat(val);
        if (idx % 2 === 0) {
          if (n < minX) minX = n;
          if (n > maxX) maxX = n;
          if (n < pMinX) pMinX = n;
          if (n > pMaxX) pMaxX = n;
        } else {
          if (n < minY) minY = n;
          if (n > maxY) maxY = n;
          if (n < pMinY) pMinY = n;
          if (n > pMaxY) pMaxY = n;
        }
      });
    }
    pref.labelPos = {
      x: (pMinX + pMaxX) / 2,
      y: (pMinY + pMaxY) / 2,
    };
  });

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

console.log(
  "Generated data/json/detailed_regional_paths.json from map-full.svg",
);
