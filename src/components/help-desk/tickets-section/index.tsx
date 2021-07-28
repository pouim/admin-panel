import React, {useEffect, useRef, useState} from 'react';
import TicketsTable from './TicketsTable';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Hidden} from '@material-ui/core';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AppAnimate from '../../../@crema/core/AppAnimate';
import InfoView from '../../../@crema/core/InfoView';
import {AppState} from '../../../redux/store';
import Modal from 'components/UI/Modal';
import useCheckMobileScreen from 'hooks/isMobile';
import CreateTicket from '../createTicket';
import {
  NavigateBefore,
  NavigateNext,
  NavigateNextRounded,
} from '@material-ui/icons';
import {useMutation} from 'react-query';
import gate from 'gate';
import {queryClient} from 'App';

const TicketsSection = ({tickets, onRowClick}: any) => {
  const prevPageRef = useRef<number>(0);
  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState<string>('');
  const tableCount = tickets?.data?.count;
  const prevUrl = tickets?.data?.previous;
  const nextUrl = tickets?.data?.next;
  const [showModal, setShowModal] = useState<any>(false);
  const isMobile = useCheckMobileScreen();
  const {mutate: paginateData} = useMutation(gate.paginateApi);

  const onPrevHandler = () => {
    paginateData(
      {url: prevUrl},
      {
        onSuccess: (data) => {
          queryClient.setQueryData('tickets', data);
        },
      },
    );
  };

  const onNextHandler = () => {
    paginateData(
      {url: nextUrl},
      {
        onSuccess: (data) => {
          queryClient.setQueryData('tickets', data);
        },
      },
    );
  };

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <AppsContainer title='Tickets' fullView>
          <AppsHeader>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              width={1}>
              <Button
                onClick={() => setShowModal(true)}
                variant='contained'
                color='primary'>
                Create Ticket
              </Button>
              <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                ml='auto'>
                <Hidden xsDown>
                  {/* <AppsPagination
                    rowsPerPage={3}
                    count={tableCount}
                    page={page}
                    onPageChange={onPageChange}
                  /> */}

                  <Button
                    disabled={!prevUrl}
                    onClick={onPrevHandler}
                    style={{borderRadius: '8px'}}>
                    <NavigateBefore />
                  </Button>
                  <Button
                    disabled={!nextUrl}
                    onClick={onNextHandler}
                    style={{borderRadius: '8px'}}>
                    <NavigateNext />
                  </Button>
                </Hidden>
              </Box>
            </Box>
          </AppsHeader>

          <AppsContent
            style={{
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <TicketsTable
              tickets={tickets?.data?.results}
              onRowClick={onRowClick}
            />
          </AppsContent>

          <Hidden smUp>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Button
                disabled={!prevUrl}
                onClick={onPrevHandler}
                style={{borderRadius: '8px'}}>
                <NavigateBefore />
              </Button>
              <Button
                disabled={!nextUrl}
                onClick={onNextHandler}
                style={{borderRadius: '8px'}}>
                <NavigateNext />
              </Button>
            </div>
          </Hidden>
        </AppsContainer>
      </AppAnimate>
      <Modal
        visible={showModal}
        isFullScreen={isMobile}
        maxWidth='xs'
        modalTitle='Create New Ticket'
        onClose={() => setShowModal(false)}>
        <CreateTicket back={() => setShowModal(false)} />
      </Modal>

      <InfoView />
    </>
  );
};

export default TicketsSection;
