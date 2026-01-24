const fs = require("fs");
const path = require("path");

// Output directories
const OUT_DIR = "data/json";
const CITIES_DIR = path.join(OUT_DIR, "cities");
fs.mkdirSync(CITIES_DIR, { recursive: true });

// Prefectures Mapping (JIS Code)
const PREF_MAP = {
  北海道: "01",
  青森県: "02",
  岩手県: "03",
  宮城県: "04",
  秋田県: "05",
  山形県: "06",
  福島県: "07",
  茨城県: "08",
  栃木県: "09",
  群馬県: "10",
  埼玉県: "11",
  千葉県: "12",
  東京都: "13",
  神奈川県: "14",
  新潟県: "15",
  富山県: "16",
  石川県: "17",
  福井県: "18",
  山梨県: "19",
  長野県: "20",
  岐阜県: "21",
  静岡県: "22",
  愛知県: "23",
  三重県: "24",
  滋賀県: "25",
  京都府: "26",
  大阪府: "27",
  兵庫県: "28",
  奈良県: "29",
  和歌山県: "30",
  鳥取県: "31",
  島根県: "32",
  岡山県: "33",
  広島県: "34",
  山口県: "35",
  徳島県: "36",
  香川県: "37",
  愛媛県: "38",
  高知県: "39",
  福岡県: "40",
  佐賀県: "41",
  長崎県: "42",
  熊本県: "43",
  大分県: "44",
  宮崎県: "45",
  鹿児島県: "46",
  沖縄県: "47",
};

// Region Mapping
const REGIONS = [
  { id: "hokkaido", name: "北海道", prefs: ["01"] },
  { id: "tohoku", name: "東北", prefs: ["02", "03", "04", "05", "06", "07"] },
  {
    id: "kanto",
    name: "関東",
    prefs: ["08", "09", "10", "11", "12", "13", "14"],
  },
  {
    id: "chubu",
    name: "中部",
    prefs: ["15", "16", "17", "18", "19", "20", "21", "22", "23"],
  },
  {
    id: "kansai",
    name: "近畿",
    prefs: ["24", "25", "26", "27", "28", "29", "30"],
  },
  { id: "chugoku", name: "中国", prefs: ["31", "32", "33", "34", "35"] },
  { id: "shikoku", name: "四国", prefs: ["36", "37", "38", "39"] },
  {
    id: "kyushu",
    name: "九州・沖縄",
    prefs: ["40", "41", "42", "43", "44", "45", "46", "47"],
  },
];

function main() {
  const content = fs.readFileSync("data/csv/localgov.csv", "utf8");
  const lines = content.split("\n").filter(Boolean);

  const citiesByPref = {};
  const prefectures = {}; // Code -> Name

  lines.forEach((line) => {
    // Format: 都道府県, Romaji, 市区町村, Romaji, URL
    const cols = line.split(",");
    if (cols.length < 4) return;

    const prefName = cols[0];
    const prefRomaji = cols[1];
    const cityName = cols[2];
    const cityRomaji = cols[3];

    const prefCode = PREF_MAP[prefName];
    if (!prefCode) return;

    // Register Prefecture
    if (!prefectures[prefCode]) {
      prefectures[prefCode] = {
        code: prefCode,
        name: prefName,
        en: prefRomaji,
        id: prefRomaji.toLowerCase(), // slug for URL
      };
      citiesByPref[prefCode] = [];
    }

    // Process City
    // Improve slug generation
    let slug = cityRomaji.toLowerCase().replace(/[\s\-_]+/g, "-");
    // Remove suffix like -shi, -ku for cleaner URLs if desired?
    // Requirement says "13-shibuya", implies slug is just "shibuya"?
    // "Sapporo-shi" -> "sapporo-shi" (keep suffix to avoid collision?)
    // "Shibuya-ku" -> "shibuya-ku"

    // Check duplication in same prefecture?
    const cityId = `${prefCode}-${slug}`;

    citiesByPref[prefCode].push({
      id: cityId,
      name: cityName,
      en: cityRomaji,
      slug: slug,
      prefCode: prefCode,
    });
  });

  // 1. Output Regions
  const regionData = REGIONS.map((r) => ({
    ...r,
    prefectures: r.prefs.map((pCode) => prefectures[pCode]).filter(Boolean),
  }));
  fs.writeFileSync(
    path.join(OUT_DIR, "regions.json"),
    JSON.stringify(regionData, null, 2),
  );
  console.log("Generated regions.json");

  // 2. Output Prefectures List
  const prefList = Object.values(prefectures).sort(
    (a, b) => Number(a.code) - Number(b.code),
  );
  fs.writeFileSync(
    path.join(OUT_DIR, "prefectures.json"),
    JSON.stringify(prefList, null, 2),
  );
  console.log("Generated prefectures.json");

  // 3. Output Cities per Prefecture
  Object.keys(citiesByPref).forEach((prefCode) => {
    const cities = citiesByPref[prefCode];
    fs.writeFileSync(
      path.join(CITIES_DIR, `${prefCode}.json`),
      JSON.stringify(cities, null, 2),
    );
  });
  console.log(`Generated ${Object.keys(citiesByPref).length} city files.`);
}

main();
