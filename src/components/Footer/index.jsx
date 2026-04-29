import React from 'react';
import styles from './Footer.module.scss';
import { portfolio } from '../../data/portfolio';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2026 {portfolio.name}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
