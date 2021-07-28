import {makeStyles} from '@material-ui/core';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  tableRow: {
    '&:nth-child(odd)': {
      background: '#F4F7FE',
    },
  },
  tableCell: {
    maxWidth: '50rem',
    textOverflow: 'hidden',
    fontSize: 13,
    padding: 8,
    // whiteSpace: 'pre-wrap !important',
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 20,
    },
  },
  whiteSpace: {
    whiteSpace: 'nowrap',
  },
  anchar: {
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
  },
  badgeRoot: {
    padding: '3px 10px',
    borderRadius: 4,
    display: 'inline-block',
  },
}));
export default useStyles;
