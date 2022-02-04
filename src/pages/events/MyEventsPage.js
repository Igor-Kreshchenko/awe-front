import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../../common/components/Layout';
import { EventsNavBar } from '../../common/components/EventsNavBar';
import { PaginatedItems } from '../../common/components/PaginatedItems';
import { getTickets } from '../../api';
import { TicketModal } from '../../common/components/TicketModal';
import { deleteTicket } from '../../api';
import './EventsPage.scss';

export const MyEventsPage = ({ openMenu, setOpenMenu }) => {
  const [ allTickets, setAllTickets ] = useState([]);
  const [ selectedTicket, setSelectedTicket ] = useState({});
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const fetchDb = async () => {
    try {
      const response = await getTickets();
      const tickets = response.data.tickets;

      tickets && setAllTickets(tickets);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDb()
  }, []);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getClickedTicket(e) {
    const index = e.currentTarget.dataset.index;
    const clickedTicket = allTickets.find((ticket) => String(ticket.id) === index);

    setSelectedTicket(clickedTicket);
  }

  async function deleteTicketHandler(id) {
   try {
    await deleteTicket(id);

    const newTickets = allTickets.filter(ticket => ticket.id !== id);
    setAllTickets(newTickets);
    toggleModal();
   } catch (error) {
     console.log(error.message);
   }
  }

  function modalHandler(e) {
    toggleModal();
    getClickedTicket(e);
  }

  return (
    <Layout openMenu={ openMenu } setOpenMenu={ setOpenMenu }>
      <EventsNavBar/>
      <PaginatedItems items={ allTickets } itemsPerPage={ 12 } onOpenModal={ modalHandler }/>
      {isModalOpen && <TicketModal eventData={ selectedTicket } onClose={ toggleModal } onDelete={ deleteTicketHandler }/>}
    </Layout>
  );
};

MyEventsPage.propTypes = {
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func
};
