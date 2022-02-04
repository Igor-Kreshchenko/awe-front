import React from 'react';
import './ExchangeRate.scss';
import PropTypes from 'prop-types';
import BarChartIcon from '@material-ui/icons/BarChart';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ExchangeRateComponent = ({ totalUsers, newUsers, totalTransactions, newTransactions, rate }) => {
  const { t } = useTranslation()
  const data = [
    {
      id: 1,
      count: totalUsers,
      name: t('bankData.users'),
      raise: true,
      raiseRate: newUsers
    },
    {
      id: 2,
      count: totalTransactions,
      name: t('bankData.transactions'),
      raise: true,
      raiseRate: newTransactions
    },
    {
      id: 3,
      count: 'BTC/USD',
      name: t('bankData.rate'),
      raiseRate: rate
    }
  ];
  return (
    <div className="exchange-wrapper">
      {data.map((el) => {
        return (
          <div key={ el.id } className="exchange-element">
            <div className="element-leftblock">
              <div className="element-count">
                {el.name === 'Trade Volume' && '$'}
                {el.count}
              </div>
              <div className="element-raise" style={ { color: el.raise ? 'green' : 'red' } }>
                {el.raise ? '+' : '-'}
                {el.raiseRate}
              </div>
            </div>
            <div className="element-rightblock">
              <div className="element-name">{el.name}</div>
              <div className="element-icon">
                <BarChartIcon style={ { color: el.raise ? 'green' : 'red' } } fontSize="large" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ExchangeRateComponent.propTypes = {
  totalUsers: PropTypes.number,
  newUsers: PropTypes.number,
  totalTransactions: PropTypes.number,
  newTransactions: PropTypes.number,
  rate: PropTypes.string
}

const mapStateToProps = (state) => ({
  totalUsers: state.landingPageReducer.data.TotalUsers,
  newUsers: state.landingPageReducer.data.NewUsers,
  totalTransactions: state.landingPageReducer.data.TotalTransactions,
  newTransactions: state.landingPageReducer.data.NewTransactions,
  rate: state.landingPageReducer.data.bpi.USD.rate
})

export const ExchangeRate = connect(mapStateToProps)(ExchangeRateComponent)