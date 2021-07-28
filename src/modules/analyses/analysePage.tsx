import React from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../@crema/core/AppAnimate';
import HelpDesk from 'components/help-desk';
import Products from 'components/Shop';
import AnalyzesRequests from 'components/Analyzes';
import {useGetAnalyzes} from 'hooks/hooks';
import { Loader } from '@crema';

const AnalyzePage = () => {
  const {data, isFetching}: any = useGetAnalyzes();

  console.log('analyzes', data);
  return (
    <>
      {isFetching? <Loader /> : <AnalyzesRequests data={data?.data} />}
    </>
  );
};

export default AnalyzePage;
