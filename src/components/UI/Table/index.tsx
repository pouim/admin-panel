import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../@crema/core/AppTableContainer';

interface AnalyzesTableProps {
  tableData: any;
  onTableRowClick?: any;
  tableHeadingFileds: any;
}

const CustomTable: React.FC<AnalyzesTableProps> = ({
  tableData,
  onTableRowClick,
  tableHeadingFileds,
}) => {
  return (
    <AppTableContainer>
      <Table className='table'>
        <TableHead>
          <TableHeading tableHeadingFileds={tableHeadingFileds} />
        </TableHead>
        <TableBody>
          {tableData?.map((data: any) => (
            <TableItem
              onTableRowClick={onTableRowClick ? onTableRowClick : () => {}}
              data={data}
              key={data.id}
            />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default CustomTable;
