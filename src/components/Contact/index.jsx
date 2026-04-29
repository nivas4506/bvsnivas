import React, { useState } from 'react';
import styles from './Contact.module.scss';
import { portfolio } from '../../data/portfolio';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolio.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2 className="section-title"><span>05.</span> Contact</h2>
      
      <div className={styles.content}>
        <h3>Get In Touch</h3>
        <p>I'm currently open to research internships & SWE roles. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
        
        <div className={styles.emailContainer}>
          <button className={styles.emailBtn} onClick={handleCopyEmail}>
            {portfolio.email}
          </button>
          {copied && <span className={styles.toast}>Copied to clipboard!</span>}
        </div>
        
        <div className={styles.badge}>
          Avg. response time: &lt; 24 hours
        </div>

        <div className={styles.socials}>
          <a href={portfolio.socials.github} target="_blank" rel="noreferrer">
            github.com/nivas4506
          </a>
          <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/bvsnivaschowdary
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
