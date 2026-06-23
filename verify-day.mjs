import { chromium } from 'playwright';

const BASE = process.env.URL || 'http://localhost:4180/';
const dir = 'verify-screenshots';
const browser = await chromium.launch();

async function shoot(name, url, { width = 1440, height = 900, fullPage = false, wait = 900 } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${dir}/${name}.png`, fullPage });
  await ctx.close();
  console.log('shot', name, url);
}

await shoot('cms-home', BASE);
await shoot('cms-home-mobile', BASE, { width: 390, height: 844 });
await shoot('cms-admin', BASE + 'admin/', { wait: 3000 });

await browser.close();
console.log('done');
