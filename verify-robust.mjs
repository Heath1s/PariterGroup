import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });

// Mobile 375
const m = await b.newPage({ viewport: { width: 375, height: 812 } });
await m.goto('http://localhost:5183', { waitUntil: 'networkidle' });
await m.waitForTimeout(800);
await m.screenshot({ path: 'verify-screenshots/it-m-hero.png' });
await m.locator('button[aria-label*="menu"]').click();
await m.waitForTimeout(300);
await m.screenshot({ path: 'verify-screenshots/it-m-menu.png' });
// scroll to the arrival on mobile
await m.locator('#contact').scrollIntoViewIfNeeded();
await m.waitForTimeout(600);
await m.screenshot({ path: 'verify-screenshots/it-m-arrival.png' });
await m.close();

// Reduced motion — must render fully in-true (--reg = 1), no movement
const r = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await r.goto('http://localhost:5183', { waitUntil: 'networkidle' });
await r.waitForTimeout(600);
const heroReg = await r.evaluate(() =>
  getComputedStyle(document.querySelector('#top')).getPropertyValue('--reg'),
);
console.log('reduced-motion hero --reg at load (want 1):', heroReg.trim());
await r.screenshot({ path: 'verify-screenshots/it-reduced-hero.png', clip: { x: 0, y: 0, width: 1440, height: 860 } });
await r.close();

await b.close();
console.log('done');
