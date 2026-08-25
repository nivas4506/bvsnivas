import React, { useState, useEffect, useRef } from 'react';
import styles from './Certificates.module.scss';
import { portfolio } from '../../data/portfolio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  const certificates = portfolio.certificates || [];
  const total = certificates.length;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-swipe functionality
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, total, currentIndex]);

  // Touch handlers for mobile swipe gesture
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // GSAP ScrollTrigger Entrance Animation
  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, { scope: containerRef });

  if (total === 0) return null;

  return (
    <section id="certificates" className={styles.certificates} ref={containerRef}>
      <h2 className={`section-title ${styles.sectionTitle}`}><span>04.</span> Certifications</h2>

      <div 
        className={styles.carouselContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={styles.swipeViewport}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className={styles.cardTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {certificates.map((cert, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div className={styles.card}>
                  <div>
                    <div className={styles.topRow}>
                      <span className={styles.badge}>{cert.badge}</span>
                      <span className={styles.issuerDate}>{cert.date}</span>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.titleRow}>
                        <div className={styles.iconWrapper}>
                          <img 
                            src={cert.icon.includes(':') 
                              ? `https://api.iconify.design/${cert.icon.replace(':', '/')}.svg${cert.icon.startsWith('simple-icons') ? '?color=%2300d4ff' : ''}`
                              : `https://api.iconify.design/simple-icons/${cert.icon}.svg?color=%2300d4ff`
                            } 
                            alt={cert.issuer} 
                            width="22" 
                            height="22" 
                          />
                        </div>
                        <div className={styles.cardHeader}>
                          <h3>{cert.title}</h3>
                          <div className={styles.issuerName}>{cert.issuer}</div>
                        </div>
                      </div>
                      <p className={styles.description}>{cert.description}</p>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <div className={styles.fileMeta}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>Verified PDF Document</span>
                    </div>

                    <a 
                      href={cert.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.viewBtn}
                    >
                      <span>View PDF</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div className={styles.controls}>
          <button 
            className={styles.arrowBtn} 
            onClick={prevSlide}
            aria-label="Previous Certificate"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className={styles.indicators}>
            {certificates.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to certificate ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            className={styles.arrowBtn} 
            onClick={nextSlide}
            aria-label="Next Certificate"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.swipeCounter}>
          <span>{String(currentIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
