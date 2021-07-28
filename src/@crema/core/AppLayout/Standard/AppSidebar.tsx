import React, {useContext} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import useStyles from './AppSidebar.style';
import Scrollbar from '../../Scrollbar';
import AppContext from '../../../utility/AppContext';
import {AppState} from '../../../../redux/store';
import AppContextPropsType from '../../../../types/AppContextPropsType';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

interface AppSidebarProps {
  position?: 'left' | 'bottom' | 'right' | 'top';
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  position = 'left',
  variant = '',
}) => {
  const dispatch = useDispatch();
  const {navCollapsed} = useSelector<AppState, AppState['settings']>(
    ({settings}) => settings,
  );
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const shareUrl = 'http://crema-react.firebaseapp.com/';

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };
  const classes = useStyles({themeMode});
  let sidebarClasses = classes.sidebarStandard;
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor={position}
          open={navCollapsed}
          onClose={() => handleToggleDrawer()}
          classes={{
            root: clsx(variant),
            paper: clsx(variant),
          }}
          style={{position: 'absolute'}}>
          <Box height='100%' className={classes.container}>
            <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
              <UserInfo />
              <Scrollbar className={classes.drawerScrollAppSidebar}>
                <Navigation />

                <Box className={classes.socialButtons}>
               
                  <LinkedinShareButton url={shareUrl} style={{marginRight: 10}}>
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                  <FacebookShareButton url={shareUrl} style={{marginRight: 10}}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={30} round={true} />
                  </TwitterShareButton>
                </Box>
              </Scrollbar>
            </Box>
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Box height='100%' className={clsx(classes.container, 'app-sidebar')}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <UserInfo />
            <Scrollbar className={classes.scrollAppSidebar}>
              <Navigation />
              <Box className={classes.socialButtons}>
               
                  <LinkedinShareButton url={shareUrl} style={{marginRight: 10}}>
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                  <FacebookShareButton url={shareUrl} style={{marginRight: 10}}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={30} round={true} />
                  </TwitterShareButton>
                </Box>
            </Scrollbar>
            <UserInfo />
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default AppSidebar;
