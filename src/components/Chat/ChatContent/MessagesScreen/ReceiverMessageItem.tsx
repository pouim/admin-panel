import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useStyles from './MessageItem.style';
import {getFileSize} from '../../../../@crema/utility/Utils';
import Moment from 'react-moment';
import { ConvertBuffer } from 'lib';


const getMessage = (item: any, classes: any) => {
  return (
    <Box component='p' mb={1} ml={3}>
      {item?.message?.message}
    </Box>
  );
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


  console.log(ConvertBuffer(item?.user?.profile_photo))

  return (
    <Box
      className={clsx(classes.messageItemRoot, 'left')}
      display='flex'
      justifyContent={'flex-start'}>
      <Box className={classes.messageChatRoot}>
        <Box
          className={clsx(classes.messageTime, 'message-time')}
          component='span'>
          <Moment date={item?.time} fromNow />
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box className={classes.messageChat}>
            {item?.user?.profile_photo ? (
              <Avatar
                className={classes.profilePic}
                src={ConvertBuffer(item?.user?.profile_photo)}
              />
            ) : (
              <Avatar className={classes.profilePic}>
                {item?.user?.username?.charAt(0).toUpperCase()}
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
          {/* {item.message_type === 'TEXT' ? null : (
            <Box className='pointer' component='span' mt='auto'>
              <a href={item.media!.url} download={item.media!.file_name}>
                <img alt='' src={'/assets/images/icon-download.svg'} />
              </a>
            </Box>
          )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default ReceiverMessageItem;
