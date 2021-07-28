import {AuthUser} from '../../types/models/AuthUser';
import {AuthType} from './AppEnums';

export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

export const defaultUser: AuthUser = {
  id: 'RFedvhji876rfhjuecvh7',
  uid: 'RFedvhji876rfhjuecvh7',
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: authRole.user,
  authType: AuthType.AUTH0,
  photoURL:`${process.env.PUBLIC_URL}/assets/images/avatar/A11.jpg`,
};
export const initialUrl = `${process.env.PUBLIC_URL}/signals`; // this url will open after login
