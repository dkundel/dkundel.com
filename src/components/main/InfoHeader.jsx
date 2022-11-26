import { darkBlue, secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../../utils/styled';
import Heading from '../Heading';
import headshotImage from '../../images/me-decorative.png';
import Html, { allowImages } from '../Html';

const Container = styled('div', 'info-container');
const IntroHeading = styled('p', '');

const InfoHeader = ({ headerInfo }) => {
  headerInfo = headerInfo.replace(/align="center"/g, '');
  return (
    <div className='flex flex-col md:flex-row-reverse'>
      <img className="max-w-[200px] md:max-w-sm mx-auto mb-5 md:m-0" alt="Photo of Dominik in front of purple background" {...headshotImage} />
      <Heading>
        <Heading.h1>
          <p className='mb-0 mt-10 font-sans font-thin text-3xl md:text-4xl text-black/80'>
            Hi! I'm
          </p>
          <p className="mb-0 sm:min-w-[444px] text-highlight-gradient leading-[1.1em] text-6xl md:text-8xl">Dominik <br className="hidden md:block" /> Kundel</p>
        </Heading.h1>
        <Heading.p><span className="small-all-caps text-base font-light">Developer | Product Manager | Public Speaker</span></Heading.p>
      </Heading>
    </div>
    // <Html as={Container} sanitizeOptions={allowImages}>
    //   {headerInfo}
    // </Html>
  );
};

export default InfoHeader;
