import { darkBlue, secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../../utils/styled';
import Html, { allowImages } from '../Html';

const Container = styled('div', 'info-container');

const InfoHeader = ({ headerInfo }) => {
  headerInfo = headerInfo.replace(/align="center"/g, '');
  return (
    <Html as={Container} sanitizeOptions={allowImages}>
      {headerInfo}
    </Html>
  );
};

export default InfoHeader;
