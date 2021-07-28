import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import AppList from '../../@crema/core/AppList';
import ReviewCell from './ReviewCell';
import Divider from '@material-ui/core/Divider';
import AddNewComment from './AddNewComment';
import ChatListSkeleton from '@crema/core/Skeleton/ChatListSkeleton';

const Review: FC<any> = ({comments, handleSubmitNewComment, isLoading}) => {
  console.log({isLoading});
  
  return (
    <Box style={{padding: '0.5rem 1rem'}}>
      <Box
        component='h3'
        color='text.primary'
        fontSize={22}
        fontWeight='bold'
        mb={3}>
        Reviews
      </Box>
      {isLoading ? (
        <ChatListSkeleton />
      ) : (
        <AppList
          data={comments ? comments : []}
          renderRow={(data) => <ReviewCell item={data} key={data} />}
        />
      )}

      <Divider style={{marginTop: 15, marginBottom: 15}} />
      <AddNewComment handleSubmit={handleSubmitNewComment} />
    </Box>
  );
};

export default Review;
