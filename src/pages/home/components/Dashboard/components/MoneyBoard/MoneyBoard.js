import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './MoneyBoard.scss';
import { connect } from 'react-redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useTranslation } from 'react-i18next';

export const MoneyBoard = ({ savings, percentage, today, week, month, total, currency  }) => {
    const { t } = useTranslation()

    return (
      <div className="money-board">
        <div className="money-board__title">
          { savings ?  t('dashboard.moneyCharts.savings') : t('dashboard.moneyCharts.expenses') }
          <div className={ savings ? 'money-board__percentage up' : 'money-board__percentage' }>
            { !savings ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" /> }
          </div>
        </div>
        <div className="money-board__amount">{ currency }{ total }</div>
        <div className="money-board__date-box">
          <div>
            <div className="money-board__date">{ t('dashboard.moneyCharts.today') }</div>
            { currency }{ today }
          </div>
          <div>
            <div className="money-board__date" >{ t('dashboard.moneyCharts.thisWeek') }</div>
            { currency }{ week }
          </div>
          <div>
            <div className="money-board__date" >{ t('dashboard.moneyCharts.thisMonth') }</div>
            { currency }{ month }
          </div>
        </div>
      </div>
    );
};

MoneyBoard.propTypes = {
    savings: PropTypes.bool,
    percentage: PropTypes.number,
    amounts: PropTypes.object,
    total: PropTypes.number,
    today: PropTypes.number,
    week: PropTypes.number,
    month: PropTypes.number,
    currency: PropTypes.string
};
