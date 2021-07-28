import React, {useState} from 'react';
import {Button, Checkbox, makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import Grid from '@material-ui/core/Grid';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CremaTheme} from '../../../../../types/AppContextPropsType';
import {useMutation} from 'react-query';
import gate from 'gate';
import {showError, showMessage} from 'lib';

const useStyles = makeStyles((theme: CremaTheme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    borderRadius: '20px',
    marginBottom: 20,
    /*
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },*/ '& .BrainhubCarousel__container': {
      // border: '1px solid #acacac',
      marginLeft: 10,

      borderRadius: 10,
      maxWidth: 450,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 300,
        marginBottom: 20,
      },
      '& .BrainhubCarousel': {
        height: '100%',
      },
    },
    '& .BrainhubCarousel__dots': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      '& .BrainhubCarousel__thumbnail': {
        opacity: 1,
        backgroundColor: 'transparent',
        borderRadius: 10,
        marginBottom: 10,
        border: '1px solid #A0A5B9',
        '&.BrainhubCarousel__thumbnail--selected': {
          border: `solid 2px #7c7c7c`,
        },
      },
      flexDirection: 'column',
      '& img': {
        height: 80,
      },
    },
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
}));

interface ProductImageSlideProps {
  product: any;
  isOrder?: boolean;
}

const ProductImage: React.FC<ProductImageSlideProps> = ({product, isOrder}) => {
  const accessToken = localStorage.getItem('token');
  const classes = useStyles();
  const {
    mutate: buyProduct,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.buyProduct);

  const onBuyItemHandler = () => {
    console.log('productID', product?.id);
    buyProduct(
      {product: product?.id},
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

  return (
    <Grid item sm={12} md={4}>
      <Box className={classes.root}>
        <img style={{borderRadius: '8px'}} src={product?.photo} alt='' />
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        pl={{xs: 0, md: 5, lg: 5, xl: 15}}>
        {!isOrder ? (
          <Button
            onClick={onBuyItemHandler}
            style={{width: 140}}
            variant='contained'
            color='primary'>
            Buy Now
          </Button>
        ) : (
          <Button style={{width: 140}} variant='contained' color='primary'>
            <a href={`${product?.file}/?token=${accessToken}`} target='_blank'>
              Download
            </a>
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default ProductImage;
