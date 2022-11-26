import { secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../utils/styled';
import Anchor from './Anchor';
import SocialChannels from './SocialChannels';

const HeaderContainer = styled('div', 'flex flex-wrap justify-between p-[20px] w-full min-h-fit flex-col md:flex-row')
const Navigation = styled('nav', 'navigation-container leading-8');
const PageTitleContainer = styled('hgroup', 'page-title-container items-center');
const PageTitle = styled('h2', 'm-0 p-0 min-w-[226px] shrink-0 large-headings tracking-wider text-base/80 dark:text-white');

const Header = ({ name, path }) => {
  const normalizedPath = path === '/' ? path : (path.endsWith('/') ? path.substr(0, path.length - 1) : path);
  const Link = ({href, ...props}) => {
    return <a href={href} {...props} className={"border-b-2 text-black/80 dark:text-gray-400 box-border no-underline border-solid border-secondaryGreen-500  hover:border-secondaryGreen-500 focus:border-secondaryGreen-500 focus:no-underline hover:no-underline " + (normalizedPath === href ? 'dark:text-secondaryGreen-500' : "border-transparent")}/>
  }
  return (
  <HeaderContainer>
    <PageTitleContainer>
      {/* <Anchor color={secondaryGreen} /> */}
      <PageTitle>{name}</PageTitle>
    </PageTitleContainer>
    <div className="flex items-center gap-10">
      <Navigation>
        <Link href="/">About Me</Link>
        <Link href="/writing">Writing</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/speaking">Speaking</Link>
        {/* <a href="/work">Projects</a> */}
      </Navigation>
      <SocialChannels />
    </div>
  </HeaderContainer>
)};

export default Header;
