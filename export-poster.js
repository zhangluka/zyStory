#!/usr/bin/env node
/**
 * 将 bachelor-party-poster.html 导出为 PNG 图片
 * 运行: npx puppeteer node export-poster.js
 */
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const htmlPath = path.resolve(__dirname, 'bachelor-party-poster.html');
const outPath = path.resolve(__dirname, 'bachelor-party-poster.png');

if (!fs.existsSync(htmlPath)) {
  console.error('未找到 bachelor-party-poster.html');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 500, height: 1200, deviceScaleFactor: 2 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  const el = await page.$('.poster');
  if (el) {
    await el.screenshot({ path: outPath });
  } else {
    await page.screenshot({ path: outPath });
  }
  await browser.close();
  console.log('已导出:', outPath);
})();
