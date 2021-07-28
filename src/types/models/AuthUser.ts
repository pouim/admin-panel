import {AuthType} from '../../shared/constants/AppEnums';

export interface AuthUser {
  id: any;
  displayName: string;
  first_name?: string;
  last_name?: string;
  photoURL?: string;
  email?: string;
  promotion_code?:string;
  role?: string[];
  uid?: string;
  token?: string;
  authType?: string;
  profile_photo?: any;
  balance?: any;
}
