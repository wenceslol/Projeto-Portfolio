import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import '../styles/navbar.css';
import type { MyProps } from './Types';
import orchid from '../assets/orchid.png'

const Navbar = ({ activeSection, setActiveSection }: MyProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    //{ id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        <Link 
          to="home" 
          smooth={true} 
          duration={0} 
          
          className="navbar-logo"
          onClick={() => setActiveSection('home')}
        >
          <img src={orchid} className='orchid'></img>
          <span className='nome'>Wences.dev</span>
          
        </Link>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.id}
                smooth={true}
                duration={0}
                
                className={`nav-links ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setIsOpen(false);
                }}
                onSetActive={(section) => setActiveSection(section)}
                activeClass="active"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;