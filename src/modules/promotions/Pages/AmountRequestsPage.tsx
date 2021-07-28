import React from 'react';
import Box from '@material-ui/core/Box';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { Loader } from '@crema';
import CustomTable from 'components/UI/Table';
import { Button, Card, Typography } from '@material-ui/core';
import { useState } from 'react';
import Modal from 'components/UI/Modal';
import AmountRequst from './AmountRequest';
import { useAuthUser } from '@crema/utility/AppHooks';
import { useGetUser, useGetWithdraws } from 'hooks/hooks';
import moment from 'moment';

const AnalyzePage = () => {
  const {data}: any = useGetWithdraws();
  const {data: userData}: any = useGetUser();
  const [showModal, setShowModal] = useState<boolean>(false);


  const tableHeadingFileds = [
    {
      name: 'Date',
    },
    {
      name: 'Amount',
    },
    {
      name: 'Status',
    },
    {
      name: 'Description',
    },
  ];

  const sampleData = data?.data.map((item: any) => (
    {
      id: item?.id,
      created_at : moment(item?.created_at).format('MMMM, Do, YYYY, h:mm'),
      amount: item?.amount,
      status: item?.status,
      reason: item?.reason,
    }
  ) )

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <>
        <Card style={{marginBottom: '2rem', padding: '2rem'}}>
          <Box
            display={{xs: 'block', sm: 'flex', md: 'flex'}}
            alignItems='center'
            justifyContent='space-between'>
            <Box>
              <Typography style={{marginBottom: '.8rem'}} variant='h5'>
                Your Balance : {userData?.data?.balance} ₿
              </Typography>
            </Box>
            <Button
              onClick={() => setShowModal(true)}
              variant='contained'
              color='primary'>
              Request
            </Button>
          </Box>
        </Card>
        <Card>
          <CustomTable
            tableData={sampleData}
            tableHeadingFileds={tableHeadingFileds}
          />
        </Card>
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          maxWidth='xs'
          modalTitle='Amount Request'>
          <AmountRequst handleCloseModal={() => setShowModal(false)} />
        </Modal>
      </>
    </AppAnimate>
  );
};

export default AnalyzePage;
