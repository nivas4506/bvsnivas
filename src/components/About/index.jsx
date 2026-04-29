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
    gsap.fromTo('.about-content', 
      {
        y: 30,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
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
