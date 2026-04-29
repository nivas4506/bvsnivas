import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Cursor.module.scss';

const Cursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth <= 768) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Outer cursor with slight delay for trailing effect
      gsap.to(outerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power3.out'
      });

      // Inner cursor follows exactly
      gsap.set(innerRef.current, {
        x: clientX,
        y: clientY
      });
    };

    const onMouseEnterLink = () => setIsHovered(true);
    const onMouseLeaveLink = () => setIsHovered(false);

    window.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll('a, button, select, input, textarea, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      document.body.classList.add('hovered');
    } else {
      document.body.classList.remove('hovered');
    }
  }, [isHovered]);

  return (
    <>
      <div ref={outerRef} className={styles.cursorOuter} />
      <div ref={innerRef} className={styles.cursorInner} />
    </>
  );
};

export default Cursor;
