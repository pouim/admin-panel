import React from 'react';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import EmailIcon from '@material-ui/icons/Email';
import UserIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import LanguageIcon from '@material-ui/icons/Language';
import CakeIcon from '@material-ui/icons/Cake';
import {makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import UserInfo from 'components/Chat/ChatContent/MessagesScreen/UserInfo';

const useStyles = makeStyles(() => ({
  borderBottomClass: {
    borderBottom: `1px solid ${grey[300]}`,
  },
  iconRoot: {
    fontSize: 16,
    color: 'grey.600',
  },
}));

const PersonalDetails: React.FC<any> = ({userData}) => {
  const classes = useStyles();
  return (
    <Box
      pr={{xs: 5, lg: 8, xl: 10}}
      pb={5}
      className={classes.borderBottomClass}>
      <Box component='h6' mb={2} fontWeight={Fonts.MEDIUM} fontSize={16}>
        <IntlMessages id='contactApp.personalDetails' />
      </Box>

      <Box px={{xs: 5, lg: 8, xl: 10}}>
        <Box mb={2} display='flex' alignItems='center'>
          <UserIcon className={classes.iconRoot} />
          <Box ml={2} color='text.secondary' fontSize={14}>
            {userData?.first_name} {userData?.last_name}
          </Box>
        </Box>
        <Box mb={2} display='flex' alignItems='center'>
          {' '}
          <EmailIcon className={classes.iconRoot} />{' '}
          <Box ml={2} fontSize={14} color='text.secondary'>
            {userData?.email}
          </Box>
        </Box>

        {userData?.promotion_code && (
          <Box mb={2} display='flex' alignItems='center'>
            <PeopleIcon className={classes.iconRoot} />
            <Box ml={2} color='text.secondary' fontSize={14}>
              {userData?.promotion_code}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PersonalDetails;
