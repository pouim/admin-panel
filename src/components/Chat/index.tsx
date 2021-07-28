import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import ChatContent from './ChatContent';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';

const Chat: React.FC<any> = () => {
  return <ChatContent />;
};

export default Chat;
