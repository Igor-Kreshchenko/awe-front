import PropTypes from 'prop-types';
import '../../Notifications.scss';
import { useTranslation } from 'react-i18next';

export const Message = ({ message }) => {
    const { t } = useTranslation()
    
    const getDate = (date) => {
      const formatDate = new Date(date)
      const day = formatDate.getDate();
      const month = formatDate.getMonth();
      const year = formatDate.getFullYear();
      const seconds = formatDate.getSeconds();
      let minutes = formatDate.getMinutes();
      if (minutes < 10) {
        minutes = `0${ minutes }`
      }
      const hours = formatDate.getHours();
    return `${ hours }:${ minutes }:${ seconds }  ${ day }/${ month }/${ year }`
    }

    return (
      <div className="notification__message" >
        <small>{ getDate(message.Data) }</small>
        <div>
          { message.Note && 
            <p>
              { t('notifications.send') } { message.Amount } { message.CardCurrency } { t('notifications.to') } { message.Note } 
            </p>
          }
          { !message.Note &&
            <p>
              { t('notifications.reseive') } { message.Amount } { message.CardCurrency } { t('notifications.from') } { message.SenderName } 
            </p>
          }

        </div>
      </div>

    )
}

Message.propTypes = {
    message: PropTypes.object
}