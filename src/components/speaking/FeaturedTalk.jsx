import React from 'react';

export const FeaturedTalk = ({title, youtubeId, conference, location}) => {
  return <div className="bg-white dark:bg-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:border-[0.5px] dark:border-slate-700 rounded-lg shadow-md px-3 py-4 sm:pt-1 flex sm:inline-block w-full sm:w-[300px]">
    <div className="w-[100px] shrink-0 sm:w-full">
      <img className="sm:hidden" src={`https://i.ytimg.com/vi_webp/${youtubeId}/sddefault.webp`} alt="Youtube video preview"/>
      <iframe className="aspect-video hidden sm:block sm:w-full" width="270" src={"https://www.youtube.com/embed/"+ youtubeId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
    <a className="no-underline min-w-0 shrink flex flex-col sm:block h-full justify-between flex-grow ml-4 sm:ml-0" href={"https://www.youtube.com/watch?v=" + youtubeId} target="_blank" rel="noopener noreferrer">
      <p className="font-bold mt-2 text-purple-300 dark:text-gray-300 truncate text-ellipsis overflow-hidden sm:no-wrap">{title}</p>
      <div className="flex justify-between">
        <p className="small-all-caps">{conference}</p>
        <p className="small-all-caps">{location}</p>
      </div>
    </a>
  </div>
}
