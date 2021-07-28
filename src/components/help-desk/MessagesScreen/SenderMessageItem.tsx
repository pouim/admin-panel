import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import useStyles from './MessageItem.style';
import IntlMessages from '../../../@crema/utility/IntlMessages';
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
  //  else if (item.media) {
  //   return (
  //     <Box className={classes.mediaWrapper}>
  //       {item.media.mime_type.startsWith('video') ? (
  //         <Box display='flex'>
  //           <video src={item.media.url} />
  //           <PlayCircleOutlineIcon className={classes.videoIcon} />
  //         </Box>
  //       ) : (
  //         <img alt='' src={item.media.url} />
  //       )}
  //     </Box>
  //   );
  // }
};

interface SenderMessageItemProps {
  item: any;
  authUser: any;
  onClickEditMessage: (item: any) => void;
  deleteMessage: (id: any) => void;
}

const SenderMessageItem: React.FC<SenderMessageItemProps> = ({
  authUser,
  item,
  onClickEditMessage,
  deleteMessage,
}) => {
  const [isMoreIcon, onOpenMoreIcon] = React.useState(null);

  const onViewMoreOpen = (event: any) => {
    onOpenMoreIcon(event.currentTarget);
  };

  const onViewMoreClose = () => {
    onOpenMoreIcon(null);
  };

  const getUserAvatar = () => {
    const name = authUser.displayName;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (authUser.email) {
      return authUser.email.charAt(0).toUpperCase();
    }
  };

  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.messageItemRoot, 'right')}
      display='flex'
      justifyContent={'flex-end'}>
      <Box className={classes.messageChatRoot}>
        <Box
          className={clsx(classes.messageTime, 'message-time')}
          component='span'>
          <Moment date={item?.created_at} fromNow />
        </Box>

        <Box display='flex' flexDirection='row' justifyContent='flex-end'>
          {item?.text && !item?.attachment ? null : (
            <Box className='pointer' component='span' mt='auto'>
              <a href={item?.attachment} download={item?.attachment}>
                <img alt='' src={'/assets/images/icon-download.svg'} />
              </a>
            </Box>
          )}
          <Box className={classes.messageChat} ml='auto'>
            {authUser?.profile_photo ? (
              <Avatar
                className={classes.profilePic}
                src={authUser?.profile_photo}
              />
            ) : (
              <Avatar className={classes.profilePic}>{getUserAvatar()}</Avatar>
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
        </Box>
      </Box>

      <Box className={classes.arrowIcon}>
        <Box
          ml={2}
          className={classes.textPointer}
          component='span'
          color='text.disabled'>
          {/* <MoreVertIcon onClick={onViewMoreOpen} /> */}
        </Box>

        <Menu
          anchorEl={isMoreIcon}
          open={Boolean(isMoreIcon)}
          onClose={onViewMoreClose}>
          {item.message_type === 'TEXT' ? (
            <MenuItem
              onClick={() => {
                onViewMoreClose();
                onClickEditMessage(item);
              }}>
              <IntlMessages id='common.edit' />
            </MenuItem>
          ) : null}
          <MenuItem
            onClick={() => {
              onViewMoreClose();
              deleteMessage(item.id);
            }}>
            <IntlMessages id='common.delete' />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default SenderMessageItem;
