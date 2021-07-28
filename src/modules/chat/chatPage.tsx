import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import Chat from 'components/Chat';
import {w3cwebsocket as W3CWebSocket} from 'websocket';

const ChatPage = () => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Chat />
    </AppAnimate>
  );
};

export default ChatPage;
