import parse from 'date-fns/parse/index.js';
import { Card, InteractiveCard } from '../ui/card.jsx';
import { SafeHtml } from '../ui/safe-html.jsx';

export function FeaturedTalk({ title, youtubeId, conference, location }) {
  return (
    <Card className="px-3 py-4 sm:pt-1 flex sm:inline-block w-full sm:w-[300px]">
      <div className="w-[100px] shrink-0 sm:w-full">
        <img
          className="aspect-video w-full object-cover"
          src={`https://i.ytimg.com/vi_webp/${youtubeId}/sddefault.webp`}
          alt=""
          loading="lazy"
        />
      </div>
      <a
        className="no-underline min-w-0 shrink flex flex-col sm:block h-full justify-between grow ml-4 sm:ml-0"
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="font-bold mt-2 text-purple-300 dark:text-gray-300 truncate text-ellipsis overflow-hidden sm:whitespace-nowrap">{title}</p>
        <div className="flex justify-between">
          <p className="small-all-caps">{conference}</p>
          <p className="small-all-caps">{location}</p>
        </div>
      </a>
    </Card>
  );
}

export function TalksByYear({ year, list, showDefault }) {
  const collapsed = typeof showDefault === 'undefined' ? true : showDefault;

  return (
    <details className="group" open={!collapsed}>
      <summary className="list-none cursor-pointer">
        <span className="mb-2 rounded-full bg-purple-300 inline-block mr-2 text-sm font-light px-3 py-1 text-white tracking-wide">{year}</span>
        <span className="hidden text-xs underline text-purple-300 dark:text-purple-100 hover:text-purple-700 focus:text-purple-700 dark:hover:text-purple-200 dark:focus:text-purple-200 group-open:inline">Hide talks</span>
        <span className="text-xs underline text-purple-300 dark:text-purple-100 hover:text-purple-700 focus:text-purple-700 dark:hover:text-purple-200 dark:focus:text-purple-200 group-open:hidden">Show {year} talks</span>
      </summary>
      <div className="border-l pl-8 py-2 ml-6 mb-2 border-purple-300 border-dashed">
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
        <InteractiveCard
          as="section"
          className="talk-entry mb-6 p-3 max-w-[800px] hover:shadow-lg focus:shadow-lg focus-within:shadow-lg"
          key={`${date}-${topic}`}
        >
          <h4 className="text-md dark:text-pink-400 font-semibold mx-0 mb-0">
            <SafeHtml as="span" html={event} />
          </h4>
          <p className="text-sm dark:text-gray-300 mx-0 my-2 pb-2 border-0 dark:border-b-0 border-b-2 border-solid border-secondaryGreen-500">
            <SafeHtml as="span" html={topic} />
          </p>
          <div className="w-auto flex justify-between flex-wrap">
            <p className="shrink mr-3 small-all-caps">
              {date} @ {location}
            </p>
            {other.trim().length > 0 ? (
              <p className="shrink small-all-caps">
                Additional Material:{' '}
                <SafeHtml
                  as="span"
                  html={other
                    .replace(' Slides', '&nbsp;Slides')
                    .replace(' Video', '&nbsp;Video')}
                />
              </p>
            ) : null}
          </div>
        </InteractiveCard>
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
  if (!Number.isNaN(parsedTime)) {
    return parsedTime;
  }

  const year = value.match(/\b(\d{4})\b/)?.[1];
  return year ? Date.UTC(Number(year), 0, 1) : 0;
}
