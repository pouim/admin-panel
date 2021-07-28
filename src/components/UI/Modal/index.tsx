import React, {FC, ReactNode} from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import BackIcon from '@material-ui/icons/NavigateBefore';
import { Box } from '@material-ui/core';

interface ModalProps {
  onClose: any;
  visible: boolean;
  children?: ReactNode;
  modalTitle?: string;
  className?: string;
  style?: any;
  maxWidth? : any;
  isFullScreen?: boolean;
}

const Modal: FC<ModalProps> = ({
  onClose,
  visible,
  children,
  modalTitle,
  maxWidth,
  isFullScreen,
  className,
  style
}) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby='simple-dialog-title'
      open={visible}
      fullWidth
      fullScreen={isFullScreen ? isFullScreen : false}
      maxWidth={maxWidth ? maxWidth : 'lg'}>
      {modalTitle && (
        <Box display='flex' alignItems='center'>
          {isFullScreen && <BackIcon onClick={onClose} />}
          <DialogTitle id='simple-dialog-title'>{modalTitle}</DialogTitle>
        </Box>
      )}
      <>{children && children}</>
    </Dialog>
  );
};

export default Modal;
