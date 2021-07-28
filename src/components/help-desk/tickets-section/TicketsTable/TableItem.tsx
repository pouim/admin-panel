import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';
import moment from 'moment';

interface TableItemProps {
  data: any;
  onRowClick?: any;
}

const TableItem: React.FC<TableItemProps> = ({data, onRowClick}) => {
  const classes = useStyles();
  return (
    <TableRow
      key={data?.id}
      className='item-hover pointer'
      onClick={() => onRowClick(data?.id)}
      >
      <TableCell component='th' scope='row' className={classes.tableCell}>
        <Box className={classes.anchar}>{data?.id}</Box>
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {moment(data?.created_at).format('MMMM, Do, YYYY')}
      </TableCell>
      <TableCell align='left' className={classes.tableCell}>
        {data?.subject}
      </TableCell>
      <TableCell
        align='left'
        className={classes.tableCell}
        style={{
          color: data?.complete ? 'green' : '#F1CD15',
          fontWeight: 'bold',
        }}>
        {data?.complete ? 'COMPLETED' : 'OPEN'}
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
