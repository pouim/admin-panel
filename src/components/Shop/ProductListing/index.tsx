import React, {FC, useContext, useEffect, useState} from 'react';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import ProductHeader from '../ProductHeader';
import {useDispatch, useSelector} from 'react-redux';
import BitcoinPic from '../../../assets/images/Bitcoin.png';
// import {VIEW_TYPE} from '../../../../redux/reducers/Ecommerce';
import ProductGrid from './ProductGrid';
// import {
//   onGetEcommerceData,
//   setFilters,
// } from '../../../../redux/actions/Ecommerce';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import {Box, fade} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {AppContext} from '../../../@crema';
import {AppState} from '../../../redux/store';
import { useGetProducts } from 'hooks/hooks';
import { useMutation } from 'react-query';
import gate from 'gate';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    '& > div': {
      width: '100%',
    },
  },
}));

const ProductListing: FC<any> = ({products, loding, isOrder}) => {
  const [productsData, setProductsData] = useState(products)
  const { mutate: searchProducts, data }: any = useMutation(gate.searchProducts);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {theme} = useContext(AppContext);
  

  const searchProduct = (e: any) => {
    if (e.key === 'Enter') {
      console.log('title', e.target.value);
      searchProducts(e.target.value)
      
    }
  };


  useEffect(() => {
    if(data)
    setProductsData(data?.data);
  }, [data])

  

  
  return (
    <>
      <AppsHeader>
        <ProductHeader
          isOrder={isOrder}
          viewType={'Grid'}
          onChange={searchProduct}
        />
      </AppsHeader>

      {/* <AppsContent style={{backgroundColor: 'red'}}> */}
        <Box className={classes.root} flex={1} display='flex' p={2} height={1}>
          <ProductGrid
            isOrder={isOrder}
            ecommerceList={isOrder ? products : productsData}
            loading={loding}
          />
        </Box>
      {/* </AppsContent> */}
    </>
  );
};

export default ProductListing;
