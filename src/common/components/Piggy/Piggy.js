import React from 'react'
import './Piggy.scss'
import piggy from './images/piggy2.png'
import PropTypes from 'prop-types';

export const Piggy = ({ percent, currency }) => {

    return (
      <div className="piggy" style={ { width: 300, padding: 15, height: 130, borderRadius: 10 } } >
        <img className="piggy-left-content__img" src={ piggy } alt="Piggy img" />
        <div className="piggy-right-content">
          <div className="piggy-right-content__percent">
            {percent} %
          </div>
          <div className="piggy-right-content__currency">
            {currency}
          </div>
        </div>
      </div>
    )
}

Piggy.propTypes = {
  percent: PropTypes.number,
  currency: PropTypes.string,
}