import React from 'react';
import data from '../../../data/about/dkundel.json';
import styled from '../../utils/styled';
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

const SocialListContainer = styled('ul', 'social-list')

function SocialList({channels}) {
  const socialChannels = channels.map(parseSocialChannels);
  return <SocialListContainer>
    {socialChannels.map(channel => {
      return <Html as="li" key={channel.link.substr(8)}>
        {channel.linkWithEmoji}
      </Html>
    })}
  </SocialListContainer>
}

export default SocialList;