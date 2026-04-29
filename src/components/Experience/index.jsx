import React, { useRef } from 'react';
import styles from './Experience.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.timeline-item');
    
    items.forEach((item, i) => {
      gsap.fromTo(item, 
        {
          x: -30,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleClass: { targets: item, className: styles.active }
          },
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="education" className={styles.experience} ref={containerRef}>
      <h2 className="section-title"><span>02.</span> Education</h2>
      
      <div className={styles.timeline}>
        {portfolio.education.map((edu, index) => (
          <div key={index} className={`timeline-item ${styles.timelineItem}`}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.year}>{edu.year}</div>
              <h3>{edu.degree}</h3>
              <div className={styles.institution}>{edu.institution}</div>
              <ul className={styles.highlights}>
                {edu.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
