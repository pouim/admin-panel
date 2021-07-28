import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import useStyles from './TableItem.style';
import AppMenu from '../../../@crema/core/AppMenu';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import {Fonts} from '../../../shared/constants/AppEnums';
import useCheckMobileScreen from 'hooks/isMobile';

interface TableItemProps {
  data: any;
  onTableRowClick: any;
}

const TableItem: React.FC<TableItemProps> = ({data, onTableRowClick}) => {
  const classes = useStyles();
  const isMobile = useCheckMobileScreen();

  return (
    <TableRow
      onClick={() => onTableRowClick(data)}
      key={data?.name}
      className={`${classes.tableRow} item-hover pointer`}>
      <TableCell
        style={{whiteSpace: 'pre-line'}}
        align='left'
        className={classes.tableCell}>
        {data?.title}
      </TableCell>
      <TableCell
        style={{whiteSpace: 'pre-line'}}
        align='left'
        className={classes.tableCell}>
        {isMobile
          ? data?.description?.substring(0, 10)
          : data?.description?.substring(0, 50)}{' '}
        ...
      </TableCell>
      <TableCell
        style={{whiteSpace: 'pre-line'}}
        align='left'
        className={classes.tableCell}>
        {moment(data?.created_at).format('MMMM, Do, YYYY, h:mm:ss')}
      </TableCell>
      <TableCell align='right'>
        <AppMenu />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
