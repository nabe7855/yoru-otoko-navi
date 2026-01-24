const fs = require("fs");
const content = fs.readFileSync("components/MapData.ts", "utf8");

const slots = {
  北海道: "A",
  青森: "A",
  岩手: "B",
  秋田: "C",
  宮城: "D",
  山形: "A",
  福島: "B",
  茨城: "A",
  栃木: "B",
  群馬: "C",
  埼玉: "D",
  千葉: "A",
  東京: "B",
  神奈川: "C",
  新潟: "A",
  富山: "B",
  石川: "D",
  福井: "C",
  山梨: "B",
  長野: "A",
  岐阜: "D",
  静岡: "C",
  愛知: "B",
  三重: "A",
  滋賀: "B",
  京都: "D",
  大阪: "C",
  兵庫: "B",
  奈良: "A",
  和歌山: "D",
  鳥取: "A",
  島根: "B",
  岡山: "D",
  広島: "C",
  山口: "B",
  徳島: "A",
  香川: "B",
  愛媛: "D",
  高知: "C",
  福岡: "A",
  佐賀: "B",
  長崎: "D",
  熊本: "C",
  大分: "B",
  宮崎: "A",
  鹿児島: "D",
  沖縄: "A",
};

let updatedContent = content;

Object.keys(slots).forEach((name) => {
  const slot = slots[name];
  // Match the pattern name: "Name" followed by anything until bbox: { ... } and add colorSlot after it.
  const regex = new RegExp(
    `(name:\\s*"${name}"[\\s\\S]*?bbox:\\s*{[\\s\\S]*?})`,
    "g",
  );
  updatedContent = updatedContent.replace(
    regex,
    `$1,\n        colorSlot: "${slot}"`,
  );
});

// Remove any double commas if they occurred
updatedContent = updatedContent.replace(
  /colorSlot:\s*"(.)",\s*,/g,
  'colorSlot: "$1",',
);

fs.writeFileSync("components/MapData.ts", updatedContent);
console.log("Updated MapData.ts with color slots using robust regex");
