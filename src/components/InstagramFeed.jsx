import React from 'react';

import styled from '@utils/styled';

const InstagramFeedWrapper = styled('div', 'grid gap-2 w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]	');
const Image = styled('img', '');
const Link = styled('a', 'hover:scale-[1.04] focus:scale-[1.04] focus-within:scale-[1.04] transition-transform');


export const InstagramFeed = ({feed}) => {
  return <InstagramFeedWrapper>
    {feed.map((entry) => {
      return <Link target="_blank" rel="noopener noreferrer" href={entry.url} key={entry.id}>
        <Image src={entry.thumbnail} alt="" width={150} height={150} />
      </Link>
    })}
  </InstagramFeedWrapper>
}

export default InstagramFeed;