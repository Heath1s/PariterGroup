import { chromium } from 'playwright';

const BASE = process.env.URL || 'http://localhost:4180/PariterGroup/';
const dir = 'verify-screenshots';
const browser = await chromium.launch();

async function shoot(name, { width, height, fullPage = false, scrollTo = null, wait = 700 }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  await page.waitForTimeout(wait);
  if (scrollTo != null) {
    if (typeof scrollTo === 'string') {
      await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 12);
      }, scrollTo);
    } else {
      await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    }
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: `${dir}/${name}.png`, fullPage });
  await ctx.close();
  console.log('shot', name);
}

await shoot('day-desktop-hero', { width: 1440, height: 900 });
await shoot('day-desktop-problem', { width: 1440, height: 900, scrollTo: 1050 });
await shoot('day-desktop-trust', { width: 1440, height: 900, scrollTo: '#security' });
await shoot('day-desktop-contact', { width: 1440, height: 900, scrollTo: '#contact' });
await shoot('day-mobile-hero2', { width: 390, height: 844, scrollTo: 360 });

await browser.close();
console.log('done');
