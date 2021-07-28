import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddNewMessage from './AddNewMessage';
import MessagesList from './MessagesList';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import moment from 'moment';
import Header from './Header';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import grey from '@material-ui/core/colors/grey';
import AppsHeader from '../../../../@crema/core/AppsContainer/AppsHeader';
import {useAppsContentStyles} from '../../../../@crema/core/AppsContainer/AppsContent';
import AppsFooter from '../../../../@crema/core/AppsContainer/AppsFooter';
import {w3cwebsocket as W3CWebSocket} from 'websocket';


import {AppState} from '../../../../redux/store';


const useStyles = makeStyles(() => ({
  scrollChatNomain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100% !important',
  },
  noMessage: {
    fontSize: 18,
    color: grey[500],
  },
}));

interface MessagesScreenProps {
  selectedUser: any;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({selectedUser}) => {
  const accessToken = localStorage.getItem('token');
  const client = new W3CWebSocket(
    `ws://157.175.55.250:8001/ws/?token=${accessToken}`,
  );
  const [message, setMessage] = useState<string | undefined>('');
  const [messages, setMessages] = useState<any>([]);
  const [isEdit, setIsEdit] = useState(false);


  const dispatch = useDispatch();
  const user = useAuthUser();

  let _scrollBarRef: any = null;
  useEffect(() => {
    // dispatch(getConnectionMessages(selectedUser.channelId));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (
      messages &&
      messages?.length > 0
    ) {
      if (_scrollBarRef) {
        _scrollBarRef._container.scrollTop = 99999;
      }
    }
  }, [messages, _scrollBarRef]);

  useEffect(() => {
    function connect() {

      const sendNotif = () => {
        const data = { 'action': 'subscribe' };
        if (client.readyState == 1) {
            client.send(JSON.stringify(data));
        }
    };


      client.onopen = function () {
        console.log('chatroom Connected');
        sendNotif();
      };
      client.onerror = function () {
        console.log('chatroom error');
        setTimeout(function () {
          sendNotif();
        }, 1000);
      };

      client.onmessage = function (message: any) {
        const msg = JSON.parse(message.data);
        setMessages((prev: any) => [...prev, msg]);
        // console.log(msg);
      };

      client.onclose = function (e) {
        console.log({e});
        if (e.wasClean == true) {
          console.log(
            'chatroom is closed. Reconnect will be attempted in 2 second.',
            e.reason,
          );
        } else {
          setTimeout(function () {
            connect();
          }, 2000);
        }
      };
      setTimeout(() => {
        console.log(client.readyState)
      }, 2000);
    }

    connect();
  }, [])



  const sendFileMessage = (fileMessage: any) => {
    // const data: any = {
    //   ...fileMessage,
    //   time: moment().format('llll'),
    // };
    // dispatch(onSendMessage(selectedUser.channelId, data));
  };

  const onSend = (message: string) => {
    // const data: any = {
    //   message,
    //   message_type: MessageType.TEXT,
    //   sender: 'sender_id',
    //   time: moment().format('llll'),
    // };

    // if (isEdit) {
    //   data.edited = true;
    //   dispatch(onEditMessage(selectedUser.channelId, data));
    //   setMessage('');
    //   setIsEdit(false);
    // } else {
    //   dispatch(onSendMessage(selectedUser.channelId, data));
    //   setMessage('');
    // }

 
    const data = {action: 'send-message', message: {message}};
    client.send(JSON.stringify(data));
    // console.log({message})
  };

  const onClickEditMessage = (data: any) => {
    // if (data.message_type === MessageType.TEXT) {
    //   setIsEdit(true);
    //   setMessage(data.message);
    // }
  };

  const deleteMessage = (messageId: number) => {
    // dispatch(onDeleteMessage(selectedUser.channelId, messageId));
  };

  const deleteConversation = () => {
    // dispatch(onDeleteConversation(selectedUser.channelId));
  };

  const appsContentStyles = useAppsContentStyles({
    isDetailView: false,
    fullView: false,
  });

  const classes = useStyles();

  


  return (
    <Box style={{minWidth: '70%'}} display='flex' height={1} flexDirection='column'>
      <AppsHeader>
        <Header
          selectedUser={selectedUser}
          deleteConversation={deleteConversation}
        />
      </AppsHeader>

      {messages && user ? (
        <PerfectScrollbar
          ref={ref => {
            _scrollBarRef = ref;
          }}
          className={appsContentStyles.appsContentContainer}>
          <MessagesList
            userMessages={messages}
            authUser={user}
            selectedUser={selectedUser}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
        </PerfectScrollbar>
      ) : (
        <Box
          className={clsx(classes.scrollChatNomain, 'scroll-chat-nomain')}
          component='span'>
          <Box component='span' className={classes.noMessage}>
            <IntlMessages id='chatApp.sayHi' /> {selectedUser.name}
          </Box>
        </Box>
      )}

      <AppsFooter mt='auto'>
        <AddNewMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </AppsFooter>
    </Box>
  );
};

export default MessagesScreen;
