import {makeStyles} from '@material-ui/core/styles';
import {ThemeMode} from '../../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => {
  return {
    navItem: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      paddingLeft:
        theme.direction === 'ltr'
          ? (props: {level: number; themeMode: ThemeMode}) =>
              17 + 40 * props.level
          : 12,
      paddingRight:
        theme.direction === 'rtl'
          ? (props: {level: number; themeMode: ThemeMode}) =>
              17 + 40 * props.level
          : 12,
      color: (props: {level: number; themeMode: ThemeMode}) =>
        props.themeMode === ThemeMode.LIGHT
          ? theme.palette.common.white
          : theme.palette.common.white,
      fontWeight: 700,
      fontSize: 14,
      cursor: 'pointer',
      textDecoration: 'none!important',

      [theme.breakpoints.up('xl')]: {
        // fontSize: 16,
        marginTop: 4,
        marginBottom: 4,
        paddingLeft:
          theme.direction === 'ltr'
            ? (props: {level: number; themeMode: ThemeMode}) =>
                24 + 40 * props.level
            : 12,
        paddingRight:
          theme.direction === 'rtl'
            ? (props: {level: number; themeMode: ThemeMode}) =>
                24 + 40 * props.level
            : 12,
      },
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
    },
  };
});

export default useStyles;
