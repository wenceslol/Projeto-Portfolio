import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { useEffect, useRef } from 'react';
import ParticlesNetwork from './components/ParticlesNetwork';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

const parallaxBgRef = useRef<HTMLDivElement>(null);
const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    mousePos.current = { x: event.clientX, y: event.clientY };
  };

  const animateParallax = () => {
    if (parallaxBgRef.current) {
      const scale = 10;
      const speed = parseFloat(parallaxBgRef.current.getAttribute('data-speed') || '0.3');
      const offsetX = (window.innerWidth / 2 - mousePos.current.x) * speed / scale;
      const offsetY = (window.innerHeight / 2 - mousePos.current.y) * speed / scale;
      
      parallaxBgRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    requestAnimationFrame(animateParallax);
  };

  window.addEventListener('mousemove', handleMouseMove);
  requestAnimationFrame(animateParallax);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

  return (
    <div className="body">
      
      <div 
        ref={parallaxBgRef} 
        className="parallax-bg" 
        data-speed="0.3"
      >
      <ParticlesNetwork></ParticlesNetwork>
      </div>
      
      <div className='content'>
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
        <Header setActiveSection={setActiveSection}></Header>
        <About setActiveSection={setActiveSection} />
        <Projects setActiveSection={setActiveSection} />
        <Contact setActiveSection={setActiveSection} />
        <Footer />
        {/* Descomente os outros componentes quando necessário */}
        {/* <Header setActiveSection={setActiveSection} />
        <About setActiveSection={setActiveSection} />
        <Projects setActiveSection={setActiveSection} />
        <Skills setActiveSection={setActiveSection} />
        <Contact setActiveSection={setActiveSection} />
        <Footer /> */}
      </div>
    </div>
  );
}

export default App;