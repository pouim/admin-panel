import { useEffect, useState } from "react";

import Tickets from "./tickets/tickets";
import CreateTicket from "./createTicket";
import MessageCard from "./MessageCard";
import { useWindowDimensions } from "../../hooks/hooks";
import React from "react";
import MessagesScreen from "./MessagesScreen";
import { useQuery } from "react-query";
import gate from "gate";
import TicketsSection from "./tickets-section";

const HelpDesk = () => {
  const [page, setPage] = useState('tickets');
    const [ticket, setTicket] = useState(null);
    const { height, width } = useWindowDimensions();
    const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
    const { data }: any = useQuery('tickets', gate.tickets);



  const handleShowMessage = () => {
      setIsShowMessage(!isShowMessage);
  };

  const onTicketClickHandler = (id: any) => {
    console.log('tickets detail', id);
    setTicket(id);
    setIsShowMessage(true);
  }

  return (
    <>
      {!isShowMessage? (
        <TicketsSection
          tickets={data && data}
          onRowClick={onTicketClickHandler}
        />
      ) : (
        <MessagesScreen
          handleShowMessage={handleShowMessage}
          showBackBtn={true}
          ticketNumber={ticket}
        />
      )}
    </>
    // <div className='lg:flex transition-all'>
    //   {width !== null && width >= 1024 ? (
    //     <>
    //       {page === 'tickets' ? (
    //         <Tickets
    //           handleShowMessage={handleShowMessage}
    //           back={() => setPage('create')}
    //           setTickets={(t: any) => setTicket(t)}
    //           ticketId={ticket}
    //           ticketData={data && data?.data}
    //         />
    //       ) : (
    //         <CreateTicket back={() => setPage('tickets')} />
    //       )}
    //       {ticket !== '' && (
    //         <MessagesScreen
    //           handleShowMessage={handleShowMessage}
    //           showBackBtn={false}
    //           ticketNumber={ticket}
    //           selectedUser={{id: 1, name: 'Admin', isOnline: true}}
    //         />
    //       )}
    //     </>
    //   ) : (
    //     <>
    //       {isShowMessage == false && page == 'tickets' ? (
    //         <Tickets
    //           handleShowMessage={handleShowMessage}
    //           back={() => setPage('create')}
    //           setTickets={(t: any) => setTicket(t)}
    //           ticketId={ticket}
    //           ticketData={data && data?.data}
    //         />
    //       ) : (
    //         isShowMessage === false && (
    //           <CreateTicket back={() => setPage('tickets')} />
    //         )
    //       )}
    //       {isShowMessage === true && (
    //         <MessagesScreen
    //           handleShowMessage={handleShowMessage}
    //           showBackBtn={true}
    //           ticketNumber={ticket}
    //           selectedUser={{id: 1, name: 'Admin', isOnline: true}}
    //         />
    //       )}
    //     </>
    //   )}
    // </div>
  );
};

export default HelpDesk;
