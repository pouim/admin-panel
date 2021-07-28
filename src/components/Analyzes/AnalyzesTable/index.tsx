import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../@crema/core/AppTableContainer';

interface AnalyzesTableProps {
  analyzesData: any;
  onTableRowClick: any;
}

const AnalyzesTable: React.FC<AnalyzesTableProps> = ({analyzesData, onTableRowClick}) => {
  return (
    <AppTableContainer>
      <Table className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {analyzesData?.map((data: any) => (
            <TableItem onTableRowClick={onTableRowClick} data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default AnalyzesTable;
