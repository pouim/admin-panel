import React from 'react';
import AppAnimate from '../../@crema/core/AppAnimate';
import Products from 'components/Shop';
import { useGetOrders } from 'hooks/hooks';
import { Loader } from '@crema';

const ShopPage = () => {
  const {data, isFetching}: any = useGetOrders();

  console.log('products', data)
  return (
    <>
      {isFetching ? <Loader /> : <Products isOrder loding={isFetching} products={data && data?.data} />}
    </>
  );
};

export default ShopPage;
