import React from 'react';
import Card from '@material-ui/core/Card';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import {Button, Checkbox, makeStyles} from '@material-ui/core';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {green} from '@material-ui/core/colors';
import clsx from 'clsx';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {useMutation} from 'react-query';
import gate from 'gate';
import {queryClient} from 'App';
import {showError, showMessage} from 'lib';

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

interface GridItemProps {
  item: any;
  isOrder?: boolean;
  onClick?: any;
}

const GridItem: React.FC<GridItemProps> = ({item, isOrder, onClick}) => {
  const accessToken = localStorage.getItem('token');
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    mutate: buyProduct,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.buyProduct);

  const onBuyItemHandler = () => {
    console.log('productID', item.id);
    buyProduct(
      {product: item.id},
      {
        onSuccess: (d: any) => {
          console.log(d);
          showMessage('You Successfully Bought The Item');
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
  };

  const classes = useStyles();
  return (
    <Box
      p={5}
      m={2}
      style={{borderRadius: '20px', minHeight: '300px'}}
      className='pointer item-hover'
      clone>
      <Card>
        <Box mt={2} mb={5} display='flex' justifyContent='center'>
          <div
            style={{
              position: 'relative',
              marginBottom: '0.2rem',
            }}
            onClick={() => onClick(item)}>
            <img
              style={{
                minWidth: '350px',
                marginTop: '-30px',
                maxHeight: '200px',
              }}
              src={item?.photo}
              alt='watch'
            />
          </div>
        </Box>
        <div style={{padding: '5px'}}>
          <Box
            mb={1}
            color='text.primary'
            fontWeight={Fonts.BOLD}
            fontSize={16}
            component='h3'
            className={classes.truncate}>
            {item?.title}
          </Box>

          <Box
            mb={10}
            mr={6}
            color='text.secondary'
            className={clsx(classes.truncate, classes.textSm)}>
            {item?.description}
          </Box>

          <Box
            mx={-1}
            display='flex'
            // flexWrap='wrap'
            alignItems='center'
            fontWeight={Fonts.MEDIUM}
            justifyContent='space-between'
            className={classes.textRes}>
            <Box px={1} mb={2} component='span' color='text.primary'>
              $ {item?.discount_price ? item?.discount_price : +item?.price}
            </Box>

            {item?.discount_price && (
              <Box
                px={1}
                mb={2}
                component='span'
                color='text.disabled'
                className={classes.lineThrough}>
                ${item?.price}
              </Box>
            )}
            {item?.discount_price && (
              <Box px={1} mb={2} component='span' color={green[500]}>
                {Math.floor(
                  ((item?.price - item?.discount_price) / item?.price) * 100,
                )}
                % <IntlMessages id='ecommerce.off' />
              </Box>
            )}
          </Box>
          <hr></hr>
        </div>
        {!isOrder ? (
          <Button
            onClick={onBuyItemHandler}
            color='primary'
            variant='contained'
            fullWidth={true}
            style={{marginTop: '1rem'}}>
            Buy Now
          </Button>
        ) : (
          <Button
            color='primary'
            variant='contained'
            fullWidth={true}
            style={{marginTop: '1rem'}}>
            <a href={`${item?.file}/?token=${accessToken}`} target='_blank'>
              Download File
            </a>
          </Button>
        )}
      </Card>
    </Box>
  );
};

export default GridItem;
