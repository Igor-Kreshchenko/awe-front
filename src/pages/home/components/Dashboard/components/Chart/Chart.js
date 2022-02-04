import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { Chart, BarSeries, ArgumentAxis, ValueAxis, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';
import { Button, Paper } from '@material-ui/core';
import './Chart.scss';
import { useTranslation } from 'react-i18next';
import { roundCardAmount } from '../../../../../../common/helpers';

const buttonStyle = {
    margin: '5px',
    textTransform: 'none'
}

export const ChartComponent = ({ day, week, month, currency, amount }) => {
    const [ targetItem, setTargetItem ] = useState()
    const { t } = useTranslation()

    const dayMapped = day.map(item => ({ Date: item.Date, Amount: roundCardAmount(item.Amount) }));
    const weekMapped = week.map(item => ({ Date: item.Date, Amount: roundCardAmount(item.Amount) }));
    const monthMapped = month.map(item => ({ Date: item.Date, Amount: roundCardAmount(item.Amount) }));

    const [ showLabels, setShowLabels ] = useState(window.innerWidth <= 500 ? false : true)

    const [ date, setDate ] = useState({ date: dayMapped, value: 1 })

    const updateWidth = () => {
        if(window.innerWidth <= 500) {
            setShowLabels(false)
        }
        if (window.innerWidth > 500) {
            setShowLabels(true)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    return (
      <div className="dashboard-chart">
        <div className="dashboard-chart__header">
          { t('dashboard.moneyCharts.myExpenses') }
          <div className="dashboard-chart__amount">
            <div>
              <Button style={ { ...buttonStyle, border: date.value === 1 ? 'solid 2px black' : 'solid 2px lightgray' } }
                      onClick={ () => { setDate({ date: dayMapped, value: 1 }) } }
                      variant="outlined" size="small">{ t('dashboard.moneyCharts.day') }</Button>
              <Button style={ { ...buttonStyle, border: date.value === 2 ? 'solid 2px black' : 'solid 2px lightgray' } }
                      onClick={ () => { setDate({ date: weekMapped, value: 2 }) } } 
                      variant="outlined" size="small">{ t('dashboard.moneyCharts.week') }</Button>
              <Button style={ { ...buttonStyle, border: date.value === 3 ? 'solid 2px black' : 'solid 2px lightgray' } }
                      onClick={ () => { setDate({ date: monthMapped, value: 3 }) } }
                      variant="outlined" size="small">{ t('dashboard.moneyCharts.month') }</Button>
            </div>
            <AccountBalanceWalletIcon color="action"/>
            { currency }{ amount }
          </div>
        </div>
        <div>
          <Paper style={ { boxShadow: 'none' } }>
            <Chart height={ 275 }
                   data={ date.date } rotated
            >
              <ArgumentAxis showLine={ false }  />
              <ValueAxis max={ 5 } showLabels={ showLabels } />

              <BarSeries color="#4F30C1"
                    valueField="Amount" argumentField="Date"
              />
              <EventTracker />
              <Tooltip targetItem={ targetItem } onTargetItemChange={ setTargetItem }/>
              <Animation />
            </Chart>
          </Paper>
        </div>
      </div>
    );
};

ChartComponent.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    day: PropTypes.array,
    week: PropTypes.array,
    month: PropTypes.array
};
