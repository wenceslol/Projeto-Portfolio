import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import '../styles/contact.css';
import type { SectionProp } from './Types';
import { useState, useEffect } from 'react';

const Contact = ({ setActiveSection }: SectionProp) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('contact');
    }
  }, [inView, setActiveSection])

  const links = {
    googleAPI: "https://script.google.com/macros/s/AKfycbzK9ZB5J-6_C5fztxIOGo_TnalLbszVAva3yn3yRoE8QduY4nY8TLRBbh7sJlBghbKd/exec",
    email: "mailto:wences.dev@gmail.com",
    linkedin: "https://www.linkedin.com/in/thiago-wenceslau/",
    github: "https://github.com/wenceslol/",
    whatsapp: "https://wa.me/5519988053938?text=Ol%C3%A1%20Thiago%20Wenceslau,%20vi%20seu%20portfolio%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os."
  }

  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(e.currentTarget) as unknown as FormData;

    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: new URLSearchParams(formData as any),
      });

      if (!response.ok) throw new Error('Erro no servidor');

      setStatus({ message: 'Mensagem enviada com sucesso!', isError: false });
      form.reset();
    } catch (error) {
      console.log(error, import.meta.env.VITE_GOOGLE_SCRIPT_URL)
      setStatus({ message: 'Erro ao enviar mensagem. Tente novamente.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Entre em Contato</h2>
        
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="contact-info">
            <h3>Vamos trabalhar juntos!</h3>
            <p>
              Estou aberto a oportunidades de trabalho freelance ou em tempo integral. 
              Se você tem um projeto que deseja começar ou apenas quer dizer olá, entre em contato pelas redes sociais abaixo:
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                
                <a className='contact-icons' href={links.email}>
                  <FaEnvelope  className="contact-icon"/>
                  <span>wences.dev@gmail.com</span>
                </a>
                
              </div>
            </div>
            
            <div className="social-links">
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
          
          <form onSubmit={handleSubmit} className="contact-form" >
            <div className="form-group">
              <input type="text" name='nome' placeholder="Seu Nome" required />
            </div>
            <div className="form-group">
              <input type="email" name='email' placeholder="Seu Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Sua Mensagem" name='mensagem' rows={5} required></textarea>
            </div>
            <div className='form-container'>
              <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </button>
              {status && (
                <span id="formStatus" className='form-status'>
                  {status.message}
                </span>
              )}
            </div>
            
            
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;