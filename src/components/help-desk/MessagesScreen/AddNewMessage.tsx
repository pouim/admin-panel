import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {useDropzone} from 'react-dropzone';
import {Box, IconButton, makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import {useIntl} from 'react-intl';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {CremaTheme} from '../../../types/AppContextPropsType';
import { Loader } from '@crema';
import SendingSpinner from 'components/UI/SendingSpinner';

const useStyles = makeStyles((theme: CremaTheme) => ({
  btnRoot: {
    backgroundColor: theme.palette.grey[100],
    '& .MuiIconButton-label': {
      width: 24,
      height: 24,
      paddingLeft: 3,
    },
  },
}));

interface AddNewMessageProps {
  sendFileMessage: (message: any) => void;
  onSendMessage: (message: string) => void;
  currentMessage: string | undefined;
  isLoading?: boolean;
}

const AddNewMessage: React.FC<AddNewMessageProps> = ({
  sendFileMessage,
  onSendMessage,
  isLoading,
  currentMessage = '',
}) => {
  const [message, setMessage] = useState<string>(currentMessage);
  const inputRef = useRef<any>(null);
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];

      sendFileMessage(file);
    },
  });

  useEffect(() => {
    setMessage(currentMessage);
  }, [currentMessage]);
  

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickSendMessage();
    }
  };

  const onClickSendMessage = () => {
    if (message) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const classes = useStyles();

  const {messages} = useIntl();

  return (
    <Box display='flex'>
      <TextField
        multiline
        style={{width: '200%'}}
        variant='outlined'
        placeholder={messages['chatApp.sendMessagePlaceholder'] as string}
        value={message}
        onChange={(event) => {
          if (event.target.value !== '\n') setMessage(event.target.value);
        }}
        onKeyPress={onKeyPress}
      />
      <Box ml={2} display='flex' flexDirection='row' alignItems='center'>
        <IconButton
          className={classes.btnRoot}
          onClick={onClickSendMessage}
          style={{height: 40, width: 40, marginRight: 10}}>
          <SendIcon />
        </IconButton>
        {message === '' ? (
          <Box
            {...getRootProps({
              className: clsx('dropzone'),
            })}>
            {isLoading ? (
              <SendingSpinner />
            ) : (
              <IconButton style={{height: 40, width: 40}}>
                <input {...getInputProps()} />
                <AttachFileIcon />
              </IconButton>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default AddNewMessage;
