import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { createTicket } from '../../../api';
import './EventModal.scss';

const EventModalComponent = ({ eventData, onClose, userID, cardID }) => {
    const { t } = useTranslation()
    const { imageUrl, name, country, city, address, date, time, price, currency } = eventData;
    const [ errorNotification, setErrorNotification ] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);

        return () => {
           window.removeEventListener('keydown', handleKeydown);
        }
    }, [])

    function handleBackdropClick (event) {
      if (event.currentTarget === event.target) {
        onClose();
      }
    };

    function handleKeydown ({ code }) {
        if (code === 'Escape') {
          onClose();
        }
    };

    async function handleBuyBtn () {
      try {
        await createTicket({ userID, cardID, imageUrl, name, country, city, address, date, time, price, currency });
        onClose();
      } catch (error) {
        console.log(error.message);
        setErrorNotification(true);
      }
    }

    return (
      <div className="backdrop" onClick={ handleBackdropClick }>
        <div className="event_modal">
          <button type="button" className="modal_close_btn" onClick={ onClose }><CloseIcon fontSize="large"/></button>

          <div className="poster_box">
            <img src={ imageUrl } alt="event poster"/>
          </div>

          <div className="modal_content">
            <h2 className="modal_title">{ name }</h2>

            <ul className="modal_list">
              <li className="modal_list_item">
                <h3>{ t('events.modalWhere') }</h3>
                <p className="modal_text">{ country } / { city } / { address }</p>
              </li>
              <li className="modal_list_item">
                <h3>{ t('events.modalWhen') }</h3>
                <p className="modal_text">{ date } at { time }</p>
              </li>
              <li className="modal_list_item">
                <h3>{ t('events.modalPrice') }</h3>
                <p className="modal_text">{ price } { currency.toUpperCase() }</p>
              </li>
            </ul>
            { errorNotification ? <p className="error_message">{ t('events.errorMessage') }</p> : null }
          </div>

          <button type="button" onClick={ handleBuyBtn } className="modal_btn">{ t('events.modalBuyBtn') }</button>
        </div>
      </div>
    );
  };

  EventModalComponent.propTypes = {
    onClose: PropTypes.func.isRequired,
    userID: PropTypes.number.isRequired,
    cardID: PropTypes.number.isRequired,
    eventData: PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  };

  const mapStateToProps = (state)=>({
    userID: state.profileReducer.user.UserID,
    cardID: state.cardsReducer.selectedCard.ID,
})

export const EventModal = connect(mapStateToProps, null)(EventModalComponent)