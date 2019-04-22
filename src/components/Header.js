import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { lightGray, secondaryGreen } from 'anker-colors';

import Anchor from './Anchor';

const headerBreakpoints = {
  small: '515px',
  tiny: '242px',
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background: ${lightGray};
  padding: 20px 20px;
  width: 100%;
  min-height: fit-content;

  @media (max-width: ${headerBreakpoints.small}) {
    flex-direction: column;
  }
`;
const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  a {
    margin-left: 20px;
  }

  @media (max-width: ${headerBreakpoints.small}) {
    margin-top: 10px;

    a {
      margin-left: 0;
      margin-right: 20px;
    }
  }
`;

const PageTitleContainer = styled.hgroup`
  margin: 0;
  display: flex;
  flex-wrap: wrap;

  :hover {
    svg {
      transform: rotateZ(0deg);
    }
  }

  svg {
    margin-right: 0px;
    width: auto;
    height: 1.5em;
    transform: rotateZ(22.5deg);
    transition: transform 0.5s ease;
  }

  @media (max-width: ${headerBreakpoints.tiny}) {
    svg {
      margin-bottom: 10px;
    }
  }
`;

const PageTitle = styled.h2`
  margin: 0;
  padding: 0;
`;

const Header = ({ name }) => (
  <HeaderContainer>
    <PageTitleContainer>
      <Anchor color={secondaryGreen} />
      <PageTitle>{name}</PageTitle>
    </PageTitleContainer>
    <Navigation>
      <Link to="/">About Me</Link>
      <Link to="/writing">Writing</Link>
      <Link to="/speaking">Speaking</Link>
    </Navigation>
  </HeaderContainer>
);

export default Header;
