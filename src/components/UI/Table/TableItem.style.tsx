import {makeStyles} from '@material-ui/core';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  tableRow: {
    '&:nth-child(odd)': {
      background: '#F4F7FE',
    },    
    
  },
  tableCell: {
    maxWidth: '2rem',
    textOverflow: 'hidden',
    fontSize: 13,
    textAlign: 'center',
    padding: '1.5rem 0',
    // whiteSpace: 'pre-wrap !important',
    '&:first-child': {
      paddingLeft: 20,
    },
    '&:last-child': {
      paddingRight: 1,
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
