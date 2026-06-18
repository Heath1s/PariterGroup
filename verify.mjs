import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const DIR = './verify-screenshots';
mkdirSync(DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push(err.message));

// ── Step 1: Load ─────────────────────────────────────────────────────────────
console.log('Step 1: Loading http://localhost:5173...');
await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${DIR}/01-full-page.png`, fullPage: true });
console.log('  ✅ Page loaded.');

// ── Step 2: Nav ───────────────────────────────────────────────────────────────
console.log('Step 2: Checking sticky nav...');
const navHeader = await page.locator('header[role="banner"]');
const logoText = await navHeader.locator('a[aria-label*="home"]').textContent();
const ctaBtn   = await navHeader.locator('a[href="#contact"]').last().textContent();
const navLinks = await navHeader.locator('nav a').allTextContents();
console.log(`  Logo text: "${logoText?.trim()}"`);
console.log(`  CTA: "${ctaBtn?.trim()}"`);
console.log(`  Links: ${JSON.stringify(navLinks)}`);
await page.screenshot({ path: `${DIR}/02-nav.png`, clip: { x:0, y:0, width:1280, height:70 } });

// ── Step 3: Hero ──────────────────────────────────────────────────────────────
console.log('Step 3: Checking hero...');
const heroH1   = await page.locator('h1#hero-heading').textContent();
const heroCtas = await page.locator('section a').allTextContents();
console.log(`  H1: "${heroH1?.trim()}"`);
console.log(`  Hero section links: ${JSON.stringify(heroCtas.slice(0,4))}`);
await page.screenshot({ path: `${DIR}/03-hero.png`, clip: { x:0, y:64, width:1280, height:580 } });

// ── Step 4: Problem (dark section) ───────────────────────────────────────────
console.log('Step 4: Checking Problem section...');
const probH2  = await page.locator('h2#problem-heading').textContent();
const probBg  = await page.$eval('h2#problem-heading', el =>
  getComputedStyle(el.closest('section')).backgroundColor
);
console.log(`  Heading: "${probH2?.trim()}"`);
console.log(`  Section bg: ${probBg}`);
await page.locator('#problem-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: `${DIR}/04-problem.png` });

// ── Step 5: Approach ─────────────────────────────────────────────────────────
console.log('Step 5: Checking Approach steps...');
await page.locator('#approach').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const approachH2 = await page.locator('h2#approach-heading').textContent();
const stepTitles = await page.locator('#approach h3').allTextContents();
const stepNums   = await page.locator('#approach ol li span:first-child').allTextContents();
console.log(`  Heading: "${approachH2?.trim()}"`);
console.log(`  Steps (${stepTitles.length}): ${JSON.stringify(stepTitles)}`);
console.log(`  Step nums: ${JSON.stringify(stepNums)}`);
await page.screenshot({ path: `${DIR}/05-approach.png` });

// ── Step 6: Capabilities ──────────────────────────────────────────────────────
console.log('Step 6: Checking Capabilities grid...');
await page.locator('#capabilities').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const capH2    = await page.locator('h2#cap-heading').textContent();
const capCards = await page.locator('#capabilities li h3').allTextContents();
console.log(`  Heading: "${capH2?.trim()}"`);
console.log(`  Cards (${capCards.length}): ${JSON.stringify(capCards)}`);
await page.screenshot({ path: `${DIR}/06-capabilities.png` });

// ── Step 7: About ─────────────────────────────────────────────────────────────
console.log('Step 7: Checking About section...');
await page.locator('#about').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const aboutH2 = await page.locator('h2#about-heading').textContent();
console.log(`  Heading: "${aboutH2?.trim()}"`);
await page.screenshot({ path: `${DIR}/07-about.png` });

// ── Step 8: Contact form — empty submit (validation) ─────────────────────────
console.log('Step 8: Testing form validation (empty submit)...');
await page.locator('#contact').scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
await page.screenshot({ path: `${DIR}/08-contact-empty.png` });
await page.locator('#contact button[type="submit"]').click();
await page.waitForTimeout(300);
const nameErr  = await page.locator('#name-error').textContent().catch(() => null);
const emailErr = await page.locator('#email-error').textContent().catch(() => null);
console.log(`  Name error shown: "${nameErr}"`);
console.log(`  Email error shown: "${emailErr}"`);
await page.screenshot({ path: `${DIR}/09-contact-validation.png` });

// ── Step 9: Fill and submit form ──────────────────────────────────────────────
console.log('Step 9: Filling and submitting form...');
await page.fill('#name',    'Jane Smith');
await page.fill('#company', 'Apex Distribution Co.');
await page.fill('#email',   'jane@apexdist.com');
await page.fill('#message', 'Our team spends 2 hrs a day copying orders into QuickBooks.');
await page.screenshot({ path: `${DIR}/10-contact-filled.png` });
await page.locator('#contact button[type="submit"]').click();
await page.waitForTimeout(1500);
const successEl = await page.locator('[role="status"]').textContent().catch(() => null);
console.log(`  Success state text: "${successEl?.trim().slice(0, 80)}"`);
await page.screenshot({ path: `${DIR}/11-contact-success.png` });

// ── Step 10: Footer ───────────────────────────────────────────────────────────
console.log('Step 10: Checking footer...');
await page.locator('footer[role="contentinfo"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(200);
const footerEmail = await page.locator('footer a[href^="mailto"]').textContent();
const footerText  = await page.locator('footer').textContent();
console.log(`  Email link: "${footerEmail?.trim()}"`);
console.log(`  Footer contains "Side by side": ${footerText?.includes('Side by side')}`);
await page.screenshot({ path: `${DIR}/12-footer.png` });

// ── Probe: Nav scrolls to section ────────────────────────────────────────────
console.log('🔍 Probe: clicking nav "Approach" link...');
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.locator('header nav a[href="#approach"]').click();
await page.waitForTimeout(600);
const scrollY = await page.evaluate(() => window.scrollY);
console.log(`  scrollY after clicking Approach: ${scrollY}px (expected > 200)`);

// ── Probe: Mobile ─────────────────────────────────────────────────────────────
console.log('🔍 Probe: mobile 375px viewport...');
await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(600);
await page.screenshot({ path: `${DIR}/13-mobile.png` });
const hamburger = await page.locator('button[aria-label*="menu"]').isVisible();
console.log(`  Hamburger visible: ${hamburger}`);
await page.locator('button[aria-label*="menu"]').click();
await page.waitForTimeout(300);
await page.screenshot({ path: `${DIR}/14-mobile-menu-open.png` });

// ── Console errors ────────────────────────────────────────────────────────────
console.log(`\nConsole errors: ${consoleErrors.length === 0 ? 'None ✅' : JSON.stringify(consoleErrors)}`);

await browser.close();
console.log('\nScreenshots saved to ./verify-screenshots/');
