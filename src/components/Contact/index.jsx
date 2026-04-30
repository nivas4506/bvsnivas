import React, { useState, useRef } from 'react';
import styles from './Contact.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(`.${styles.content} > *`, 
      {
        y: 40,
        scale: 0.9,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        },
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.4)'
      }
    );
  }, { scope: containerRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={styles.contact} ref={containerRef}>
      <h2 className="section-title"><span>05.</span> Contact</h2>
      
      <div className={styles.content}>
        <div className={styles.glow} />
        
        <h3>Get In Touch</h3>
        <p className={styles.description}>
          I'm currently open to research internships & SWE roles. Whether you 
          have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className={styles.ctaGroup}>
          <a href={`mailto:${portfolio.email}`} className={styles.primaryBtn}>
            Say Hello
          </a>
          
          <div className={styles.emailContainer}>
            <button className={styles.emailBtn} onClick={handleCopyEmail} title="Click to copy email">
              {portfolio.email}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            {copied && <span className={styles.toast}>Copied to clipboard!</span>}
          </div>
        </div>
        
        <div className={styles.badge}>
          <span className={styles.dot}></span>
          Avg. response time: &lt; 24 hours
        </div>

        <div className={styles.socials}>
          <a href={portfolio.socials.github} target="_blank" rel="noreferrer" className={styles.socialLink}>
            <img src="https://api.iconify.design/simple-icons/github.svg?color=%23ffffff" alt="GitHub" />
            <span>GitHub</span>
          </a>
          <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink}>
            <img src="https://api.iconify.design/simple-icons/linkedin.svg?color=%2300d4ff" alt="LinkedIn" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
