import React from 'react';
import SocialChannels from './SocialChannels';

const Header = ({ name, path }) => {
  const normalizedPath = path === '/' ? path : (path.endsWith('/') ? path.substr(0, path.length - 1) : path);
  const Link = ({href, ...props}) => {
    return <a href={href} {...props} className={"border-b-2 text-black/80 dark:text-gray-400 box-border no-underline border-solid border-secondaryGreen-500  hover:border-secondaryGreen-500 focus:border-secondaryGreen-500 focus:no-underline hover:no-underline " + (normalizedPath === href ? 'dark:text-white font-bold' : "border-transparent")}/>
  }
  return (
  <div className="flex flex-wrap justify-between p-[20px] w-full min-h-fit max-w-[1000px] flex-col md:flex-row">
    <hgroup className="page-title-container items-center">
      {/* <Anchor color={secondaryGreen} /> */}
      <h2 className="m-0 p-0 min-w-[226px] shrink-0 large-headings tracking-wider text-base/80 dark:text-white">
        {name}
      </h2>
    </hgroup>
    <div className="flex items-center gap-10">
      <nav className="navigation-container leading-8">
        <Link href="/">About Me</Link>
        <Link href="/writing">Writing</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/speaking">Speaking</Link>
        {/* <a href="/work">Projects</a> */}
      </nav>
      <SocialChannels />
    </div>
  </div>
)};

export default Header;
