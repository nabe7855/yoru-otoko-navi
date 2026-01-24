const fs = require("fs");
const path = require("path");

const rawData = JSON.parse(
  fs.readFileSync("data/json/detailed_regional_paths.json", "utf8"),
);

Object.keys(rawData).forEach((regionKey) => {
  const region = rawData[regionKey];
  region.prefectures.forEach((pref) => {
    const nums = pref.path.match(/-?\d+(\.\d+)?/g);
    if (nums) {
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      for (let i = 0; i < nums.length; i += 2) {
        const x = parseFloat(nums[i]);
        const y = parseFloat(nums[i + 1]);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }

      const width = maxX - minX;
      const height = maxY - minY;
      const padding = Math.max(width, height) * 0.2;

      pref.bbox = {
        x: minX - padding,
        y: minY - padding,
        width: width + padding * 2,
        height: height + padding * 2,
      };
    }
  });
});

fs.writeFileSync(
  "data/json/detailed_regional_paths_with_bboxes.json",
  JSON.stringify(rawData, null, 2),
);

console.log("Generated data/json/detailed_regional_paths_with_bboxes.json");
