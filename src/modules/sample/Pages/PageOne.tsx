import React from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../../@crema/core/AppAnimate';
import HelpDesk from 'components/help-desk';

const PageOne = () => {
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
       <HelpDesk />
    </AppAnimate>
  );
};

export default PageOne;
