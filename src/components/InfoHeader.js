import React from 'react';
import styled from 'styled-components';

import { secondaryGreen, darkBlue } from 'anker-colors';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid ${secondaryGreen};
  margin-bottom: 20px;

  h1.name {
    color: ${darkBlue};

    span {
      padding-bottom: 5px;
      border-bottom: 1px solid ${secondaryGreen};
    }
  }

  p.meta-data {
    font-size: 0.8em;
  }

  p:last-of-type {
    font-size: 1.5em;
    margin-bottom: 0;
  }
`;

const InfoHeader = ({ headerInfo }) => {
  headerInfo = headerInfo.replace(/align="center"/g, '');
  return <Container dangerouslySetInnerHTML={{ __html: headerInfo }} />;
};

export default InfoHeader;
