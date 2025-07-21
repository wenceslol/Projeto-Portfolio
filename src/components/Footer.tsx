import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import '../styles/footer.css';

const Footer = () => {

  const links = {
    googleAPI: "https://script.google.com/macros/s/AKfycbzK9ZB5J-6_C5fztxIOGo_TnalLbszVAva3yn3yRoE8QduY4nY8TLRBbh7sJlBghbKd/exec",
    email: "mailto:wences.dev@gmail.com",
    linkedin: "https://www.linkedin.com/in/thiago-wenceslau/",
    github: "https://github.com/wenceslol/",
    whatsapp: "https://wa.me/5519988053938?text=Ol%C3%A1%20Thiago%20Wenceslau,%20vi%20seu%20portfolio%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os."
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Thiago Wenceslau</h3>
            <p>Desenvolvedor Full Stack</p>
          </div>
          
          <div className="footer-links">
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#about">Sobre</a></li>
              <li><a href="#projects">Projetos</a></li>
              <li><a href="#contact">Contato</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon" />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Wences.dev. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;