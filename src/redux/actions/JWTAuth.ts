import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {AuthUser} from '../../types/models/AuthUser';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../types/actions/Auth.actions';

export const onJwtUserSignUp = (body: {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  promotion_code: string;
  password: string;
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('register/', body);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.token));
      await loadJWTUser(dispatch);
    } catch (err) {
      console.log('error!!!!', err.response.data);
      err.response.data.username
        ? dispatch(fetchError(err?.response?.data?.username))
        : err.response.data.email
        ? dispatch(fetchError(err?.response?.data?.email))
        : dispatch(fetchError(err.response.data));
    }
  };
};

export const onJwtSignIn = (body: {username: string; password: string}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('login/', body);
      localStorage.setItem('token', res.data.token);
      dispatch(setJWTToken(res.data.token));
      await loadJWTUser(dispatch);
    } catch (err) {
      console.log('error!!!!', err.response?.data);
      dispatch(fetchError(err.response?.data));
    }
  };
};

export const loadJWTUser = async (dispatch: Dispatch<AppActions>) => {
  dispatch(fetchStart());
  try {
    const res = await jwtAxios.get('/user/');
    dispatch(fetchSuccess());
    console.log('res.data', res.data);
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: getUserObject(res.data),
    });
  } catch (err) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
  }
};

export const setJWTToken = (token: string | null): AppActions => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

const getUserObject = (authUser: any): AuthUser => {
  return {
    id: authUser?.id,
    authType: AuthType.JWT_AUTH,
    role: defaultUser.role,
    displayName: authUser.username,
    first_name: authUser.first_name,
    last_name: authUser.last_name,
    email: authUser.email,
    promotion_code: authUser.promotion_code,
    profile_photo: authUser?.profile_photo,
    balance: authUser?.balance,
  };
};

export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchSuccess());
    setTimeout(() => {
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch(fetchSuccess());
      localStorage.removeItem('token');
    }, 500);
  };
};
