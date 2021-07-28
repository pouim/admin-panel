import React from 'react';
import {Box} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

interface ProductViewProps {
  product: any;
}

const ProductView: React.FC<ProductViewProps> = ({product}) => {
  return (
    <Grid item sm={12} md={8}>
      <Box component='h3' color='text.primary' fontSize={20} mb={1}>
        ${product?.price}
        <Box
          component='span'
          color='text.secondary'
          fontSize={16}
          ml={3}
          style={{textDecoration: 'line-through'}}>
          ${product?.discount_price}
        </Box>
      </Box>
      <Box color='primary.main' fontSize={16} mb={4}>
        Available Now
      </Box>
      <Box component='p' color='text.secondary'>
        {product?.description}
      </Box>
      <Divider style={{marginTop: 15, marginBottom: 15}} />
    </Grid>
  );
};

export default ProductView;
