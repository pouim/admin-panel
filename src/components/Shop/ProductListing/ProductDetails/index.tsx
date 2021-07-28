import React, {useEffect} from 'react';
import ProductImage from './ProductImage';
import AppCard from '../../../../@crema/core/AppCard';
import Header from './Header';
import ProductView from './ProductView';
import GridContainer from '../../../../@crema/core/GridContainer';
import {InfoView} from '../../../../@crema';

interface ProductDetailProps {
    product: any;
    isOrder?: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({product, isOrder}) => {
  return (
    <>
      <AppCard>
        <Header product={product} />
        <GridContainer>
          <ProductImage product={product} isOrder={isOrder} />
          <ProductView product={product} />
        </GridContainer>
      </AppCard>
    </>
  );
};

export default ProductDetail;
