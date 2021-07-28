import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles(() => ({
  tableRowRoot: {
    '& th': {
      fontSize: 13,
      padding: 8,
      fontWeight: Fonts.BOLD,
      '&:first-child': {
        paddingLeft: 20,
      },
      // '&:nth-child(2)': {
      //   paddingRight: 10,
      //   paddingLeft: 50,
      // },
      '&:last-child': {
        paddingRight: 1,
      },
    },
  },
}));

const TableHeading = () => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell>Title</TableCell>
      <TableCell>Description</TableCell>
      <TableCell>Date</TableCell>
    </TableRow>
  );
};

export default TableHeading;
