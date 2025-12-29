import React from 'react';
import { cn } from '../../utils/cn';
import Html from '../Html';

const linkRegEx = /<a .*<\/a>/;
function parseSocialChannels(channel) {
  const link = channel.match(linkRegEx)[0];
  const emoji = channel.replace(link, '').trim();
  const linkWithEmoji = link.replace('>', `><span class="emoji">${emoji}</span>`);
  return {
    link,
    emoji,
    linkWithEmoji,
  };
}

function SocialList({channels, className, ...props}) {
  const socialChannels = channels.map(parseSocialChannels);
  return <ul className={cn('social-list', className)} {...props}>
    {socialChannels.map(channel => {
      return <Html as="li" key={channel.link.substr(8)}>
        {channel.linkWithEmoji}
      </Html>
    })}
  </ul>
}

export default SocialList;
