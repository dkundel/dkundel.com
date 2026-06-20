import { cn } from '../lib/utils.js';
import { SafeHtml } from '../ui/safe-html.jsx';

export function Paragraphs({ list = [] }) {
  return (
    <div className="text-base mb-2 styled-paragraphs">
      {list.map(content => <SafeHtml as="p" html={content} key={content.slice(0, 40)} />)}
    </div>
  );
}

export function TopicList({ talks = [], className = '' }) {
  return (
    <ul className={cn('topic-list', className)}>
      {talks.map(talk => <SafeHtml as="li" html={talk} key={talk.slice(0, 40)} />)}
    </ul>
  );
}

const linkRegEx = /<a .*<\/a>/;

export function SocialList({ channels = [] }) {
  const socialChannels = channels.map(parseSocialChannel).filter(Boolean);

  return (
    <ul className="social-list">
      {socialChannels.map(channel => <SafeHtml as="li" html={channel} key={channel.slice(0, 80)} />)}
    </ul>
  );
}

function parseSocialChannel(channel) {
  const link = channel.match(linkRegEx)?.[0];
  if (!link) {
    return null;
  }

  const emoji = channel.replace(link, '').trim();
  return link.replace('>', `><span class="emoji">${emoji}</span>`);
}
