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
    const categories = gsap.utils.toArray('.skill-category');
    
    categories.forEach(category => {
      gsap.fromTo(category.querySelectorAll('.skill-item'), 
        {
          y: 20,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: category,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
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
                    src={`https://cdn.simpleicons.org/${item.icon}/00d4ff`} 
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
