import React, { useState } from 'react';
import AppCard from '../../@crema/core/AppCard';
import {useIntl} from 'react-intl';
import AppSelect from '../../@crema/core/AppSelect';
import AnalyzesTable from './AnalyzesTable';
import {makeStyles} from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'components/UI/Modal';
import NewAnalyze from './NewAnalyze';
import { useMutation } from 'react-query';
import gate from 'gate/index';
import { showError } from 'lib';
import { queryClient } from 'App';
import AnalyzeDetail from './AnalyzeDetail';
import useCheckMobileScreen from 'hooks/isMobile';


interface AnalyzesRequestsProps {
  data: any;
}

const AnalyzesRequests: React.FC<AnalyzesRequestsProps> = ({data}) => {
  const {messages} = useIntl();
  const {
    mutate: newAnalyze,
    isSuccess,
    isError,
    isLoading,
    error,
  }: any = useMutation(gate.postAnalyze);
  const [analyzeDetailData, setAnalyzeDetailData] = useState<any>(null);
  const [showModal, setShowModal] = useState<any>(false);
  const [showDetailModal, setShowDetailModal] = useState<any>(false);
  const isMobile= useCheckMobileScreen();

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const handleSelectionType = (data: unknown) => {
    console.log('data: ', data);
  };
  const classes = useStyles();
  
  const onNewAnalyzeRequest = (data: any) => {
     console.log('formrrr', data);
     newAnalyze(
      { title: data.title, description: data.description},
      {
          onSuccess: (d: any) => {
              console.log(d);
              queryClient.invalidateQueries('analyzes'); 
              setShowModal(false);
          },
          onError: (d: any) => {
              console.log(d);
              showError(d.data, { color: 'red', gravity: 'bottom', position: 'left' });
          },
      },
  );
  }

  const onTableRowClickHandler = (data: any) => {
    console.log('table data', data);
    setAnalyzeDetailData(data);
    setShowDetailModal(true);
  }

  return (
    <AppCard
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title='Analyze Requests'
      action={
        // <AppSelect
        //   menus={[
        //     messages['dashboard.thisWeek'],
        //     messages['dashboard.lastWeeks'],
        //     messages['dashboard.lastMonth'],
        //   ]}
        //   defaultValue={messages['dashboard.thisWeek']}
        //   onChange={handleSelectionType}
        // />

        <Fab
          size='small'
          color='primary'
          aria-label='add'
          title='New Analyze Request'
          className={classes.margin}>
          <AddIcon onClick={() => setShowModal(true)} />
        </Fab>
      }>
      <AnalyzesTable onTableRowClick={onTableRowClickHandler} analyzesData={data} />
      <Modal
        visible={showModal}
        maxWidth='sm'
        onClose={() => setShowModal(false)}
        modalTitle='New Analyze Request'>
        <NewAnalyze handleSubmit={onNewAnalyzeRequest} />
      </Modal>

      <Modal
        visible={showDetailModal}
        maxWidth='md'
        isFullScreen={isMobile}
        onClose={() => setShowDetailModal(false)}
        modalTitle={analyzeDetailData?.title}>
        <AnalyzeDetail data={analyzeDetailData} />
      </Modal>
    </AppCard>
  );
};

export default AnalyzesRequests;


