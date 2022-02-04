import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import QRCode from 'qrcode.react';
import { useTranslation } from 'react-i18next';
import './TicketModal.scss';

export const TicketModalComponent = ({ eventData, onClose, firstName, lastName, onDelete }) => {
    const { t } = useTranslation()
    const { id, name, country, city, address, date, time } = eventData;
    const qrValue = JSON.stringify(eventData);

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

 return (
   <div className="backdrop" onClick={ handleBackdropClick }>
     <div className="event_modal ticket">
       <button type="button" className="modal_close_btn" onClick={ onClose }><CloseIcon fontSize="large"/></button>

       <div className="qr_box">
         <QRCode value={ qrValue } size={ 400 }/>
       </div>

       <div className="ticket_content">
         <h2 className="modal_title">{ name }</h2>

         <ul className="modal_list">
           <li className="modal_list_item">
             <h3>{ t('events.modalWhere') }</h3>
             <p className="modal_text">{ country }</p>
             <p className="modal_text">{ city }</p>
             <p className="modal_text">{ address }</p>
           </li>
           <li className="modal_list_item">
             <h3>{ t('events.modalWhen') }</h3>
             <p className="modal_text">{ date } at { time }</p>
           </li>
           <li className="modal_list_item">
             <h3>{ t('tickets.owner') }</h3>
             <p className="modal_text">{ firstName } { lastName }</p>
           </li>
         </ul>

         <button type="button" onClick={ () => onDelete(id) } className="modal_btn ticket_btn">{ t('tickets.deleteBtn') }</button>
       </div>
     </div>
   </div>
 )
}

TicketModalComponent.propTypes = {
  eventData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }),
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state)=>({
    firstName: state.profileReducer.user.FirstName,
    lastName: state.profileReducer.user.SecondName,
});

  export const TicketModal = connect(mapStateToProps, null)(TicketModalComponent)