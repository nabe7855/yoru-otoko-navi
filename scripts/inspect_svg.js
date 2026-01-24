const fs = require("fs");

const content = fs.readFileSync("data/svg/map-mobile.svg", "utf8");
// Extract IDs
const ids = content.match(/id="[^"]+"/g);
if (ids) {
  console.log("Found IDs:", ids.slice(0, 10)); // Show first 10
} else {
  console.log("No IDs found.");
  // Check classes
  const classes = content.match(/class="[^"]+"/g);
  if (classes) {
    console.log("Found classes:", classes.slice(0, 10));
  }
}
