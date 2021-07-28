import React from 'react';
import {Box, Button, TextField} from '@material-ui/core';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from 'types/AppContextPropsType';
import {Fonts} from 'shared/constants/AppEnums';
import useCheckMobileScreen from 'hooks/isMobile';
import { useMutation } from 'react-query';
import gate from 'gate';
import { queryClient } from 'App';
import { showError, showMessage } from 'lib';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    // width: '50%',
    textAlign: 'left',
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
      marginTop: 20,
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
  amount: yup.string().required('amount required'),
  address: yup.string().required('address required'),

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

const AmountRequst = (props: any) => {
  const classes = useStyles(props);

  const isMobile = useCheckMobileScreen();

  const WIDTH = isMobile ? '80%' : '90%';
  const {
    mutate: reqWithdraws,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.reqWithdraws);

  const reqestWithdraws = (data: any) => {
    console.log('rregisterd data', data);
    
    reqWithdraws(data, {
      onSuccess: (d: any) => {
        console.log(d);
        showMessage('Your Request Submitted Successfully');
        queryClient.invalidateQueries('withdraws');
        queryClient.invalidateQueries('user');
        props.handleCloseModal();
      },
      onError: (d: any) => {
        console.log(d?.response?.data);
        showError(d?.response?.data, {
          color: 'red',
          gravity: 'bottom',
          position: 'left',
        });
        props.handleCloseModal();

      },
    });
  }

  return (
    <Box
      display='flex'
      mt={4}
      //   flexDirection={{xs: 'row', md: 'row'}}
      alignItems={{xs: 'center', md: 'flex-start'}}
      justifyContent='center'>
      <Formik
        validateOnChange={true}
        initialValues={{
          amount: '',
          address: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            reqestWithdraws(data);
            setSubmitting(false);
            resetForm();
        }}>
        {({isSubmitting}) => (
          <Form
            style={{width: WIDTH}}
            className={classes.formRoot}
            noValidate
            autoComplete='off'>
            <Box mb={{xs: 5, xl: 8}}>
              <MyTextField
                placeholder='Amount'
                name='amount'
                type= 'number'
                label='Amount'
                variant='outlined'
                className={classes.myTextFieldRoot}
              />
            </Box>

            <Box mb={{xs: 5, xl: 8}}>
              <MyTextField
                placeholder='Address'
                name='address'
                label='Address'
                variant='outlined'
                className={classes.myTextFieldRoot}
              />
            </Box>

            <Box mb={6}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                // disabled={isSubmitting}
                className={classes.btnRoot}>
                Send Request
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AmountRequst;
