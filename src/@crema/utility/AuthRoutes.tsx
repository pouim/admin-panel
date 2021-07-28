import React, {ReactNode, useContext, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {matchRoutes} from 'react-router-config';
import qs from 'qs';
import AppContext from './AppContext';
import {useAuthToken} from './AppHooks';
import {Loader} from '../index';
import {checkPermission} from './Utils';
import {initialUrl} from '../../shared/constants/AppConst';
import {setInitialPath} from '../../redux/actions';
import {AppState} from '../../redux/store';
import AppContextPropsType from '../../types/AppContextPropsType';
import {NavStyle, ThemeMode, ThemeStyle} from '../../shared/constants/AppEnums';

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({children}) => {
  const {pathname, search} = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    routes,
    changeNavStyle,
    updateThemeStyle,
    updateThemeMode,
    setRTL,
  } = useContext<AppContextPropsType>(AppContext);

  const [loading, user] = useAuthToken();
  const {initialPath} = useSelector<AppState, AppState['settings']>(
    ({settings}) => settings,
  );
  const currentRoute = matchRoutes(routes, pathname)[0].route;
  let isPermitted = checkPermission(currentRoute.auth, user ? user.role : null);

  useEffect(() => {
    function setInitPath() {
      if (
        initialPath === `${process.env.PUBLIC_URL}/` &&
        [
          `${process.env.PUBLIC_URL}/signin`,
          `${process.env.PUBLIC_URL}/signup`,
          `${process.env.PUBLIC_URL}/confirm-signup`,
          `${process.env.PUBLIC_URL}/reset-password`,
          `${process.env.PUBLIC_URL}/error-pages/error-404`,
          `${process.env.PUBLIC_URL}/forget-password`,
        ].indexOf(pathname) === -1
      ) {
        if (isPermitted) {
          dispatch(setInitialPath(pathname));
        } else {
          dispatch(setInitialPath(undefined));
        }
      }
    }

    setInitPath();
  }, [dispatch, isPermitted, initialPath, pathname]);

  useEffect(() => {
    function handleQueryParams() {
      const query = qs.parse(search.split('?')[1]);
      if (query.layout) {
        changeNavStyle(query.layout as NavStyle);
      }
      if (query.mode) {
        updateThemeMode(query.mode as ThemeMode);
      }
      if (query.rtl) {
        setRTL(true);
      }
      if (query.style) {
        updateThemeStyle!(query.style as ThemeStyle);
      }
    }

    if (search) {
      handleQueryParams();
    }
  }, [changeNavStyle, updateThemeMode, setRTL, updateThemeStyle, search]);

  useEffect(() => {
    if (!loading) {
      if (!user && !isPermitted) {
        history.push(`${process.env.PUBLIC_URL}/signin`); // allowed route
      } else if (user && !isPermitted) {
        history.push(`${process.env.PUBLIC_URL}/error-pages/error-404`); // Not found
      } else if (user && isPermitted) {
        if (
          pathname === `${process.env.PUBLIC_URL}/` ||
          pathname === `${process.env.PUBLIC_URL}/signin` ||
          pathname === `${process.env.PUBLIC_URL}/signup`
        ) {
          history.push(initialUrl);
        } else {
          // @ts-ignore
          if (
            initialPath &&
            initialUrl !== initialPath &&
            initialPath !== `${process.env.PUBLIC_URL}/`
            // initialPath !== '/signin' ||
            // initialPath !== '/signup')
          ) {
            history.push(initialPath);
          }
        }
      }
    }
  }, [user, loading, initialPath, isPermitted, pathname, history]);

  return loading ? <Loader /> : <>{children}</>;
};

export default AuthRoutes;
