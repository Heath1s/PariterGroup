import Nav from './components/Nav';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Approach from './components/Approach';
import Capabilities from './components/Capabilities';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
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
