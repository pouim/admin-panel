import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Button, TextField} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from 'types/AppContextPropsType';
import { Fonts } from 'shared/constants/AppEnums';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    textAlign: 'left',
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
    },
  },
  myTextFieldRoot: {
    width: '100%',
  },
  checkboxRoot: {
    marginLeft: -12,
  },
  pointer: {
    cursor: 'pointer',
  },
  btnRoot: {
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '10rem',
    fontWeight: Fonts.REGULAR,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  btnRootFull: {
    width: '100%',
  },
  dividerRoot: {
    marginBottom: 16,
    marginLeft: -48,
    marginRight: -48,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 32,
    },
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
  colorTextPrimary: {
    color: theme.palette.primary.main,
  },
  underlineNone: {
    textDecoration: 'none',
  },
  textGrey: {
    color: theme.palette.grey[500],
  },
}));
const validationSchema = yup.object({
  title: yup.string().required('title required'),
  description: yup.string().required('description required'),
});

const MyTextField = (props: any) => {
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

const NewAnalyze = (props: any) => {
  const classes = useStyles(props);
  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        pt={8}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={{
            title: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            props.handleSubmit(data);
            setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form className={classes.formRoot} noValidate autoComplete='off'>
              <Box mb={{xs: 5, xl: 8}}>
                <MyTextField
                  placeholder='Title'
                  name='title'
                  label='Title'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                />
              </Box>

              <Box mb={{xs: 3, lg: 4}}>
                <MyTextField
                  placeholder='Description'
                  label='Description'
                  name='description'
                  variant='outlined'
                  className={classes.myTextFieldRoot}
                  multiline
                  rows="5"
                />
              </Box>

              <Box
                mb={6}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  className={classes.btnRoot}>
                  Send Request
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default NewAnalyze;
