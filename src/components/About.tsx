import { useInView } from 'react-intersection-observer';
import '../styles/about.css';
import type { SectionProp } from './Types';
import { useEffect } from 'react';

const About = ({ setActiveSection }: SectionProp) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('about');
    }
  }, [inView, setActiveSection])
  

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Sobre Mim</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Sou um desenvolvedor full stack apaixonado por criar apps bonitos e funcionais. 
              Tenho experiência em React Native, Typescript, Node.js, PostgreSQL e outras tecnologias web.
            </p>
            <p>
              Minha carreira na programação começou em 2024 e desde então venho me dedicando 
              a aprender e melhorar minhas habilidades diariamente.
            </p>
            <p>
              Quando não estou codando, gosto de jogar, ouvir música e praticar musculação.
            </p>
          </div>
          <div className="about-skills">
            <h3>Minhas Habilidades</h3>
            <ul>
              <li>React JS</li>
              <li>React Native</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>HTML5 & CSS3</li>
              <li>Node.js</li>
              <li>PostgreSQL</li>
              <li>Git & GitHub</li>
              <li>Responsive Design</li>
              <li>UI/UX Basics</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;