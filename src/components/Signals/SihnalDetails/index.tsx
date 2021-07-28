import { Divider } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Review from 'components/Reviews';
import React, {FC, useState} from 'react';
import styles from './styles.module.css';
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import gate from 'gate';
import { queryClient } from 'App';
import { showError } from 'lib';


const SignalDetails: FC<any> = ({signal}) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const {
    mutate: newComment,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.postCommnet);
  const {data, isLoading: signalLoading}: any = useQuery(
    'signal-id',
    () => gate.getSiganlsById(signal?.id),
    {
      retry: 1,
    },
  );
  const signalData = data && data?.data;
  
  const onPostNewComment = (data: any) => {
    console.log('comment data', data);
    newComment(
      { title: data.title, description: data.description, signal: signalData?.id},
      {
          onSuccess: (d: any) => {
              console.log(d);
              queryClient.invalidateQueries('signal-id'); 
          },
          onError: (d: any) => {
              console.log(d);
              showError(d.data, { color: 'red', gravity: 'bottom', position: 'left' });
          },
      },
  );
  }
  return (
    <div className={styles.container}>
      <a href={signalData?.image} target='_blank'>
        <img
          className={styles.image}
          src={signalData?.image}
          alt={signalData?.title}
        />
      </a>
      <div style={{margin: '2rem 0'}}>
        <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <AccordionSummary
            style={{marginTop: '1.5rem'}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography style={{fontSize: '22px', fontWeight: 'bold'}}>
              Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles.desc}>
              {signalData?.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <Review
        isLoading={signalLoading}
        handleSubmitNewComment={onPostNewComment}
        comments={signalData?.comments}
      />
    </div>
  );
};

export default SignalDetails;
