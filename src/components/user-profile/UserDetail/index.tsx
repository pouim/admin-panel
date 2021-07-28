import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {Scrollbar} from '../../../@crema';
import Box from '@material-ui/core/Box';
import ContactActions from './ContactActions';
import PersonalDetails from './PersonalDetails';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import {TransitionProps} from '@material-ui/core/transitions';
import { useGetUser } from 'hooks/hooks';

const useStyles = makeStyles(() => ({
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  avatar: {
    width: 55,
    height: 55,
    marginBottom: 8,
  },
  borderBottomClass: {
    borderBottom: `1px solid ${grey[300]}`,
  },
}));
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const UserDetail: React.FC<any> = ({
  isShowDetail,
  onShowDetail,
  onOpenEditUser,
}) => {
  const dispatch = useDispatch();
  
  const classes = useStyles();

  const {data, isFetching}: any = useGetUser();


  return (
    <>
      <Dialog
        open={isShowDetail}
        onClose={() => onShowDetail(false)}
        TransitionComponent={Transition}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.dialogBox}>
        <Scrollbar>
          <Box p={5} className={classes.borderBottomClass}>
            <ContactActions
              onOpenEditUser={onOpenEditUser}
              // user={contact!}
            />
            <Box
              mt={{sm: -3}}
              display='flex'
              flexDirection='column'
              alignItems='center'>
              {data && data?.data?.profile_photo ? (
                <Avatar className={classes.avatar} src={data?.data?.profile_photo} />
              ) : (
                <Avatar className={classes.avatar}>
                  {data?.data?.username?.toUpperCase()}
                </Avatar>
              )}
              <Box component='h4' fontWeight={Fonts.MEDIUM}>
                {data?.data?.username}
              </Box>
            </Box>
          </Box>

          <Box py={5} pl={{xs: 8, lg: 8, lx: 10}}>
            <Scrollbar style={{maxHeight: 400}}>
              <PersonalDetails userData={data && data?.data} />
            </Scrollbar>
          </Box>
        </Scrollbar>
      </Dialog>
    </>
  );
};

export default UserDetail;
