import { secondaryGreen } from 'anker-colors';
import React from 'react';
import styled from '../utils/styled';
import Anchor from './Anchor';
import SocialChannels from './SocialChannels';

const HeaderContainer = styled('div', 'md:fixed z-40 bg-gray-50 dark:bg-slate-900 backdrop-filter backdrop-blur-sm bg-opacity-90 flex flex-wrap justify-between p-[20px] w-full min-h-fit max-w-[1000px] flex-col md:flex-row')
const Navigation = styled('nav', 'navigation-container leading-8');
const PageTitleContainer = styled('hgroup', 'page-title-container items-center');
const PageTitle = styled('h2', 'm-0 p-0 min-w-[226px] shrink-0 large-headings tracking-wider text-base/80 dark:text-white');

const Header = ({ name, path, links, channels, title }) => {
  const normalizedPath = path === '/' ? path : (path.endsWith('/') ? path.substr(0, path.length - 1) : path);
  const Link = ({href, ...props}) => {
    return <a href={href} {...props} className={"border-b-2 text-black/80 dark:text-gray-400 box-border no-underline border-solid border-secondaryGreen-500  hover:border-secondaryGreen-500 focus:border-secondaryGreen-500 focus:no-underline hover:no-underline " + (normalizedPath === href ? 'dark:text-white font-bold' : "border-transparent")}/>
  }
  return (
  <HeaderContainer>
    <PageTitleContainer>
      <PageTitle>{name} <span className="text-base block md:inline text-slate-500 font-normal ">{title}</span></PageTitle>
    </PageTitleContainer>
    <div className="flex items-center gap-10">
      <Navigation>
        { links.map(({href, title}) => {
          return <Link href={href} key={href}>{title}</Link> 
        })}
      </Navigation>
      <SocialChannels channels={channels} />
    </div>
  </HeaderContainer>
)};

export default Header;
