import React, { useState } from 'react';
import AppGrid from '../../../../@crema/core/AppGrid';
import GridItem from './GridItem';
import ListEmptyResult from '../../../../@crema/core/AppList/ListEmptyResult';
import Modal from 'components/UI/Modal';
import useCheckMobileScreen from 'hooks/isMobile';
import ProductDetails from '../ProductDetails';

interface ProductGridProps {
  ecommerceList: any[];
  loading: boolean;
  isOrder?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  ecommerceList,
  loading,
  isOrder,
}) => {
  const [product, setProduct] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);
  const isMobile = useCheckMobileScreen();

  const productOnClickHandler = (item: any) => {
    console.log('item', item);
    setProduct(item);
    setShowModal(true);
  }

  return (
    <>
      <AppGrid
        delay={200}
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
        }}
        data={ecommerceList}
        renderRow={(item) => (
          <GridItem
            isOrder={isOrder}
            item={isOrder ? item.product : item}
            key={item.id}
            onClick={productOnClickHandler}
          />
        )}
        ListEmptyComponent={
          <ListEmptyResult content='No item found' loading={loading} />
        }
      />
      <Modal
        visible={showModal}
        isFullScreen={isMobile}
        maxWidth="md"
        modalTitle=" "
        onClose={() => setShowModal(false)}
        >
         <ProductDetails product={product} isOrder={isOrder} />
      </Modal>
    </>
  );
};

export default ProductGrid;
