import React, {useEffect, useState} from 'react';
import ProductsCategory from './ProductsCategory';
import {Box} from '@material-ui/core';
import {Fonts} from '../../../shared/constants/AppEnums';
import Divider from '@material-ui/core/Divider';
import PriceSelector from './PriceSelector';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../@crema/core/Scrollbar';
import AppList from '../../../@crema/core/AppList';
import CheckedCell from './CheckedCell';
// import {
//   brandData,
//   discountList,
//   idealFor,
//   productColors,
// } from '../../../@crema/services/db/ecommerce/ecommerceData';
import AppGrid from '../../../@crema/core/AppGrid';
import ColorCell from './ColorCell';
import RatingCell from './RatingCell';
import {useDispatch, useSelector} from 'react-redux';
// import {setFilters} from '../../../../redux/actions/Ecommerce';
import {AppState} from '../../../redux/store';

const useStyles = makeStyles({
  divider: {
    marginTop: 16,
  },
});
const ProductSidebar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const {filterData} = useSelector<AppState, AppState['ecommerce']>(
  //   ({ecommerce}) => ecommerce,
  // );
  // const [selectedBrand, setSelectedBrand] = useState<number[]>(
  //   filterData.brand,
  // );
  // const [selectedFor, setSelectedFor] = useState<number[]>(filterData.ideaFor);
  // const [selectedDiscount, setSelectedDiscount] = useState<number[]>(
  //   filterData.discount,
  // );
  // const [selectedColor, setSelectedColor] = useState<any[]>(filterData.color);
  // const [customerRating, setCustomerRating] = useState<any[]>(
  //   filterData.rating,
  // );

  // useEffect(() => {
  //   // dispatch(
  //   //   setFilters({
  //   //     title: filterData.title,
  //   //     brand: selectedBrand,
  //   //     ideaFor: selectedFor,
  //   //     discount: selectedDiscount,
  //   //     color: selectedColor,
  //   //     rating: customerRating,
  //   //   }),
  //   // );
  // }, [
  //   dispatch,
  //   filterData.title,
  //   selectedBrand,
  //   selectedFor,
  //   selectedDiscount,
  //   selectedColor,
  //   customerRating,
  // ]);

  // const onSelectBrand = (brandId: any) => {
  //   if (selectedBrand.some(brand => brand === brandId)) {
  //     setSelectedBrand(selectedBrand.filter(brand => brand !== brandId));
  //   } else {
  //     setSelectedBrand(selectedBrand.concat(brandId));
  //   }
  // };

  // const onSelectFor = (id: any) => {
  //   if (selectedFor.some(item => item === id)) {
  //     setSelectedFor(selectedFor.filter(item => item !== id));
  //   } else {
  //     setSelectedFor(selectedFor.concat(id));
  //   }
  // };

  // const onSelectDiscount = (id: any) => {
  //   if (selectedDiscount.some(item => item === id)) {
  //     setSelectedDiscount(selectedDiscount.filter(item => item !== id));
  //   } else {
  //     setSelectedDiscount(selectedDiscount.concat(id));
  //   }
  // };

  // const onSelectColor = (color: any) => {
  //   if (selectedColor.some(item => item === color)) {
  //     setSelectedColor(selectedColor.filter(item => item !== color));
  //   } else {
  //     setSelectedColor(selectedColor.concat(color));
  //   }
  // };

  // const onSelectRating = (id: any) => {
  //   if (customerRating.some(item => item === id)) {
  //     setCustomerRating(customerRating.filter(item => item !== id));
  //   } else {
  //     setCustomerRating(customerRating.concat(id));
  //   }
  // };

  const data = [
    {
      id: 1,
      name: '60% or more',
    },

    {
      id: 2,
      name: '50% or more',
    },
    {
      id: 3,
      name: '40% or more',
    },

    {
      id: 4,
      name: '30% or more',
    },
    {
      id: 5,
      name: '20% or more',
    },
  ];

  return (
    <Scrollbar className='scroll-app-sidebar'>
      <Box p={6}>
        <Box component='h5' mb={2} fontWeight={Fonts.MEDIUM}>
          Filter By
        </Box>
        <div style={{marginTop: '1rem'}}></div>
        <Box color='text.secondary' mb={4} fontWeight={Fonts.MEDIUM}>
          CATEGORIES
        </Box>

        <ProductsCategory />
        <Divider className={classes.divider} />
        <Box color='text.secondary' my={4} fontWeight={Fonts.MEDIUM}>
          DISCOUNT
          <AppList
            data={data}
            renderRow={data => (
              <CheckedCell
                key={data.id}
                data={data}
                onChange={() => {}}
                selected={[]}
              />
            )}
          />
        </Box>
        <Divider className={classes.divider} />
      </Box>
    </Scrollbar>
  );
};

export default ProductSidebar;
