import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import {Button, Checkbox, makeStyles} from '@material-ui/core';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Box from '@material-ui/core/Box';
import {green} from '@material-ui/core/colors';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {CremaTheme} from '../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => ({
  textUppercase: {
    textTransform: 'uppercase',
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
  textBase: {
    fontSize: 16,
  },
  textSm: {
    fontSize: 14,
  },
  textXs: {
    fontSize: 12,
  },
  textRes: {
    fontSize: 12,
    [theme.breakpoints.up('xl')]: {
      fontSize: 14,
    },
  },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  btn: {
    fontWeight: Fonts.MEDIUM,
    padding: '4px 12px',
    fontSize: 12,
  },
}));

const WebSiteCard: React.FC<any> = ({item}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isParticipated, setIsParticipated] = useState<any>('start');

  const classes = useStyles();
  return (
    <Box
      p={5}
      m={2}
      style={{borderRadius: '20px'}}
      className='pointer item-hover'
      clone>
      <Card>
        <Box mt={2} mb={5} display='flex' justifyContent='space-between'>
          <Box
            component='span'
            maxHeight={28}
            width={48}
            color='primary.contrastText'
            // bgcolor={green[500]}
            py={1}
            px={2}
            display='flex'
            justifyContent='center'
            alignItems='center'
            fontWeight={Fonts.MEDIUM}
            borderRadius={8}
            className={classes.textSm}>
            {/* 4
            <Box component='span' ml={1}>
              <StarBorderIcon className={classes.textBase} />
            </Box> */}
          </Box>
          <div style={{position: 'relative', marginBottom: '0.5rem'}}>
            <img src={item?.photo} alt={item?.name} />
          </div>
        </Box>
        <hr></hr>

        <Box
          mb={1}
          mt={1}
          color='#000'
          fontWeight={Fonts.BOLD}
          fontSize={20}
          component='h3'
          className={classes.truncate}
          style={{textAlign: 'center'}}>
          {item?.name}
        </Box>

        <Button
          color='primary'
          variant='contained'
          fullWidth={true}
          style={{marginTop: '1rem'}}>
          <a href={item?.url} target='_blank'>
            Join Now
          </a>
        </Button>
      </Card>
    </Box>
  );
};

export default WebSiteCard;
