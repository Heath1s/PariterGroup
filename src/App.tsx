import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Tagline from './components/Tagline';
import Workday from './components/Workday';
import Approach from './components/Approach';
import Capabilities from './components/Capabilities';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollTrigger } from './lib/gsap';

export default function App() {
  useSmoothScroll();

  // Web fonts settle after first paint and can shift pinned measurements;
  // recompute ScrollTrigger once they're ready.
  useEffect(() => {
    if (!('fonts' in document)) return;
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Tagline />
        <Workday />
        <Approach />
        <Capabilities />
        <Testimonials />
        <About />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
