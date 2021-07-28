import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {Scrollbar} from '../../../@crema';
import Slide from '@material-ui/core/Slide';
import AddContactForm from './EditUserForm';
import {Fonts} from '../../../shared/constants/AppEnums';
import {makeStyles} from '@material-ui/core/styles/index';
import {TransitionProps} from '@material-ui/core/transitions';
import {useIntl} from 'react-intl';
import EditUserForm from './EditUserForm';
import { useGetUser } from 'hooks/hooks';
import { useMutation } from 'react-query';
import gate from 'gate/index';
import { queryClient } from 'App';
import { showError } from 'lib';
import { loadJWTUser } from 'redux/actions';
import jwtAxios from '@crema/services/auth/jwt-auth/jwt-api';

const useStyles = makeStyles(() => ({
  dialogBox: {
    position: 'relative',
    '& .MuiDialog-paperWidthSm': {
      maxWidth: 600,
      width: '100%',
    },
    '& .MuiTypography-h6': {
      fontWeight: Fonts.LIGHT,
    },
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});



const EditUser: React.FC<any> = ({
  isEditUser,
  handleEditUserClose,
  onUpdateContact,
}) => {
  const dispatch = useDispatch();
  const {
    mutate: updateUser,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.updateUser);
  const [percent, setPercent] = useState<any>(0);

  const {data, isFetching}: any = useGetUser();
  const selectContact = data?.data;


  const classes = useStyles();
  const {messages} = useIntl();
  const validationSchema = yup.object({
    username: yup
      .string()
      .required(messages['validation.nameRequired'] as string),
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup
      .string()
      .email(messages['validation.emailFormat'] as string)
      .required(messages['validation.emailRequired'] as string),
    // promotion_code: yup.string(),
  });

  const onUploadPhotoHandler = async(photo: any) => {
    console.log('photo', photo);
    let formData = new FormData();
    formData.append('profile_photo', photo);

    try {
      const res = await jwtAxios.put('/user/profile-photo/',formData, {
        headers : {
          'Content-Type':'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent;
          let prercentage = Math.floor( (loaded * 100) / total);
          console.log(`${loaded} kb of ${total}kb | ${prercentage}%`)
          if( prercentage < 100 ) {
            setPercent(prercentage)
          }
        }
      });
      console.log('upload photo succedd', res.data)
      setPercent(100);
      queryClient.invalidateQueries('user');
      await loadJWTUser(dispatch);
    } catch (error) {
      console.log('upload photo failed', error)
      showError(error.data, {
        color: 'red',
        gravity: 'bottom',
        position: 'left',
      });
    }
     setTimeout(() => {
       setPercent(0);
     }, 1000);
  };


  return (
    <Dialog
      open={isEditUser}
      onClose={() => handleEditUserClose()}
      aria-labelledby='simple-modal-title'
      TransitionComponent={Transition}
      aria-describedby='simple-modal-description'
      className={classes.dialogBox}>
      <Scrollbar>
        <Formik
          validateOnChange={true}
          initialValues={{
            username: selectContact ? selectContact.username : '',
            first_name: selectContact ? selectContact.first_name : '',
            last_name: selectContact ? selectContact.last_name : '',
            email: selectContact ? selectContact.email : '',
            promotion_code: selectContact ? selectContact.promotion_code : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            console.log(data);
            updateUser(data, {
              onSuccess: (d: any) => {
                console.log(d);
                queryClient.invalidateQueries('user');
                loadJWTUser(dispatch);
              },
              onError: (d: any) => {
                console.log(d);
                showError(d.data, {
                  color: 'red',
                  gravity: 'bottom',
                  position: 'left',
                });
              },
            });
            handleEditUserClose();
            resetForm();
            setSubmitting(false);
          }}>
          {({values, setFieldValue}) => (
            <EditUserForm
              setUserImage={onUploadPhotoHandler}
              values={values}
              userImage={selectContact?.profile_photo}
              setFieldValue={setFieldValue}
              handleEditUserClose={handleEditUserClose}
            />
          )}
        </Formik>
      </Scrollbar>
    </Dialog>
  );
};

export default EditUser;
