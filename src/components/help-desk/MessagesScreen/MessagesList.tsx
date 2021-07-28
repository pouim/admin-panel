import React from 'react';
import Box from '@material-ui/core/Box';
import SenderMessageItem from './SenderMessageItem';
import ReceiverMessageItem from './ReceiverMessageItem';
import AppList from '../../../@crema/core/AppList';
import useCheckMobileScreen from 'hooks/isMobile';


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
  const isMobile =  useCheckMobileScreen();
  const STYLE = isMobile? {minHeight: '100%'} : {maxHeight: '500px'};
  return (
    <Box px={6} py={6} style={STYLE}>
      <AppList
        animation='transition.slideUpIn'
        data={userMessages? userMessages : []}
        renderRow={item => {
          if (item?.is_current_user) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                key={item.id}
                onClickEditMessage={onClickEditMessage}
                deleteMessage={deleteMessage}
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                selectedUser={selectedUser}
                item={item}
                key={item.id}
              />
            );
          }
        }}
      />
    </Box>
  );
};

export default MessagesList;
