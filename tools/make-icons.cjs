// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、重ねた書類と時計（書類をとっておく年数）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <rect x="24" y="18" width="46" height="62" rx="4" fill="#fffdf7"/><rect x="32" y="12" width="46" height="62" rx="4" fill="#f6d77a"/>
      <path d="M40 28 H70 M40 38 H70 M40 48 H62" stroke="#123554" stroke-width="4"/><circle cx="70" cy="70" r="14" fill="#f2a43a"/><path d="M70 62 V70 L76 74" stroke="#123554" stroke-width="3" fill="none"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
