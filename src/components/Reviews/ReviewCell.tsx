import React, { FC } from 'react';
import {Box} from '@material-ui/core';
import {Fonts} from '../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';
import { useMutation } from 'react-query';
import gate from 'gate';
import { showError } from 'lib';
import { queryClient } from 'App';

const useStyles = makeStyles(() => ({
  logo: {
    height: 50,
    width: 50,
    overflow: 'hidden',
  },
}));

const ReviewCell: FC<any> = ({item}) => {
  const {
    mutate: actionCommnet,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.actionCommnet);
  console.log({item});
  
  const classes = useStyles();

  const onLikeComment = () => {
    if(!item.user_liked) {
      actionCommnet(
        {id: item?.id, action: 'like'},
        {
          onSuccess: (d: any) => {
            console.log(d);
            queryClient.invalidateQueries('signal-id');
          },
          onError: (d: any) => {
            console.log(d);
            showError(d.data, {
              color: 'red',
              gravity: 'bottom',
              position: 'left',
            });
          },
        },
      );
    }
  };

  const onDislikeComment = () => {
    if(!item.user_disliked) {
      actionCommnet(
        {id: item?.id, action: 'dislike'},
        {
          onSuccess: (d: any) => {
            console.log(d);
            queryClient.invalidateQueries('signal-id');
          },
          onError: (d: any) => {
            console.log(d);
            showError(d.data, {
              color: 'red',
              gravity: 'bottom',
              position: 'left',
            });
          },
        },
      );
    }
  };
  return (
    <Box
      position='relative'
      display='flex'
      className='item-hover'
      alignItems='center'
      px={4}
      py={3}
      justifyContent='space-between'>
      <Box display='flex'>
        <Avatar
          className={classes.logo}
          alt='user image'
          src={item?.user?.profile_photo}
        />

        <Box flex={1} ml={4}>
          <Box
            component='h3'
            color='text.primary'
            display='flex'
            mb={2}
            fontWeight={Fonts.BOLD}
            alignItems='center'
            fontSize={14}>
            <Box
              component='span'
              color='white'
              bgcolor='#388E3C'
              width={34}
              mr={2}
              px={2}
              display='flex'
              alignItems='center'
              height={18}
              borderRadius={10}
              fontSize={12}>
              5 <StarRateIcon style={{fontSize: 16}} />
            </Box>
            {item?.user?.username}
          </Box>
          <Box component='p' fontSize={14} color='text.secondary'>
            {item?.description}
          </Box>
          <Box component='p' fontSize={12} color='text.hint'>
            <Moment date={item?.created_at} fromNow />
          </Box>
        </Box>
      </Box>
      <Box
        display='flex'
        position='absolute'
        bottom={2}
        right={2}
        flexDirection='row'
        color='#737989'
        alignItems='center'
        fontSize={14}>
        <IconButton
          onClick={onLikeComment}
          style={{marginRight: 5, height: 25, width: 25}}>
          <ThumbUpAltIcon
            style={{fontSize: 16, color: item?.user_liked && '#0A8FDC'}}
          />
        </IconButton>
        {item?.likes_count}
        <IconButton
          onClick={onDislikeComment}
          style={{marginRight: 5, marginLeft: 15, height: 25, width: 25}}>
          <ThumbDownIcon
            style={{fontSize: 16, color: item?.user_disliked && '#F04F47'}}
          />
        </IconButton>
        {item?.dislikes_count}
      </Box>
    </Box>
  );
};
export default ReviewCell;
