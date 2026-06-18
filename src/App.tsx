import Nav from './components/Nav';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Approach from './components/Approach';
import Capabilities from './components/Capabilities';
import WhoWeServe from './components/WhoWeServe';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Approach />
        <Capabilities />
        <WhoWeServe />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
