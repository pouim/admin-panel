import React, {useEffect, useRef, useState} from 'react';
import Box from '@material-ui/core/Box';
import {useDispatch, useSelector} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddNewMessage from './AddNewMessage';
import MessagesList from './MessagesList';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import moment from 'moment';
import Header from './Header';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import grey from '@material-ui/core/colors/grey';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import {useAppsContentStyles} from '../../../@crema/core/AppsContainer/AppsContent';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';

import {AppState} from '../../../redux/store';
import { queryClient } from 'App';
import { useMutation } from 'react-query';
import gate from 'gate';

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
  selectedUser?: any;
  ticketNumber: any;
  handleShowMessage?: any;
  showBackBtn?: boolean;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({
  selectedUser,
  ticketNumber,
  handleShowMessage,
  showBackBtn = false,
}) => {
  const [message, setMessage] = useState<string | undefined>('');
  const { mutate: getMsg, data }: any = useMutation(gate.messages);
  const tickets: any = queryClient.getQueryData('tickets');
  const messagesEndRef: any = useRef();
  const ticket = tickets && tickets?.data?.results?.filter((t: any) => t.id == ticketNumber);
  const [text, setText] = useState('file');
  const { mutate: sendMessage, isLoading: sendAttachmentLoadin } = useMutation(gate.sendMessages);
  const { mutate: sendTextMessage } = useMutation(gate.sendTextMessages);

  const { mutate: reqComplateTicket, isLoading: closeTicketLoading } = useMutation(
      gate.complateTicket,
  );
  
  const [files, setFiles] = useState<any>([]);
  const [isEdit, setIsEdit] = useState(false);

  const userMessages = {
    messageData: [
      {
        id: 1,
        sender: 'sender_id',
        message: 'Hello',
        message_type: 'TEXT',
        time: 'Fri, May 08, 2020 7:30 PM',
      },

      {
        id: 2,
        sender: 'sender_id',
        message: 'How Are You',
        message_type: 'TEXT',
        time: 'Fri, May 08, 2020 7:30 PM',
      },
      {
        id: 3,
        sender: 33,
        message: 'Well',
        message_type: 'TEXT',
        time: 'Fri, May 08, 2020 7:30 PM',
      },
      {
        id: 4,
        sender: 33,
        message: 'Tnx Alot',
        message_type: 'TEXT',
        time: 'Fri, May 08, 2020 7:30 PM',
      },
    ],
  };

  const user = useAuthUser();

  let _scrollBarRef: any = null;

  useEffect(() => {
    getMsg(ticketNumber);
}, [ticketNumber]);


console.log({data});
const handleUploadChange = (e: any) => {
  [...e.target.files]?.map((i) => {
      setFiles([URL.createObjectURL(i)]);
  });
};

const handleCloseTicket = () => {
  const formData: FormData = new FormData();
  const bool: any = !ticket[0]?.complete;
  formData.append('complete', bool);
  reqComplateTicket(
      { id: ticket[0]?.id, data: formData },
      {
          onSuccess: (data) => {
              queryClient.prefetchQuery('message');
              queryClient.prefetchQuery('tickets');
          },
      },
  );
};

const handleSetText = (e: any) => {
  setText(e.target.value);
};



  useEffect(() => {
    // if (
    //   data &&
    //   data?.data &&
    //   data?.data.length > 0
    // ) {
    //   _scrollBarRef._container.scrollTop = 99999;
    // }
    _scrollBarRef._container.scrollTop = 99999;

  }, [data, _scrollBarRef]);

  const sendFileMessage = (fileMessage: any) => {
    // const data: any = {
    //   ...fileMessage,
    //   time: moment().format('llll'),
    // };
    // dispatch(onSendMessage(selectedUser.channelId, data));

    console.log(fileMessage)

    let formData = new FormData();
        fileMessage && formData.append('attachment', fileMessage);
        formData.append('text', text);
        formData.append('ticket', ticket[0].id);

        sendMessage(formData, {
            onSuccess: () => {
                // reset();
                getMsg(ticketNumber);
                queryClient.prefetchQuery('tickets');
                // scrollToBottom();
                setFiles([]);
            },
            onError: (d: any) => {
              console.log(d?.data)
            }
        });
  };

  const onSend = (message: string) => {
    sendTextMessage(
      {text: message, ticket: ticket[0].id},
      {
        onSuccess: () => {
          // reset();
          getMsg(ticketNumber);
          queryClient.prefetchQuery('tickets');
          // scrollToBottom();
          setFiles([]);
        },
        onError: (d: any) => {
          console.log(d?.data);
        },
      },
    );
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
    <Box
      style={{minWidth: '70%'}}
      display='flex'
      height={1}
      flexDirection='column'>
      <AppsHeader>
        <Header
          onBackClick={handleShowMessage}
          showBackBtn={showBackBtn}
          selectedUser={selectedUser}
          deleteConversation={deleteConversation}
        />
      </AppsHeader>

      {userMessages && user ? (
        <PerfectScrollbar
          style={{marginBottom: '1rem'}}
          ref={(ref) => {
            _scrollBarRef = ref;
          }}
          className={appsContentStyles.appsContentContainer}>
          <MessagesList
            userMessages={data && data?.data}
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

      {/* <AppsFooter mt='auto'> */}
        <AddNewMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
          isLoading={sendAttachmentLoadin}
        />
      {/* </AppsFooter> */}
    </Box>
  );
};

export default MessagesScreen;
