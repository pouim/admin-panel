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
  onTableRowClick?: any;
}

const TableItem: React.FC<TableItemProps> = ({data, onTableRowClick}) => {
  const classes = useStyles();
  const isMobile = useCheckMobileScreen();

  return (
    <TableRow
      onClick={() => onTableRowClick(data)}
      key={data?.id}
      className={`${classes.tableRow} item-hover pointer`}>
      {Object.keys(data)
        ?.map((key) => [Number(key), data[key]])
        ?.slice(1)
        ?.map((item) => (
          <TableCell
            style={{
              whiteSpace: 'pre-line',
              color:
                item[1] === 'CONFIRMED'
                  ? 'green'
                  : item[1] === 'DECLINED'
                  ? 'red'
                  : item[1] === 'PENDING'
                  ? '#F1CD15'
                  : '#000',
            }}
            align='left'
            className={classes.tableCell}>
            {item[1]}
          </TableCell>
        ))}
    </TableRow>
  );
};

export default TableItem;
