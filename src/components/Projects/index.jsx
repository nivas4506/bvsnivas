import { useRef } from 'react';
import styles from './Projects.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  const openSourceRepo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useGSAP(() => {
    gsap.fromTo(`.${styles.card}`,
      {
        y: 40,
        scale: 0.8,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
      }
    );
  }, { scope: containerRef });

  return (
    <section id="projects" className={styles.projects} ref={containerRef}>
      <h2 className="section-title"><span>05.</span> Projects</h2>
      
      <div className={styles.grid}>
        {portfolio.projects.map((project, index) => (
          <div key={index} className={`project-card ${styles.card}`}>
            <div className={styles.cardHeader}>
              <div className={styles.folder}>📁</div>
              <div className={styles.links}>
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} source repository`}
                    onClick={(event) => {
                      event.preventDefault();
                      openSourceRepo(project.sourceUrl);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                )}
              </div>
            </div>
            
            <h3>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
            
            <div className={styles.techStack}>
              {project.tech.map((t, i) => (
                <span key={i} className={styles.techPill}>
                  <img 
                    src={t.icon.includes(':') 
                      ? `https://api.iconify.design/${t.icon.replace(':', '/')}.svg${t.icon.startsWith('simple-icons') ? '?color=%2300d4ff' : ''}`
                      : `https://api.iconify.design/simple-icons/${t.icon}.svg?color=%2300d4ff`
                    } 
                    alt={t.name} 
                    width="14" 
                    height="14" 
                  />
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
