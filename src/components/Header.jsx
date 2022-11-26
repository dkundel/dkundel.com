import { secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../utils/styled';
import Anchor from './Anchor';
import SocialChannels from './SocialChannels';

const HeaderContainer = styled('div', 'flex justify-between p-[20px] w-full min-h-fit flex-col xs:flex-row')
const Navigation = styled('nav', 'navigation-container leading-8');
const PageTitleContainer = styled('hgroup', 'page-title-container');
const PageTitle = styled('h2', 'm-0 p-0 large-headings tracking-wide text-base/80');

const Header = ({ name, path }) => {
  const Link = ({href, ...props}) => {
    return <a href={href} {...props} className={"border-b-2 text-black/80 box-border no-underline border-solid border-secondaryGreen-500  hover:border-secondaryGreen-500 focus:border-secondaryGreen-500 focus:no-underline hover:no-underline " + (path === href ? '' : "border-transparent")}/>
  }
  return (
  <HeaderContainer>
    <PageTitleContainer>
      <Anchor color={secondaryGreen} />
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
