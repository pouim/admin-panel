import React, { FC } from 'react';
import ProductListing from './ProductListing';
import {useIntl} from 'react-intl';
import AppsContainer from '../../@crema/core/AppsContainer';
import ProductsSidebar from './ProductsSidebar';

const Products: FC<any> = ({products, loding, isOrder}) => {
  return <ProductListing loding={loding} products={products} isOrder={isOrder} />;
};

export default Products;
