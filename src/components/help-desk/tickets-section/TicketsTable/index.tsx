import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '../../../../@crema/core/AppTableContainer';

interface TicketsTableTableProps {
  tickets: any;
  onRowClick?: any;
}

const TicketsTable: React.FC<TicketsTableTableProps> = ({
  tickets,
  onRowClick,
}) => {
  return (
    <AppTableContainer>
      <Table style={{overflow: 'visible'}} stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {tickets?.map((data: any) => (
            <TableItem onRowClick={onRowClick} data={data} key={data.id} />
          ))}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default TicketsTable;
