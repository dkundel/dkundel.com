import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from '../icons/Socialicons';
import siteMetaData from '../../data/siteMetadata.json';

import styled from '@utils/styled';

const SocialChannelsWrapper = styled('div', 'flex flex-col -mt-[36px] sm:mt-0 sm:flex-row gap-1 sm:gap-3');

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
  return <SocialChannelsWrapper>
    {Object.entries(siteMetaData.socials).map(([channel, href]) => {
      let socialChannel = socialChannels[channel];
      if (socialChannel) {
        return (<a key={channel} href={href} target="_blank" rel="noopener noreferrer">
          <socialChannel.icon className="h-5 w-5 hover:fill-secondaryGreen-500" aria-label={socialChannel.name + " Logo"}></socialChannel.icon> <span className="sr-only">View my {socialChannel.name} profile.</span>
          </a>)
      }
    })}
  </SocialChannelsWrapper>
}

export default SocialChannels;