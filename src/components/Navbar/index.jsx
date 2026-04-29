import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.scss';
import { portfolio } from '../../data/portfolio';
import gsap from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const logoRef = useRef(null);
  const audioRef = useRef(null);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/audio/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    navLinks.forEach(link => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoDoubleClick = () => {
    const colors = ['#00d4ff', '#ff00d4', '#00ff88', '#ffaa00', '#ff003c'];
    const tl = gsap.timeline();
    
    colors.forEach((color) => {
      tl.to(document.documentElement, {
        '--color-accent': color,
        duration: 0.5,
      });
    });
    
    // Return to original
    tl.to(document.documentElement, {
      '--color-accent': '#00d4ff',
      duration: 0.5,
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
        // Autoplay policy might block this if user hasn't interacted
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <div 
          className={styles.logo} 
          ref={logoRef}
          onDoubleClick={handleLogoDoubleClick}
          title="Double click for magic!"
        >
          {portfolio.displayName}
        </div>
        
        <div className={styles.desktopNav}>
          <ul className={styles.navItems}>
            {navLinks.map((link, i) => (
              <li key={i}>
                <a 
                  href={link.href}
                  className={activeSection === link.href.substring(1) ? styles.active : ''}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className={styles.navBadge}>
            <span className={styles.dot}></span>
            <span className={styles.badgeText}>Open to internships & SWE roles</span>
          </div>
        </div>

        <button
          className={`${styles.musicBtn} ${isPlaying ? styles.playing : ''}`}
          onClick={toggleMusic}
          title="Toggle ambient music"
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <div className={styles.equalizer}>
              <span /><span /><span />
            </div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          )}
          <span>{isPlaying ? 'Playing' : 'Music'}</span>
        </button>

        <button 
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <ul>
          {navLinks.map((link, i) => (
            <li key={i}>
              <a 
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={activeSection === link.href.substring(1) ? styles.active : ''}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileBadge}>
          <span className={styles.dot}></span>
          Open to internships & SWE roles
        </div>
      </div>
    </header>
  );
};

export default Navbar;
