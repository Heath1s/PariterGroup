/* Scroll-through verification of the Workday scrub: screenshots at fixed
   progress fractions through the pinned section, plus mobile + reduced. */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = process.env.URL || 'http://localhost:5199/';
const DIR = './verify-screenshots/workday';
mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

const errors = [];

async function newPage(opts = {}) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    ...opts,
  });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem('noSmooth', '1'));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200); // fonts + ScrollTrigger refresh
  return { ctx, page };
}

// ── Desktop scrub walk ───────────────────────────────────────────────────────
{
  const { ctx, page } = await newPage();
  const box = await page.evaluate(() => {
    const el = document.querySelector('#story');
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight, vh: window.innerHeight };
  });
  const span = box.height - box.vh;
  const fracs = [0, 0.03, 0.07, 0.10, 0.13, 0.17, 0.21, 0.26, 0.32, 0.38, 0.44, 0.50, 0.56, 0.62, 0.68, 0.74, 0.80, 0.84, 0.88, 0.92, 0.96, 1.0];
  for (const f of fracs) {
    await page.evaluate(({ y }) => window.scrollTo(0, y), { y: box.top + span * f });
    await page.waitForTimeout(650); // let scrub smoothing settle
    await page.screenshot({ path: `${DIR}/d-${String(Math.round(f * 100)).padStart(3, '0')}.png` });
  }
  console.log('desktop walk done, section height:', box.height, 'vh:', box.vh);
  await ctx.close();
}

// ── Mobile timeline ──────────────────────────────────────────────────────────
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 } });
  const stops = await page.evaluate(() => {
    const el = document.querySelector('#story');
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: el.offsetHeight };
  });
  for (let i = 0; i < 5; i++) {
    await page.evaluate(({ y }) => window.scrollTo(0, y), { y: stops.top - 90 + (stops.height / 5) * i });
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${DIR}/m-${i}.png` });
  }
  console.log('mobile walk done');
  await ctx.close();
}

// ── Reduced motion (static, complete) ────────────────────────────────────────
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await page.evaluate(() => document.querySelector('#story').scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${DIR}/reduced.png` });
  await ctx.close();
}

await browser.close();
console.log(errors.length ? `CONSOLE ERRORS:\n${errors.join('\n')}` : 'no console errors');
