import Nav from './components/Nav';
import Hero from './components/Hero';
import Positioning from './components/Positioning';
import Features from './components/Features';
import Process from './components/Process';
import Trust from './components/Trust';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Features />
        <Process />
        <Trust />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
