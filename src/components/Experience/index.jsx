import React, { useRef } from 'react';
import styles from './Experience.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    // Progress line animation
    gsap.fromTo(progressRef.current, 
      { height: 0 },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: `.${styles.timeline}`,
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    const items = gsap.utils.toArray(`.${styles.timelineItem}`);
    
    items.forEach((item, i) => {
      const content = item.querySelector(`.${styles.timelineContent}`);
      const dot = item.querySelector(`.${styles.timelineDot}`);
      
      gsap.fromTo(content, 
        {
          y: 40,
          scale: 0.8,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.4)',
        }
      );

      gsap.to(dot, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleClass: { targets: dot, className: styles.active },
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section id="education" className={`${styles.experience} experience-content`} ref={containerRef}>
      <h2 className="section-title"><span>02.</span> Education</h2>
      
      <div className={styles.timeline}>
        <div className={styles.progressLine} ref={progressRef}></div>
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
