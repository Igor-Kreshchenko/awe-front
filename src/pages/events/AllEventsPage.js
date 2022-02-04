import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../../common/components/Layout';
import { EventsNavBar } from '../../common/components/EventsNavBar';
import { EventModal } from '../../common/components/EventModal';
import { PaginatedItems } from '../../common/components/PaginatedItems';
import { getEvents } from '../../api';
import './EventsPage.scss';

export const AllEventsPage = ({ openMenu, setOpenMenu }) => {
  const [ allEvents, setAllEvents ] = useState([]);
  const [ modalEvent, setModalEvent ] = useState({});
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const response = await getEvents();
        const events = JSON.parse(response.data.events);
        const pricedEvents = getEventsWithPrice(events);
  
        setAllEvents(pricedEvents);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDb();
  }, []);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getClickedEvent(e) {
    const index = e.currentTarget.dataset.index;
    const clickedEvent = allEvents.find((event) => event.id === index);

    setModalEvent(clickedEvent);
  }

  function modalHandler(e) {
    toggleModal();
    getClickedEvent(e);
  }

  function getEventsWithPrice(obj) {
    const events = Object.values(obj)

    return events.filter(event => event.price > 0);
  }

  return (
    <Layout openMenu={ openMenu } setOpenMenu={ setOpenMenu }>
      <EventsNavBar />
      <PaginatedItems items={ allEvents } itemsPerPage={ 12 } onOpenModal={ modalHandler }/>
      {isModalOpen && <EventModal eventData={ modalEvent } onClose={ toggleModal } />}
    </Layout>
  );
};

AllEventsPage.propTypes = {
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func
};
