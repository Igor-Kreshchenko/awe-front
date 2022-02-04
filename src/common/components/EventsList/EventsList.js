import React from 'react';
import PropTypes, { object } from 'prop-types';
import { EventsItem } from './EventsItem';
import './EventsList.scss';

export const EventsList = ({ items, onOpenModal }) => {
  return (
    <ul className="events_list">
      {items.map(({ id, name, date, imageUrl, price, currency }) => (
        <EventsItem
          key={ id }
          id={ String(id) }
          name={ name }
          date={ date }
          image={ imageUrl }
          price={ price }
          currency={ currency }
          onOpenModal={ onOpenModal }
        />
      ))}
    </ul>
  );
};

EventsList.propTypes = {
  items: PropTypes.arrayOf(object),
  onOpenModal: PropTypes.func.isRequired,
};
