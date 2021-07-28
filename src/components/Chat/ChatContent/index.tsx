import React from 'react';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux';
import MessagesScreen from './MessagesScreen';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {AppState} from '../../../redux/store';

const useStyles = makeStyles((theme: CremaTheme) => ({
  messagesScreenRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  scrollChatNoUser: {
    fontSize: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: 'calc(100vh - 169px) !important',
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '3rem',
      color: '#BDBDBD',
      [theme.breakpoints.up('lg')]: {
        fontSize: '5rem',
      },
    },
  },
}));

const ChatContent = () => {

  const classes = useStyles();
  return (
    <>
      <Box className={classes.messagesScreenRoot}>
        <MessagesScreen selectedUser={{id:1, name: 'Chat Room', isOnline: true}} />
      </Box>
    </>
  );
};

export default ChatContent;
