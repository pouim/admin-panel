import React, {useEffect} from 'react';
import {Box, Button, Select} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {Field, Form, useField} from 'formik';
import TextField from '@material-ui/core/TextField';
import {useSelector} from 'react-redux';
import {useDropzone} from 'react-dropzone';
import {useIntl} from 'react-intl';
import {grey} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import Scrollbar from '../../../@crema/core/Scrollbar';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {KeyboardDatePicker} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Fonts} from '../../../shared/constants/AppEnums';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {AppState} from '../../../redux/store';
import { CompassCalibrationOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme: CremaTheme) => ({
  avatar: {
    width: 55,
    height: 55,
    marginBottom: 8,
    cursor: 'pointer',
  },
  myTextField: {
    width: '100%',
    marginBottom: 16,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
    },
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  fieldRoot: {
    width: '100%',
    padding: 16,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  widthFull: {
    width: '100%',
  },
  pointer: {
    cursor: 'pointer',
  },
}));
export const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const EditUserForm: React.FC<any> = ({
  values,
  setUserImage,
  userImage,
  setFieldValue,
  handleEditUserClose,
}) => {
  const inputLabel = React.useRef<any>(null);

  const [labelWidth, setLabelWidth] = React.useState(0);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    setLabelWidth(90);
  }, []);

  const {messages} = useIntl();

  const classes = useStyles();

  
 

  return (
    <Form className='' noValidate autoComplete='off'>
      <Box
        p={5}
        display='flex'
        flexDirection='column'
        alignItems='center'
        borderBottom={`1px solid ${grey[300]}`}>
        <Box {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Avatar
              className={classes.avatar}
              src={userImage ? userImage : '/assets/images/placeholder.jpg'}
            />
          </label>
        </Box>
        <Box component='h4' fontWeight={Fonts.MEDIUM}>
          {values?.username}
        </Box>
      </Box>

      <Scrollbar style={{maxHeight: 600}}>
        <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
          <Box pb={5} mb={5} borderBottom={`1px solid ${grey[300]}`}>
            <Box
              component='h6'
              mb={{xs: 4, xl: 6}}
              fontSize={16}
              fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='contactApp.personalDetails' />
            </Box>

            <Box px={{md: 5, lg: 8, xl: 10}}>
              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label='User Name'
                name='username'
              />

              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label='First Name'
                name='first_name'
              />

              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label='Last Name'
                name='last_name'
              />

              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label={<IntlMessages id='common.email' />}
                name='email'
              />

              <MyTextField
                className={classes.myTextField}
                variant='outlined'
                label='Promotion Code'
                name='promotion_code'
              />
            </Box>
          </Box>
        </Box>

        <Box px={8} py={4} bgcolor='grey.300'>
          <Button
            className={classes.btnRoot}
            color='primary'
            variant='contained'
            type='submit'>
            <IntlMessages id='common.save' />
          </Button>
          <Button
            className={classes.btnRoot}
            color='primary'
            onClick={handleEditUserClose}>
            <IntlMessages id='common.cancel' />
          </Button>
        </Box>
      </Scrollbar>
    </Form>
  );
};

export default EditUserForm;
