import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
// We use global window.VANTA loaded via CDN to avoid Vite module bundling issues with Three.js
const effectsList = ['NET', 'WAVES', 'FOG', 'BIRDS', 'GLOBE', 'RINGS'];

const Hero = () => {
  const [currentEffect, setCurrentEffect] = useState('NET');
  const [isShockwave, setIsShockwave] = useState(false);
  
  const vantaEffectRef = useRef(null);
  const myRef = useRef(null);
  const contentRef = useRef(null);

  // Initialize Vanta
  useEffect(() => {
    if (vantaEffectRef.current) {
      vantaEffectRef.current.destroy();
    }
    
    if (window.VANTA && window.VANTA[currentEffect] && myRef.current) {
      try {
        const effectOptions = {
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
        };

        // Custom colors for different effects to match theme
        if (currentEffect === 'NET') {
          effectOptions.color = 0x00d4ff;
          effectOptions.backgroundColor = 0x0a0a0f;
        } else if (currentEffect === 'WAVES') {
          effectOptions.color = 0x0a0a0f;
          effectOptions.waveHeight = 20;
          effectOptions.waveSpeed = 0.5;
        } else if (currentEffect === 'FOG') {
          effectOptions.highlightColor = 0x00d4ff;
          effectOptions.midtoneColor = 0x0a0a0f;
          effectOptions.lowlightColor = 0x0a0a0f;
          effectOptions.baseColor = 0x0a0a0f;
        } else if (currentEffect === 'BIRDS') {
          effectOptions.backgroundColor = 0x0a0a0f;
          effectOptions.color1 = 0x00d4ff;
          effectOptions.color2 = 0x0a0a0f;
        } else if (currentEffect === 'GLOBE') {
          effectOptions.backgroundColor = 0x0a0a0f;
          effectOptions.color = 0x00d4ff;
        } else if (currentEffect === 'RINGS') {
          effectOptions.backgroundColor = 0x0a0a0f;
          effectOptions.color = 0x00d4ff;
        }

        vantaEffectRef.current = window.VANTA[currentEffect](effectOptions);
      } catch (e) {
        console.error("Vanta.js initialization error:", e);
      }
    }
    
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    }
  }, [currentEffect]);

  // GSAP Animation
  useGSAP(() => {
    gsap.fromTo('.hero-anim', 
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      }
    );
  }, { scope: contentRef });

  const handleBadgeDoubleClick = () => {
    setIsShockwave(true);
    setTimeout(() => setIsShockwave(false), 1000);
  };

  return (
    <section id="hero" className={styles.hero} ref={myRef}>
      <div className={styles.content} ref={contentRef}>
        
        <div 
          className={`hero-anim ${styles.statusBadge} ${isShockwave ? styles.shockwave : ''}`}
          onDoubleClick={handleBadgeDoubleClick}
        >
          <span className={styles.dot}></span>
          {portfolio.status}
        </div>
        
        <h1 className="hero-anim">{portfolio.displayName}</h1>
        
        <p className={`hero-anim ${styles.tagline}`}>{portfolio.tagline}</p>
        
        <div className={`hero-anim ${styles.ctaGroup}`}>
          <a href={portfolio.resume} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
            View Resume
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Get in Touch
          </a>
        </div>
        
      </div>

      <div className={styles.switcher}>
        <div className={styles.switcherLabel}>Bg Preset</div>
        <select 
          value={currentEffect} 
          onChange={(e) => setCurrentEffect(e.target.value)}
          className={styles.select}
        >
          {effectsList.map(effect => (
            <option key={effect} value={effect}>{effect}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Hero;
