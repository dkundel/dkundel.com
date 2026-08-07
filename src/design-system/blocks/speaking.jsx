import parse from 'date-fns/parse/index.js';
import { Card, InteractiveCard } from '../ui/card.jsx';
import { SafeHtml } from '../ui/safe-html.jsx';

export function FeaturedTalk({ title, youtubeId, conference, location }) {
  return (
    <InteractiveCard>
      <a
        className="featured-talk"
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`https://i.ytimg.com/vi_webp/${youtubeId}/sddefault.webp`}
          alt=""
          width="640"
          height="360"
          loading="lazy"
          decoding="async"
        />
        <div className="featured-talk__copy">
          <h3 className="featured-talk__title">{title}</h3>
          <p className="talk-meta">{conference} · {location}</p>
        </div>
      </a>
    </InteractiveCard>
  );
}

export function TalksByYear({ year, list, showDefault }) {
  const collapsed = typeof showDefault === 'undefined' ? true : showDefault;

  return (
    <details className="talk-year" open={!collapsed}>
      <summary className="talk-year__summary">
        <span>{year}</span>
        <span className="small-all-caps">
          {list.length} {list.length === 1 ? 'engagement' : 'engagements'}
        </span>
      </summary>
      <div className="talk-year__content">
        <TalkList talks={list} />
      </div>
    </details>
  );
}

export function TalkList({ talks = [], collapsed = false }) {
  const list = collapsed ? [] : [...talks].sort(sortByEventDate);

  return (
    <div>
      {list.map(({ event, location, date, topic, other = '' }) => (
        <Card as="article" className="talk-entry" key={`${date}-${topic}`}>
          <h3 className="talk-entry__event">
            <SafeHtml as="span" html={event} />
          </h3>
          <p className="talk-entry__topic">
            <SafeHtml as="span" html={topic} />
          </p>
          <div className="talk-entry__footer">
            <p className="talk-meta">{date} @ {location}</p>
            {other.trim().length > 0 ? (
              <p className="talk-meta">
                Material:{' '}
                <SafeHtml
                  as="span"
                  html={other
                    .replace(' Slides', '&nbsp;Slides')
                    .replace(' Video', '&nbsp;Video')}
                />
              </p>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
}

function sortByEventDate(talkA, talkB) {
  return getEventTime(talkB.date) - getEventTime(talkA.date);
}

function getEventTime(value) {
  const parsedDate = parse(value, 'MMMM d, yyyy', new Date());
  const parsedTime = parsedDate.getTime();
  if (!Number.isNaN(parsedTime)) return parsedTime;

  const year = value.match(/\b(\d{4})\b/)?.[1];
  return year ? Date.UTC(Number(year), 0, 1) : 0;
}
