import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useStyles from './MessageItem.style';
import {getFileSize} from '../../../@crema/utility/Utils';
import Moment from 'react-moment';


const getMessage = (item: any, classes: any) => {
  if (item?.text && !item?.attachment) {
    return (
      <Box component='p' mb={1} ml={3}>
        {item?.text}
      </Box>
    );
  }
  else {
    return (
      <Box display='flex' flexWrap='nowrap'>
        <img alt='' src={'/assets/images/icon-docs-dark.svg'} />
        <Box component='span' display='inline-block' ml={2}>
          <Box>{item?.text}</Box>
          {/* <Box>{getFileSize(item?.media?.file_size)}</Box> */}
        </Box>
      </Box>
    );
  }
};

interface ReceiverMessageItemProps {
  selectedUser: any;
  item: any;
}

const ReceiverMessageItem: React.FC<ReceiverMessageItemProps> = ({
  selectedUser,
  item,
}) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.messageItemRoot, 'left')}
      display='flex'
      justifyContent={'flex-start'}>
      <Box className={classes.messageChatRoot}>
        <Box
          className={clsx(classes.messageTime, 'message-time')}
          component='span'>
          <Moment date={item?.created_at} fromNow />
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box className={classes.messageChat}>
            {selectedUser?.image ? (
              <Avatar
                className={classes.profilePic}
                src={selectedUser?.image}
              />
            ) : (
              <Avatar className={classes.profilePic}>
                {selectedUser?.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Box className='message-info'>
              {getMessage(item, classes)}

              {item.edited && (
                <Box className={classes.editRoot}>
                  <EditIcon />
                </Box>
              )}
            </Box>
          </Box>
          {item?.text && !item?.attachment ? null : (
            <Box className='pointer' component='span' mt='auto'>
              <a href={item?.attachment} download={item?.attachment}>
                <img alt='' src={'/assets/images/icon-download.svg'} />
              </a>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReceiverMessageItem;
