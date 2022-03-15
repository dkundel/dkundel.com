import { secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../utils/styled';
import Anchor from './Anchor';

const HeaderContainer = styled('div', 'flex justify-between bg-white border-b-2 border-solid border-secondaryGreen-500 p-[20px] w-full min-h-fit flex-col xs:flex-row')
const Navigation = styled('nav', 'navigation-container');
const PageTitleContainer = styled('hgroup', 'page-title-container');
const PageTitle = styled('h2', 'm-0 p-0');

const Header = ({ name }) => (
  <HeaderContainer>
    <PageTitleContainer>
      <Anchor color={secondaryGreen} />
      <PageTitle>{name}</PageTitle>
    </PageTitleContainer>
    <Navigation>
      <a href="/">About Me</a>
      <a href="/writing">Writing</a>
      <a href="/speaking">Speaking</a>
      <a href="/work">Projects</a>
    </Navigation>
  </HeaderContainer>
);

export default Header;
