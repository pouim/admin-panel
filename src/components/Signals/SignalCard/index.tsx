import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import {Button, Checkbox, makeStyles} from '@material-ui/core';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {green} from '@material-ui/core/colors';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {CremaTheme} from '../../../types/AppContextPropsType';
import Modal from 'components/UI/Modal';
import { AppState } from 'redux/store';
import gate from 'gate';
import { useMutation } from 'react-query';
import { queryClient } from 'App';
import { showError } from 'lib';

const useStyles = makeStyles((theme: CremaTheme) => ({
  textUppercase: {
    textTransform: 'uppercase',
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
  textBase: {
    fontSize: 16,
  },
  textSm: {
    fontSize: 14,
  },
  textXs: {
    fontSize: 12,
  },
  textRes: {
    fontSize: 12,
    [theme.breakpoints.up('xl')]: {
      fontSize: 14,
    },
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    padding: '4px 12px',
    fontSize: 12,
  },
}));



const SignalCard: React.FC<any> = ({item, onClick}) => {
  const dispatch = useDispatch();
  const {id} = useSelector((state: any) => state.auth.user);
  const history = useHistory();
  const [isParticipated, setIsParticipated] = useState<any>('start');
  const {
    mutate: reqParticipate,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.reqParticipate);

  const classes = useStyles();

  const onParticipateHandler = () => {
    reqParticipate(
      {id: item.id},
      {
        onSuccess: (d: any) => {
          console.log(d);
          queryClient.invalidateQueries('signals');
        },
        onError: (d: any) => {
          console.log(d);
          showError(d.data, {
            color: 'red',
            gravity: 'bottom',
            position: 'left',
          });
        },
      },
    );
  }


  return (
    <Box
      p={5}
      m={2}
      style={{borderRadius: '20px'}}
      className='pointer item-hover'
      clone>
      <Card>
        <Box display='flex' justifyContent='center'>
          <div style={{position: 'relative', marginBottom: '0.2rem'}}>
            <img
              onClick={() => onClick(item)}
              style={{
                minWidth: '350px',
                marginTop: '-20px',
                maxHeight: '200px',
              }}
              src={item.image}
              alt='watch'
            />
            <div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 35,
                  left: '16%',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {moment(item?.signal_date).format('MMMM, Do, YYYY, h:mm:ss')}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 5,
                  left: '16%',
                  fontSize: '15px',
                  color: '#fff',
                }}>
                {item?.subtitle}
              </div>
            </div>
          </div>
        </Box>
        <hr></hr>

        <Box
          mb={1}
          mt={4}
          color={
            item?.status === 'WON'
              ? 'green'
              : item?.status === 'PENDING'
              ? '#F1CD15'
              : 'red'
          }
          fontWeight={Fonts.BOLD}
          fontSize={16}
          component='h3'
          className={classes.truncate}
          style={{textAlign: 'center'}}>
          {item?.status}
        </Box>

        <Box
          mb={1}
          color='#000'
          fontWeight={Fonts.BOLD}
          fontSize={18}
          component='h1'
          className={classes.truncate}
          style={{textAlign: 'center'}}>
          Banckroll {item?.bankroll_percent}$
        </Box>

        <Box
          mb={1}
          color='#000'
          fontWeight={Fonts.BOLD}
          fontSize={18}
          component='h1'
          className={classes.truncate}
          style={{textAlign: 'center'}}>
          {item?.odd} %
        </Box>

        <Box
          mb={1}
          mt={4}
          color='text.primary'
          fontWeight={Fonts.BOLD}
          fontSize={16}
          component='h3'
          className={classes.truncate}>
          {item?.title}
        </Box>

        <Box
          mb={3}
          mr={6}
          color='text.secondary'
          className={clsx(classes.truncate, classes.textSm)}>
          {item?.description}
        </Box>

        <hr></hr>
        {/* <Box
          mb={4}
          mt={4}
          color='gray'
          fontWeight={Fonts.BOLD}
          fontSize={13}
          component='h1'
          className={classes.truncate}
          style={{textAlign: 'center'}}>
          {moment(item?.created_at, 'YYYYMMDD').fromNow()}
        </Box>
        <hr></hr>
        <Box
          mx={-1}
          display='flex'
          // flexWrap='wrap'
          alignItems='center'
          fontWeight={Fonts.MEDIUM}
          justifyContent='space-between'
          className={classes.textRes}>
          {!item?.users?.includes(id) ? (
            <>
              {' '}
              <Button
                onClick={onParticipateHandler}
                color='primary'
                variant='contained'
                // fullWidth={true}
                style={{marginTop: '1rem'}}>
                Yes
              </Button>
              <Button
                onClick={() => setIsParticipated(false)}
                color='secondary'
                variant='contained'
                // fullWidth={true}
                style={{marginTop: '1rem'}}>
                No
              </Button>{' '}
            </>
          ) : item?.users?.includes(id) ? (
            <Button
              variant='contained'
              fullWidth={true}
              style={{marginTop: '1rem', background: '#00AA45', color: '#fff'}}>
              Participated
            </Button>
          ) : (
            <Button
              color='secondary'
              variant='contained'
              fullWidth={true}
              style={{marginTop: '1rem'}}>
              Not Participated
            </Button>
          )}
        </Box> */}
        {/* <Button
          color='primary'
          variant='contained'
          fullWidth={true}
          style={{marginTop: '1rem'}}>
          Buy Now
        </Button> */}
      </Card>
    </Box>
  );
};

export default SignalCard;
