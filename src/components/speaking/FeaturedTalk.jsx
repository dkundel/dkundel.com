import React from 'react';
import styled from '@utils/styled';

const FeaturedTalkWrapper = styled('div', 'bg-white dark:bg-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-[0.5px] dark:border-slate-700 rounded-lg shadow-md px-3 py-4 sm:pt-1 flex sm:inline-block w-full sm:w-[300px]')
const TalkTitle = styled('p', 'font-bold mt-2 text-purple-300 dark:text-gray-300 truncate text-ellipsis overflow-hidden sm:no-wrap');
const YoutubeFrame = styled('iframe', 'aspect-video hidden sm:block sm:w-full');
const YoutubeImage = styled('img', 'sm:hidden')
const YoutubeContainer = styled('div', 'w-[100px] shrink-0 sm:w-full');
const Info = styled('div', 'flex justify-between');
const EventName = styled('p', 'small-all-caps');
const Location = styled('p', 'small-all-caps');
const TalkDetails = styled('a', 'no-underline min-w-0 shrink flex flex-col sm:block h-full justify-between flex-grow ml-4 sm:ml-0');

export const FeaturedTalk = ({title, youtubeId, conference, location}) => {
  return <FeaturedTalkWrapper>
    <YoutubeContainer>
      <YoutubeImage src={`https://i.ytimg.com/vi_webp/${youtubeId}/sddefault.webp`} alt="Youtube video preview"/>
      <YoutubeFrame width="270" src={"https://www.youtube.com/embed/"+ youtubeId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></YoutubeFrame>
    </YoutubeContainer>
    <TalkDetails href={"https://www.youtube.com/watch?v=" + youtubeId} target="_blank" rel="noopener noreferrer">
      <TalkTitle>{title}</TalkTitle>
      <Info>
        <EventName>{conference}</EventName>
        <Location>{location}</Location>
      </Info>
    </TalkDetails>
  </FeaturedTalkWrapper>
}