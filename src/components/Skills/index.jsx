import React, { useRef } from 'react';
import styles from './Skills.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const isMobile = window.innerWidth <= 768;
    const categories = gsap.utils.toArray('.skill-category');
    
    categories.forEach(category => {
      const items = category.querySelectorAll('.skill-item');
      
      gsap.fromTo(items, 
        {
          y: 30,
          scale: 0.7,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: category,
            start: isMobile ? 'top 95%' : 'top 85%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          force3D: true,
        }
      );
    });
  }, { scope: containerRef, dependencies: [portfolio.skills] });

  return (
    <section id="skills" className={styles.skills} ref={containerRef}>
      <h2 className="section-title"><span>03.</span> Skills</h2>
      
      <div className={styles.categories}>
        {portfolio.skills.map((category, index) => (
          <div key={index} className={`skill-category ${styles.category}`}>
            <h3 className={styles.categoryTitle}>{category.category}</h3>
            <div className={styles.items}>
              {category.items.map((item, i) => (
                <div key={i} className={`skill-item ${styles.item}`}>
                  <img 
                    src={item.icon.includes(':') 
                      ? `https://api.iconify.design/${item.icon.replace(':', '/')}.svg${item.icon.startsWith('simple-icons') ? '?color=%2300d4ff' : ''}`
                      : `https://api.iconify.design/simple-icons/${item.icon}.svg?color=%2300d4ff`
                    } 
                    alt={item.name} 
                    className={styles.icon}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
