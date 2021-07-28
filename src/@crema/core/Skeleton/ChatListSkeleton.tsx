import React from 'react';
import ContentLoader from 'react-content-loader';

export const ChatItemItem = () => (
  <ContentLoader viewBox='0 0 200 40'>
    <circle cx='20' cy='20' r='12' />
    <rect x='45' y='10' rx='1' ry='1' width='25' height='5' />
    <rect x='45' y='22' rx='1' ry='1' width='50' height='7' />
  </ContentLoader>
);
const ChatListSkeleton = () => {
  return (
    <React.Fragment>
      <ChatItemItem />
    </React.Fragment>
  );
};

export default ChatListSkeleton;
