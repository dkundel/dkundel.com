import React from 'react';
import img from '../images/panda-laptop.png';
import DarkModeToggle from './DarkModeToggle';

const Footer = () => (
  <footer className="footer-container">
    <p className="mb-0 flex justify-center">
      <img className="panda" alt="Panda emoji sitting in front of laptop" {...img}/>
      <DarkModeToggle className="sm:hidden" />
    </p>
    <p>
      Made by{' '}
      <a
        href="https://github.com/dkundel/dkundel.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dominik Kundel
      </a>
    </p>
  </footer>
);

export default Footer;
