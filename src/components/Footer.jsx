import { secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../utils/styled';
import Anchor from './Anchor';
import imgUrl from '../images/panda-laptop.png';

const Container = styled('footer', 'footer-container');

const ImageContainer = styled('p', 'mb-0 flex justify-center');

const Footer = () => (
  <Container>
    <ImageContainer>
      <img className="panda" src={imgUrl} alt="Panda emoji sitting in front of laptop"/>
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
