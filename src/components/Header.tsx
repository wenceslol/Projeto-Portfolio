import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/header.css';
import type { SectionProp } from './Types';
import { useEffect } from 'react';
import spotifyimg from '../assets/spotify.png'


const Header = ({ setActiveSection }: SectionProp) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('home');
    }
  }, [inView, setActiveSection])

  const spotify = "https://open.spotify.com/track/0FDzzruyVECATHXKHFs9eJ"

  return (
    <section id="home" className="header-section" ref={ref}>

      
      
      
      <div className="header-content">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="header-text"
        >
          <div className='music-container'>
            <a className='teste' href={spotify} target="_blank" rel="noopener noreferrer">
              <img className='music' src={spotifyimg}></img>
            </a>
          </div>
          

          <h1><span>Thiago Wenceslau</span></h1>
          <div className='texto-container'>
            <h2>Desenvolvedor <span className='subtext'>Full Stack</span></h2>

          </div>

          <div>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" alt="postgresql logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" height="40" alt="android logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" alt="figma logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="40" alt="python logo"  />
            <img width="12" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" height="40" alt="lua logo"  />
          </div>

          <div className="header-buttons">
            <a href="#contact" className="btn btn-primary">Contato</a>
            <a href="#projects" className="btn btn-secondary">Projetos</a>
          </div>
        </motion.div>
        
        {/*<motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="header-image"
        >

          
          <img src="/assets/profile.jpg" alt="Profile" />
        </motion.div>*/}
      </div>
    </section>
  );
};

export default Header;