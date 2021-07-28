import React from 'react';
import Card from '@material-ui/core/Card';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import {Button, Checkbox, makeStyles} from '@material-ui/core';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {green} from '@material-ui/core/colors';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CremaTheme} from '../../../types/AppContextPropsType';
import { useGetSubscriptions } from 'hooks/hooks';
import { useMutation } from 'react-query';
import gate from 'gate';
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



const PlanCard: React.FC<any> = ({item, userSubscriptionData}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    mutate: reqSubscription,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.reqSubscription);


  const isAlreadySubscribed = () => {
      return userSubscriptionData
        ?.map((i: any) => i.plan)
        ?.includes(item?.id);
  }

  const onSubscribeHandler = () => {
    reqSubscription(
        {plan: item.id},
        {
          onSuccess: (d: any) => {
            console.log(d);
            queryClient.invalidateQueries('user-plans');
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

  const classes = useStyles();
  console.log(isAlreadySubscribed());
  console.log({userSubscriptionData});

  return (
    <Box
      p={5}
      m={2}
      className='pointer item-hover'
      onClick={() => {
        // dispatch(setCurrentProduct(item));
        // history.push('/ecommerce/product_detail/' + item.id);
      }}
      clone>
      <Card>
        <Box mt={2} mb={5} display='flex' justifyContent='center'>
          <img width={60} height={60} src={item?.icon} alt='watch' />
        </Box>

        <Box
          mb={1}
          display='flex'
          justifyContent='center'
          color='text.primary'
          fontWeight={Fonts.BOLD}
          fontSize={22}
          component='h3'
          className={classes.truncate}>
          {item?.display_name}
        </Box>

        <Box
          mb={1}
          mt={3}
          display='flex'
          justifyContent='center'
          color='text.primary'
          fontWeight={Fonts.BOLD}
          fontSize={70}
          component='h1'
          className={classes.truncate}>
          {item?.price} $
        </Box>

        <Box
          mb={5}
          mt={1}
          display='flex'
          justifyContent='center'
          color='text.primary'
          fontWeight={Fonts.BOLD}
          fontSize={18}
          component='h1'
          className={classes.truncate}>
          for {item?.days} days
        </Box>
        <hr></hr>

        <Box
          mb={1}
          mt={1}
          display='flex'
          justifyContent='center'
          color='text.primary'
          fontWeight={Fonts.BOLD}
          fontSize={15}
          component='h1'
          className={classes.truncate}>
          {item?.description}
        </Box>

        {isAlreadySubscribed() ? (
          <Button
            variant='contained'
            fullWidth={true}
            style={{marginTop: '1rem', background: '#00AA45', color: '#fff'}}>
            Already Subscribed
          </Button>
        ) : (
          <Button
            onClick={onSubscribeHandler}
            color='primary'
            variant='contained'
            fullWidth={true}
            style={{marginTop: '1rem'}}>
            Subscribe Now
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default PlanCard;
