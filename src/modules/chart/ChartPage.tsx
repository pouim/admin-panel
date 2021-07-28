import React from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import HelpDesk from 'components/help-desk';
import Products from 'components/Shop';
import Chart from 'components/Chart';

const ChartPage = () => {

  const sampleData =  { 
    dataOne: [
      {month: 'Jan', number: 150},
      {month: 'Feb', number: 280},
      {month: 'Mar', number: 180},
      {month: 'Apr', number: 290},
      {month: 'May', number: 190},
      {month: 'Jun', number: 320},
      {month: 'Jul', number: 240},
      {month: 'Aug', number: 300},
      {month: 'Sep', number: 270},
      {month: 'Oct', number: 350},
      {month: 'Nov', number: 280},
      {month: 'Dec', number: 380},
    ],
    dataTwo: [
      {month: 'Jan', number: 20},
      {month: 'Feb', number: 170},
      {month: 'Mar', number: 40},
      {month: 'Apr', number: 200},
      {month: 'May', number: 70},
      {month: 'Jun', number: 270},
      {month: 'Jul', number: 100},
      {month: 'Aug', number: 310},
      {month: 'Sep', number: 130},
      {month: 'Oct', number: 350},
      {month: 'Nov', number: 170},
      {month: 'Dec', number: 200},
    ],
    dataThree: [
      {month: 'Jan', number: 110},
      {month: 'Feb', number: 230},
      {month: 'Mar', number: 100},
      {month: 'Apr', number: 290},
      {month: 'May', number: 160},
      {month: 'Jun', number: 320},
      {month: 'Jul', number: 220},
      {month: 'Aug', number: 450},
      {month: 'Sep', number: 260},
      {month: 'Oct', number: 490},
      {month: 'Nov', number: 240},
      {month: 'Dec', number: 200},
    ],
  };
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
       <Chart data={sampleData} />
    </AppAnimate>
  );
};

export default ChartPage;
