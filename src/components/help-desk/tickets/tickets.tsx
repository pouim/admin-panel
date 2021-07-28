// import { Button, CheckBox } from "@components/ui";
import {FC, useState} from 'react';
import Moment from 'react-moment';
import styles from './styles.module.css';
import React from 'react';
import {Button, Fab} from '@material-ui/core';
import {useQuery} from 'react-query';
import gate from 'gate';
import useCheckMobileScreen from 'hooks/isMobile';
import AddIcon from '@material-ui/icons/Add';

const Tickets: FC<any> = ({
  back,
  setTickets,
  ticketId,
  handleShowMessage,
  ticketData,
}) => {
  const {data}: any = useQuery('tickets', gate.tickets);
  const closedTickets: any = [
    ticketData?.filter((f: any) => f?.complete == true),
  ];
  const [isShowClosedTicket, setIsShowClosedTicket] = useState(false);
  const isMobile = useCheckMobileScreen();

  return (
    <section
      style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
      className='h-screen relative flex-col items-center justify-between flex w-full lg:w-4/12'>
      <div className='overflow-x-hidden left-3 right-3 overscroll-y-auto h-screen absolute hide-scrollbar transition py-5 flex flex-col justify-between'>
        <div className='left-0 right-0'>
          {/* <div className="flex items-center my-3">
                        <CheckBox onChange={() => setIsShowClosedTicket(!isShowClosedTicket)} />
                        <span className="text-xs">Show closed ticket</span>
                    </div> */}

          {isMobile && (
            <Fab
              size='small'
              color='primary'
              aria-label='add'
              style={{textAlign: 'right'}}
              title='create ticket'>
              <AddIcon onClick={() => back()} />
            </Fab>
          )}

          {isShowClosedTicket === false &&
            data &&
            data?.data?.map((ticket: any) => (
              <div
                style={{background: '#F4F7FE'}}
                className={`${
                  ticketId === ticket.id && 'border border-gray-200'
                } rounded-lg  p-4 text-sm my-3 cursor-pointer`}
                onClick={() => {
                  setTickets(ticket.id);
                  handleShowMessage();
                }}>
                <div className='flex'>
                  <span className='text-main-green'>{ticket.id} | </span>{' '}
                  <span className='mx-2'>{ticket.subject}</span>
                </div>
                <p className='text-gray-400 font-medium my-3'>
                  {ticket.describe}
                </p>
                <div className='flex justify-between items-center'>
                  <button
                    className={
                      !!ticket.complete
                        ? 'py-2 px-4 rounded-lg bg-green-500 text-white my-2'
                        : 'py-2 px-4 rounded-lg bg-yellow-500 text-white my-2'
                    }>
                    {!!ticket.complete ? 'complete' : 'pending'}
                  </button>
                  <small className='text-gray-400'>
                    <Moment date={ticket.created_at} fromNow />
                  </small>
                </div>
              </div>
            ))}
          {!!isShowClosedTicket &&
            closedTickets?.map((ticket: any) => (
              <div
                className={`${
                  ticketId === ticket.id && 'border border-gray-200'
                } rounded-lg bg-lighten-5 p-4 text-sm my-3 cursor-pointer`}
                onClick={() => {
                  setTickets(ticket.id);
                  handleShowMessage();
                }}>
                <div className='flex'>
                  <span className='text-main-green'>{ticket.id} | </span>{' '}
                  <span className='mx-2'>{ticket.subject}</span>
                </div>
                <p className='text-gray-400 font-medium my-3'>
                  {ticket.describe}
                </p>
                <div className='flex justify-between items-center'>
                  <button className='py-2 px-4 rounded-lg bg-muted my-2'>
                    {!!ticket.complete ? 'complete' : 'pending'}
                  </button>
                  <small className='text-gray-400'>
                    <Moment date={ticket.created_at} fromNow />
                    {ticket.created_at}
                  </small>
                </div>
              </div>
            ))}
        </div>

        {!isMobile && (
          <div className='top-0 sticky shadow-sm'>
            <Button variant='contained' color='primary' onClick={() => back()}>
              New Ticket
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tickets;
