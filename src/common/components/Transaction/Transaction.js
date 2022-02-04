import React from 'react';
import PropTypes from 'prop-types';
import './Transaction.scss';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { useTranslation } from 'react-i18next';

export const Transaction = ({ amount, currency, senderFullName, recipientFullName, message, senderCard, cardNumber, time, type, typeDetails }) => {
    const { t } = useTranslation()

    let transactionTitle;

    switch(type) {
      case 'transfer': {
        transactionTitle =  (senderCard !== cardNumber) ? senderFullName : recipientFullName;
        
        break;
      }
      case 'loan': {
        transactionTitle = t('bankTransaction.loan')

        break;
      }
      case 'ticket': {
        transactionTitle = t('bankTransaction.ticket')

        break;
      }
      case 'piggy': {
        transactionTitle = t('bankTransaction.piggy')

        break;
      }
    }

    return (
      type && (<div className="transaction-wrapper">
        <Accordion style={ { borderRadius: '20px', background: '#4F30C1', color: 'white' } }>
          <AccordionSummary>
            <div className="transaction-wrapper">
              <div className="transaction-date">
                { time.hour }:{ (time.min.toString().length === 1) ? `0${ time.min }`: time.min }
              </div>
              <div className="transaction-content">
                <div className="transaction-content__info">
                  { (senderCard === cardNumber) ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/> }
                  <div style={ { paddingLeft: '5px' } }>
                    { transactionTitle }
                  </div>
                </div>
                { (senderCard === cardNumber) ? '-' : '+' }{ amount } { currency.toUpperCase() }
              </div>
            </div>
          </AccordionSummary>
          {(message || typeDetails) && <AccordionDetails>
            { message && `${ t('modals.create_transaction.message') }: ${ message }` }
            { typeDetails && `${ t('bankTransaction.details') }: ${ typeDetails }` }
          </AccordionDetails>}
        </Accordion>
      </div>)
    );
};

Transaction.defaultProps = {
    message: 'None'
}

Transaction.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
    senderFullName: PropTypes.string,
    recipientFullName: PropTypes.string,
    message: PropTypes.string,
    recipientID: PropTypes.number,
    senderCard: PropTypes.string,
    cardNumber: PropTypes.string,
    time: PropTypes.object,
    type: PropTypes.string,
    typeDetails: PropTypes.string
};