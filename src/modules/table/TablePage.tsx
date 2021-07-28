import React from 'react';
import AppAnimate from '../../@crema/core/AppAnimate';
import {useGetTableData} from 'hooks/hooks';
import { Loader } from '@crema';
import AppCard from '@crema/core/AppCard';
import CustomTable from 'components/UI/Table';
import { Box, Card, Input, TextField, Typography } from '@material-ui/core';
import { showMessage } from 'lib';


const TablePage = () => {
  const {data, isFetching}: any = useGetTableData();
  console.log('table data', data);


  const tableHeadingFileds = [
    {
      name: 'Open Date',
    },
    {
      name: 'Change Date',
    },
    {
      name: 'Pairs',
    },
    {
      name: 'Type',
    },
    
    {
      name: 'Change',
    },
    {
      name: 'Note',
    },
  ];

 
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <>
        <Card>
          <CustomTable
            tableData={data && data?.data}
            tableHeadingFileds={tableHeadingFileds}
          />
        </Card>
      </>
    </AppAnimate>
  );
};

export default TablePage;
