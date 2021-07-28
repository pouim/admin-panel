import React, { FC } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts} from '../../../shared/constants/AppEnums';

const useStyles = makeStyles(() => ({
  tableRowRoot: {     
    
    '& th': {
      fontSize: 13, 
      textAlign: 'center',
      padding: 8,
      fontWeight: Fonts.BOLD,
      borderRadius: '5px',
      color: '#000',
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

interface TableHeadingProps {
  tableHeadingFileds: any;
}

const TableHeading: FC<TableHeadingProps> = ({tableHeadingFileds}) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRowRoot}>
      {tableHeadingFileds?.map((filed: any) => (
        <TableCell>{filed.name}</TableCell>
      ))}
    </TableRow>
  );
};

export default TableHeading;
