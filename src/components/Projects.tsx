import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import '../styles/projects.css';
import AppTreino1 from '../assets/AppTreino1.png'
import AppTreino2 from '../assets/AppTreino2.png'
import type { SectionProp } from './Types';
import { ImageWithModal } from './ImageWithModal';
import { useEffect } from 'react';

const Projects = ({ setActiveSection }: SectionProp) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('projects');
    }
  }, [inView, setActiveSection])

  const projects = [
    {
      id: 1,
      title: "Controle de Treino",
      description: "App mobile para controle de rotinas de treino e métricas de gasto calórico.",
      technologies: ["React Native", "Typescript", "Node.js", "Express", "PostgreSQL"],
      image: [AppTreino1, AppTreino2],
      link: "https://www.linkedin.com/posts/thiago-wenceslau_reactnative-nodejs-postgresql-activity-7352033038215614464-A3bn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFrvTEsBBCaGYUvhxeWlrHs2d0ApelKVklQ",
      github: "https://github.com/wenceslol/Projeto-Treino"
    },
    /*{
      id: 2,
      title: "Projeto 2",
      description: "Descrição breve do projeto e tecnologias utilizadas.",
      technologies: ["React", "Firebase", "CSS Modules"],
      image: ["/assets/project2.jpg"],
      link: "#",
      github: "#"
    },*/
    // Adicione mais projetos conforme necessário
  ];

  

  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Meus Projetos</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="project-image gallery">
                {project.image.map((image, i) => (
                  <ImageWithModal 
                  key={i}
                  src={image} 
                  alt=""
                  className='gallery-image'
                  >
                  </ImageWithModal>
                  
                  
                ))}
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Ver Projeto
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Código Fonte
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;