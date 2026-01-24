const fs = require("fs");

const oldData = {
  東京: [
    "新宿区",
    "渋谷区",
    "港区",
    "中央区",
    "豊島区",
    "台東区",
    "品川区",
    "目黒区",
    "世田谷区",
    "中野区",
    "杉並区",
    "北区",
    "荒川区",
    "板橋区",
    "練馬区",
    "足立区",
    "葛飾区",
    "江戸川区",
    "八王子市",
    "立川市",
    "武蔵野市",
    "町田市",
  ],
  神奈川: [
    "横浜市",
    "川崎市",
    "相模原市",
    "厚木市",
    "大和市",
    "海老名市",
    "藤沢市",
    "鎌倉市",
    "横須賀市",
    "平塚市",
    "茅ヶ崎市",
  ],
  大阪: [
    "大阪市北区",
    "大阪市中央区",
    "大阪市淀川区",
    "大阪市天王寺区",
    "堺市",
    "東大阪市",
    "豊中市",
    "吹田市",
    "高槻市",
    "枚方市",
    "八尾市",
    "寝屋川市",
  ],
  愛知: [
    "名古屋市中区",
    "名古屋市中村区",
    "名古屋市東区",
    "名古屋市熱田区",
    "一宮市",
    "豊橋市",
    "岡崎市",
    "豊田市",
    "春日井市",
    "安城市",
  ],
  福岡: [
    "福岡市博多区",
    "福岡市中央区",
    "福岡市早良区",
    "北九州市小倉北区",
    "久留米市",
    "飯塚市",
    "大牟田市",
  ],
  北海道: [
    "札幌市中央区",
    "札幌市北区",
    "札幌市すすきの",
    "旭川市",
    "函館市",
    "小樽市",
    "釧路市",
    "苫高牧市",
    "帯広市",
  ],
  宮城: [
    "仙台市青葉区",
    "仙台市宮城野区",
    "仙台市若林区",
    "石巻市",
    "大崎市",
    "名取市",
  ],
  兵庫: [
    "神戸市中央区",
    "神戸市兵庫区",
    "西宮市",
    "尼崎市",
    "姫路市",
    "明石市",
    "加古川市",
    "宝塚市",
  ],
  京都: [
    "京都市中京区",
    "京都市下京区",
    "京都市東山区",
    "京都市左京区",
    "宇治市",
    "舞鶴市",
  ],
  埼玉: [
    "さいたま市",
    "川口市",
    "川越市",
    "越谷市",
    "草加市",
    "所沢市",
    "上尾市",
    "北本市",
    "熊谷市",
  ],
  千葉: [
    "千葉市中央区",
    "船橋市",
    "市川市",
    "松戸市",
    "柏市",
    "浦安市",
    "成田市",
    "市原市",
  ],
  静岡: [
    "静岡市葵区",
    "静岡市清水区",
    "浜松市中区",
    "沼津市",
    "富士市",
    "三島市",
  ],
  広島: ["広島市中区", "広島市南区", "福山市", "呉市", "東広島市", "尾道市"],
  群馬: ["高崎市", "前橋市", "太田市", "伊勢崎市", "桐生市"],
  栃木: ["宇都宮市", "小山市", "足利市", "栃木市"],
  茨城: ["水戸市", "つくば市", "日立市", "土浦市", "ひたちなか市"],
  山梨: ["甲府市", "富士吉田市", "笛吹市"],
  長野: ["長野市", "松本市", "上田市", "佐久市"],
  岐阜: ["岐阜市", "大垣市", "各務原市", "多治見市"],
  三重: ["四日市市", "津市", "鈴鹿市", "松阪市"],
  滋賀: ["大津市", "草津市", "彦根市"],
  奈良: ["奈良市", "橿原市", "生駒市"],
  和歌山: ["和歌山市", "田辺市", "紀の川市"],
  岡山: ["岡山市北区", "倉敷市", "津山市"],
  山口: ["下関市", "山口市", "宇部市", "周南市"],
  徳島: ["徳島市", "阿南市"],
  香川: ["高松市", "丸亀市"],
  愛媛: ["松山市", "今治市", "新居浜市"],
  高知: ["高知市", "南国市"],
  佐賀: ["佐賀市", "唐津市"],
  長崎: ["長崎市", "佐世保市", "諫早市"],
  熊本: ["熊本市中央区", "八代市", "玉名市"],
  大分: ["大分市", "別府市", "中津市"],
  宮崎: ["宮崎市", "都城市", "延岡市"],
  鹿児島: ["鹿児島市", "霧島市", "鹿屋市"],
  沖縄: ["那覇市", "沖縄市", "宜野湾市", "浦添市"],
};

const csvPath =
  "app/area/localgovlistjp-master/localgovlistjp-master/localgov_utf8_lf.csv";
const content = fs.readFileSync(csvPath, "utf8");
const lines = content.split("\n");
const csvMap = {};

lines.forEach((line) => {
  if (!line.trim()) return;
  const parts = line.split(",");
  if (parts.length < 3) return;
  const prefKey = parts[0].replace(/[都府県]$/, "");
  if (!csvMap[prefKey]) csvMap[prefKey] = [];
  csvMap[prefKey].push(parts[2]);
});

const finalMap = {};
// Prefectures typically used in the app (from constants PREFECTURE_CODE_MAP)
const allPrefs = [
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄",
];

allPrefs.forEach((pref) => {
  if (oldData[pref]) {
    finalMap[pref] = oldData[pref];
  } else if (csvMap[pref]) {
    // If not in old data, use CSV but filter for "City" only if there are many entries
    // Usually "町村" are too granular for this map.
    let cities = csvMap[pref].filter(
      (c) => c.endsWith("市") || c.endsWith("区"),
    );
    if (cities.length === 0) cities = csvMap[pref]; // fallback if only towns
    // Limit to 24 for UI consistency if needed, but let's keep more if they are cities
    finalMap[pref] = cities.slice(0, 30);
  } else {
    console.log("Missing data for:", pref);
  }
});

let output = "export const MUNICIPALITIES_DATA: Record<string, string[]> = {\n";
Object.keys(finalMap)
  .sort()
  .forEach((pref) => {
    output += `  "${pref}": [\n`;
    const cities = finalMap[pref];
    cities.forEach((city, index) => {
      output += `    "${city}",${(index + 1) % 4 === 0 ? "\n" : " "}`;
    });
    if (cities.length % 4 !== 0) output += "\n";
    output += `  ],\n`;
  });
output += "};\n";

fs.writeFileSync("scripts/merged_municipalities.ts", output);
console.log("Generated scripts/merged_municipalities.ts");
