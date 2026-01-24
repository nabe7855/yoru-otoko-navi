const fs = require("fs");

const content = fs.readFileSync("data/csv/localgov.csv", "utf8");
const lines = content.split("\n").filter(Boolean);
if (lines.length > 0) {
  const columns = lines[0].split(",");
  console.log("Total columns:", columns.length);
  columns.forEach((col, i) => console.log(`${i}: ${col}`));
}
