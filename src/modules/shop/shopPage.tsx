import React from 'react';
import AppAnimate from '../../@crema/core/AppAnimate';
import Products from 'components/Shop';
import { useGetProducts } from 'hooks/hooks';
import { Loader } from '@crema';

const ShopPage = () => {
  const {data, isFetching}: any = useGetProducts();

  console.log('products', data)
  return (
    <>
      {isFetching ? <Loader /> : <Products loding={isFetching} products={data && data?.data} />}
    </>
  );
};

export default ShopPage;
