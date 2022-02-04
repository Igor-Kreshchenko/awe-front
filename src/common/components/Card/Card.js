import React, { useState } from 'react';
import './Card.scss';
import WifiIcon from '@material-ui/icons/Wifi';
import cardChip from './images/chip.png'
import visa from './images/visa.png'
import mastercard from './images/mastercard.png'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const Card = ({ size, number, type, firstName, lastName, expiration, currency }) => {
  const firstname = firstName.toUpperCase();
  const lastname = lastName.toUpperCase();
  const curr = currency.toUpperCase();
  const { t } = useTranslation()
  const cardNumber = `${ number.slice(0, 4) } ${ number.slice(4, 8) } ${ number.slice(8, 12) } ${ number.slice(12, 16) }`;

  const [ copied, setCopied ] = useState(false)

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = number;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    }, 1000)
  };

  return (
    <div className="card" style={ { width: `${ 22 * size }mm`, padding: `${ 1 * size }mm`, height: `${ 13 * size }mm`, borderRadius: `${ 3 * size }px` } }>
      <div className="card-upper-content">
        <img className="card-upper-content__chip" src={ cardChip } alt="Card chip" />
        <img className="card-upper-content__type" src={ type.toLowerCase() === 'visa' ? visa : mastercard } alt="Card type" />
      </div>
      <div className="card-middle-content" style={ { fontSize: `${ 5.3 * size }px` } }>
        <div className="card__number" onClick={ copyToClipboard }>{ copied ? t('modals.create_card.copied') : cardNumber }</div>
        <div>{curr}</div>
      </div>
      <div className="card-lower-content">
        <div className="card-lower-content__info" style={ { fontSize: `${ 3.4 * size }px`, marginTop: `${ 1 * size }px` } }>
          <div className="card-lower-content__item">
            VALID TILL<span className="expiration">{expiration}</span></div>
          <div className="card-lower-content__item name">
            {firstname}
            {' '}
            {lastname}
          </div>
        </div>
        <WifiIcon style={ { background: '#4F30C1', fontSize: `${ 9 * size }px`, padding: '2%', borderRadius: `${ 2 * size }px` } } />
      </div>
    </div>
  );
};

Card.defaultProps = {
  size: 3,
  number: '1234567898765236',
  firstName: 'firstname',
  lastName: 'lastname',
  type: 'visa',
  expiration: '07/23',
  currency: 'uah',
};

Card.propTypes = {
  size: PropTypes.number,
  number: PropTypes.string,
  type: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  expiration: PropTypes.string,
  currency: PropTypes.string,
};
