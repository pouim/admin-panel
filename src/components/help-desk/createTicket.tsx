import gate from 'gate';
import {useMutation} from 'react-query';
import React, {FC} from 'react';
import BackIcon from '@material-ui/icons/NavigateBefore';
import {
  Button,
  Fab,
  Input,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Form, Formik, useField} from 'formik';
import * as yup from 'yup';
import {showError, showMessage} from 'lib';
import useCheckMobileScreen from 'hooks/isMobile';
import { queryClient } from 'App';

const validationSchema = yup.object({
  subject: yup.string().required('subject required'),
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
      style={{width: '300px'}}
    />
  );
};
const CreateTicket: FC<any> = (props) => {
  const {mutate: createTicket, isLoading} = useMutation(gate.createTicket);
  const isMobile = useCheckMobileScreen();

  const onSubmit = (value: any) => {
    createTicket(
      {subject: value?.subject},
      {
        onSuccess: () => {
          showMessage('Your Ticket Has Been Created');
          queryClient.invalidateQueries('tickets');
          props.back();

        },
        onError: (d: any) => {
          console.log(d);
          showError(d.data, {
            color: 'red',
            gravity: 'bottom',
            position: 'left',
          });
        },
      },
    );
    console.log(value);
  };

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        subject: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(data, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        onSubmit(data);

        setSubmitting(false);
        resetForm();
      }}>
      {({isSubmitting}) => (
        <Form
          noValidate
          autoComplete='off'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            background: '#fff',
            borderRadius: '10px',
            // boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }}>
          <div>
            <MyTextField
              placeholder='Subject'
              name='subject'
              label='Subject'
              variant='outlined'
              // className='mt-5'
            />
          </div>
          <div style={{marginTop: '2rem'}}>
            <Button
              disabled={isSubmitting}
              variant='contained'
              color='primary'
              type='submit'>
              create ticket
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default CreateTicket;
