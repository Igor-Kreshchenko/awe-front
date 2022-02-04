import React from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
import './BanksList.scss'
import { BanksListItem } from './BanksListItem/BanksListItem'

export const BanksList = ({ banks }) => {
    const { t } = useTranslation();

    return (
      <div className="banksList">
        <h3 className="banksList__title">{ t('map.title') }</h3>
        {
          banks.length ?
            <div className="banksList_list">
              {banks.map(({ id, index, email, phone, address, city, name }) => {
                return <BanksListItem
                          key={ id }
                          index={ index }
                          email={ email }
                          phone={ phone }
                          address={ address }
                          city={ city }
                          name={ name }
                      />
              })}
            </div> :
            <div className="banksList_list__nobunks">
              { t('map.nobunks') } :(
            </div>
        }
        
      </div>
    )
}

BanksList.propTypes = {
  banks: PropTypes.array,
};
