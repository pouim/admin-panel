import React from 'react';
import Box from '@material-ui/core/Box';
import SenderMessageItem from './SenderMessageItem';
import ReceiverMessageItem from './ReceiverMessageItem';
import AppList from '../../../../@crema/core/AppList';


interface MessagesListProps {
  userMessages: any;
  authUser: any;
  selectedUser: any;
  onClickEditMessage: (data: any) => void;
  deleteMessage: (id: number) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  userMessages,
  authUser,
  selectedUser,
  onClickEditMessage,
  deleteMessage,
}) => {


  return (
    <Box px={6} py={6}>
      <AppList
        animation='transition.slideUpIn'
        data={userMessages}
        renderRow={item => {
          if (item?.user?.id === authUser?.id) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                key={item?.user?.id}
                onClickEditMessage={onClickEditMessage}
                deleteMessage={deleteMessage}
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                selectedUser={selectedUser}
                item={item}
                key={item?.user?.id}
              />
            );
          }
        }}
      />
    </Box>
  );
};

export default MessagesList;
