import React from 'react';
import PropTypes from 'prop-types';
import './EventsList.scss';

export const EventsItem = ({ id, name, date, image, price, currency, onOpenModal }) => {
    let eventName = name

    if (name.length > 70) {
      eventName = name.slice(0, 70) + '...';
    }

    return (
      <li className="events_item" data-index={ id } onClick={ onOpenModal }>
        <div className="event_wrapper">
          <div className="poster_wrapper">
            <img src={ image } alt="event poster" className="event_poster"/>
          </div>
          <div className="event_content">
            <h4 className="event_title">{ eventName }</h4>

            <div className="event_data">
              <p>{ date }</p>
              <p className="event_price">{ price } { currency.toUpperCase() }</p>
            </div>
          </div>
        </div>
      </li>
    )
}

EventsItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    onOpenModal: PropTypes.func.isRequired
};