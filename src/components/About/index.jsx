import React, { useRef } from 'react';
import styles from './About.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate content container
    gsap.fromTo('.about-content', 
      {
        y: 40,
        scale: 0.9,
        opacity: 0
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
        duration: 1,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(`.${styles.statCard}`,
      {
        y: 30,
        scale: 0.5,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: `.${styles.stats}`,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        },
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      }
    );
  }, { scope: containerRef });

  return (
    <section id="about" className={styles.about} ref={containerRef}>
      <h2 className="section-title"><span>01.</span> About Me</h2>
      
      <div className={`about-content ${styles.content}`}>
        <div className={styles.bio}>
          <p>{portfolio.about}</p>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>2025</div>
            <div className={styles.statLabel}>Started B.Tech</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>3</div>
            <div className={styles.statLabel}>Projects Shipped</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>91.6%</div>
            <div className={styles.statLabel}>Intermediate Score</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
