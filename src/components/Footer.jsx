import { secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../utils/styled';
import Anchor from './Anchor';
import img from '../images/panda-laptop.png';
import DarkModeToggle from './DarkModeToggle';

const Container = styled('footer', 'footer-container');

const ImageContainer = styled('p', 'mb-0 flex justify-center');

const Footer = () => (
  <Container>
    <ImageContainer>
      <img className="panda" alt="Panda emoji sitting in front of laptop" {...img}/>
      <DarkModeToggle className="sm:hidden" />
    </ImageContainer>
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
  </Container>
);

export default Footer;
