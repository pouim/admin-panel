import React from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import {useGetAnalyzes, useGetPromotions} from 'hooks/hooks';
import { Loader } from '@crema';
import AppCard from '@crema/core/AppCard';
import CustomTable from 'components/UI/Table';
import { Box, Card, Input, TextField, Typography } from '@material-ui/core';
import { showMessage } from 'lib';
import useCheckMobileScreen from 'hooks/isMobile';
import moment from 'moment';
import { useAuthUser } from '@crema/utility/AppHooks';

const AnalyzePage = () => {
  const {data, isFetching}: any = useGetPromotions();
  const user = useAuthUser();

  console.log('promotions', data);

  const EstimatedIncome = data?.data
    .map((item: any) => item?.income)
    ?.reduce((a: any, b: any) => a + b, 0);

  const totlaPromotions = data?.data.length;  

  

  const tableHeadingFileds = [
    {
      name: 'Date',
    },
    {
      name: 'User Name',
    },
    {
      name: 'Status',
    },
    {
      name: 'Income',
    },
  ];

  const generatedData = data?.data.map((item: any) => ({
    id: item?.id,
    created_at: moment(item?.created_at).format('MMMM, Do, YYYY, h:mm'),
    username: item?.client?.username,
    status: item?.status,
    income: `${item?.income}$`,
  }));


  



  const copyToClipBoard = async (copyMe: any) => {
    try {
        await navigator.clipboard.writeText(copyMe);
        showMessage('Copied!');
    } catch (err) {
      showMessage('Failed to copy!', {gravity: 'top', position: 'right', color: '#ff4154'});
    }
};
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <>
        <Card style={{marginBottom: '2rem', padding: '2rem'}}>
          <Box
            display={{ xs: "block", sm: "flex", md: "flex" }}
            alignItems='center'
            justifyContent='space-between'>
            <Box mb={{ xs: 4  }}>
              <Typography style={{marginBottom: '.8rem'}} variant='h5'>
                Estimated income : {EstimatedIncome} $
              </Typography>
              <Typography variant='subtitle1'>
                number of promotions : {totlaPromotions}
              </Typography>
            </Box>
            <TextField
              onClick={(e: any) => copyToClipBoard(e.target.value)}
              value= {user?.promotion_code}
              label="Promotion Code"
            />
          </Box>
        </Card>
        <Card>
          <CustomTable
            tableData={generatedData}
            tableHeadingFileds={tableHeadingFileds}
          />
        </Card>
      </>
    </AppAnimate>
  );
};

export default AnalyzePage;
