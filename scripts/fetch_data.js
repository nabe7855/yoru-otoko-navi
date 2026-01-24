const fs = require("fs");
const path = require("path");

async function fetchRepoContent(owner, repo, path = "") {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  console.log(`Fetching: ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

async function downloadFile(url, dest) {
  console.log(`Downloading ${url} to ${dest}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log("Saved.");
  } catch (error) {
    console.error("Download failed:", error);
  }
}

async function main() {
  // 1. Fetch localgovlistjp
  console.log("--- localgovlistjp ---");
  const localGovContents = await fetchRepoContent("kebhr", "localgovlistjp");
  if (localGovContents) {
    const csvFile = localGovContents.find(
      (f) => f.name === "localgov_list_jp.csv",
    );
    if (csvFile) {
      await downloadFile(csvFile.download_url, "data/localgov_list_jp.csv");
    } else {
      console.log("CSV file not found in root. Listing files:");
      localGovContents.forEach((f) => console.log(f.name));
    }
  }

  // 2. Fetch japanese-prefectures
  console.log("--- japanese-prefectures ---");
  const prefContents = await fetchRepoContent(
    "geolonia",
    "japanese-prefectures",
  );
  if (prefContents) {
    // Check for map-full.svg or similar
    const svgFile = prefContents.find((f) => f.name.endsWith(".svg"));
    if (svgFile) {
      await downloadFile(svgFile.download_url, `data/${svgFile.name}`);
    } else {
      console.log("No SVG in root. Checking for other likely files...");
      prefContents.forEach((f) => console.log(f.name));
    }
  }
}

main();
