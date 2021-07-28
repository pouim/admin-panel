import React from 'react';
import {Box, Hidden} from '@material-ui/core';
import AppSearch from '../../../@crema/core/SearchBar';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import {useDispatch} from 'react-redux';
// import {setViewType} from '../../../../redux/actions/Ecommerce';
// import {VIEW_TYPE} from '../../../../redux/reducers/Ecommerce';
import IconButton from '@material-ui/core/IconButton';
import {Fonts} from '../../../shared/constants/AppEnums';

interface ProductHeaderProps {
  onChange: (value: string) => void;
  viewType: any;
  isOrder?: Boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onChange,
  viewType,
  isOrder,
}) => {
  const dispatch = useDispatch();

  return (
    <Box display='flex' flex={1} alignItems='center'>
      <Box display='flex' flex={1}>
        <Box fontWeight={Fonts.BOLD} mr={3}>
          {isOrder ? 'My Orders' : 'Products'}
        </Box>
        <Hidden only='xs'>
          <Box component='span'>
            {/* (Showing 1 – 40 products of 93,723 products) */}
          </Box>
        </Hidden>
      </Box>
      <Box display='flex' alignItems='center'>
        {!isOrder && (
          <AppSearch
            placeholder='Search here'
            onKeyDown={onChange}    
          />
        )}
        {/* <IconButton onClick={() => {}}>
          <ListIcon
            color={viewType === 'LIST' ? 'primary' : 'inherit'}
          />
        </IconButton>
        <IconButton onClick={() => {}}>
          <AppsIcon
            color={viewType === 'GRID' ? 'primary' : 'inherit'}
          />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default ProductHeader;
