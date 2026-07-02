import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

// Injects a static, semantic copy of the page content into #root at build
// time, generated from src/content/*.json (the same files the React app and
// Decap CMS use). React clears and replaces it on mount; crawlers that don't
// run JavaScript (Bing's analyzer, LLM crawlers) read the real copy instead
// of an empty div.

const contentDir = fileURLToPath(new URL('./src/content/', import.meta.url))
const read = (name: string) => JSON.parse(readFileSync(contentDir + name + '.json', 'utf8'))

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function buildShell(): string {
  const hero = read('hero')
  const tagline = read('tagline')
  const problem = read('problem')
  const workday = read('workday')
  const approach = read('approach')
  const caps = read('capabilities')
  const testimonials = read('testimonials')
  const trust = read('trust')
  const about = read('about')
  const contact = read('contact')
  const general = read('general')

  const nav = (general.navLinks ?? [])
    .map((l: { label: string; href: string }) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`)
    .join(' · ')

  return `
    <div style="max-width:720px;margin:0 auto;padding:48px 24px;font-family:'Newsreader',Georgia,serif;line-height:1.6">
      <header>
        <strong>Pariter Group</strong>
        <nav>${nav}</nav>
      </header>
      <main>
        <h1>${esc(hero.headline)}</h1>
        <p>${esc(hero.sub)}</p>
        <p>${esc(tagline.text)} ${esc(tagline.accent)}</p>
        <section>
          <h2>${esc(problem.heading)}</h2>
          <p>${esc(problem.body)}</p>
          <p>${esc(problem.close)}</p>
        </section>
        <section>
          <h2>${esc(workday.heading)}</h2>
          <p>${esc(workday.sub)}</p>
          <ul>
            ${(workday.steps ?? []).map((s: any) => `<li>${esc(s.time)} — ${esc(s.caption)}</li>`).join('\n            ')}
          </ul>
        </section>
        <section>
          <h2>${esc(approach.heading)}</h2>
          <p>${esc(approach.sub)}</p>
          ${(approach.steps ?? []).map((s: any) => `<h3>${esc(s.title)}</h3><p>${esc(s.body)}</p>`).join('\n          ')}
        </section>
        <section>
          <h2>${esc(caps.heading)}</h2>
          <p>${esc(caps.sub)}</p>
          ${(caps.items ?? []).map((i: any) => `<h3>${esc(i.title)}</h3><p>${esc(i.body)}</p>`).join('\n          ')}
          <h3>${esc(caps.vision?.heading)}</h3>
          <p>${esc(caps.vision?.body)}</p>
          <p>${esc(caps.vision?.pull)}</p>
          ${(caps.alternatives?.items ?? []).map((i: any) => `<p>${esc(i.body)}</p>`).join('\n          ')}
        </section>
        <section>
          <h2>${esc(testimonials.heading)}</h2>
          <p>${esc(testimonials.note)}</p>
          ${(testimonials.quotes ?? [])
            .map(
              (q: any) =>
                `<blockquote><p>${esc(q.body)}</p><footer>${esc(q.who)}, ${esc(q.where)} — ${esc(q.result)}</footer></blockquote>`,
            )
            .join('\n          ')}
        </section>
        <section>
          <h2>${esc(trust.heading)}</h2>
          <p>${esc(trust.sub)}</p>
          ${(trust.points ?? []).map((p: any) => `<h3>${esc(p.t)}</h3><p>${esc(p.b)}</p>`).join('\n          ')}
        </section>
        <section>
          <h2>${esc(about.heading)}</h2>
          <p>${esc(about.body1)}</p>
          <p>${esc(about.body2)}</p>
          <p>${esc(about.pull)}</p>
          <h3>${esc(about.who?.heading)}</h3>
          <p>${esc(about.who?.body)}</p>
        </section>
        <section>
          <h2>${esc(contact.introHeading)}</h2>
          <p>${esc(contact.introBody)}</p>
          <p>Contact: <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></p>
        </section>
      </main>
      <footer>
        <p>${esc(general.footerTagline)} ${esc(general.footerBottom)}</p>
        <p>${esc(general.footerLegal1)} ${esc(general.footerLegal2)}</p>
      </footer>
    </div>`
}

export default function seoShell(): Plugin {
  return {
    name: 'seo-shell',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace('<div id="root"></div>', `<div id="root">${buildShell()}\n    </div>`)
    },
  }
}
