import React from 'react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '../icons/Socialicons';
import siteMetaData from '../../data/siteMetadata.json';

import DarkModeToggle from './DarkModeToggle';

const socialChannels = {
  github: {
    name: "GitHub",
    icon: GitHubIcon
  },
  linkedin: {
    name: "LinkedIn",
    icon: LinkedInIcon,
  },
  instagram: {
    name: "Instagram",
    icon: InstagramIcon
  },
  twitter: {
    name: "Twitter",
    icon: TwitterIcon
  }
}

export const SocialChannels = () => {
  return <div className="flex flex-col -mt-[36px] sm:mt-0 sm:flex-row gap-1 sm:gap-3">
    {Object.entries(siteMetaData.socials).map(([channel, href]) => {
      let socialChannel = socialChannels[channel];
      if (socialChannel) {
        return (<a key={channel} href={href} target="_blank" rel="noopener noreferrer">
          <socialChannel.icon className="h-5 w-5 dark:fill-gray-400 dark:hover:fill-gray-100 hover:fill-secondaryGreen-500" aria-label={socialChannel.name + " Logo"}></socialChannel.icon> <span className="sr-only">View my {socialChannel.name} profile.</span>
          </a>)
      }
    })}
    <DarkModeToggle className="hidden sm:inline-block"/>
  </div>
}

export default SocialChannels;
