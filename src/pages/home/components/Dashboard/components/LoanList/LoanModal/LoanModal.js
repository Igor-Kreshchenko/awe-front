import { useState } from 'react';
import './LoanModal.scss';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

export const LoanModal = ({ closeModal, minPayment, loanID, cardID, payLoan }) => {
    const { t } = useTranslation();
    const [ amount, setAmount ] = useState(minPayment);

    const handleField = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
        if (e.target.value < 0) {
            setAmount(0)
        } else {
            setAmount(e.target.value)
        }
    }

    const pay = () => {
        amount > 0 && payLoan({
            loanID,
            cardID,
            amount: parseFloat(amount)
        })
    }

    return (
      <div className="loanModal-wrapper">
        <div className="loanModal-overlay">
          <div className="loanModal-content">
            <div className="loan__title">Awesome Bank { t('modals.payLoan.title') }</div>
            <TextField style= { { marginBottom: '10px' } } label={ t('modals.amount') } value={ amount } onChange={ handleField } fullWidth variant="outlined" type="number"/>
 
            <Button style={ { marginTop: '30px', background: '#4F30C1', color: 'white' } }
                size="large" fullWidth variant="outlined" onClick={ pay }>{ t('modals.button_1') }</Button>
            <Button style={ { marginTop: '10px' } } size="large" fullWidth variant="outlined" onClick={ closeModal } >{ t('modals.button_2') }</Button>
          </div>
        </div>
      </div>
    )
} 

LoanModal.propTypes = {
    closeModal: PropTypes.func,
    minPayment: PropTypes.number,
    loanID: PropTypes.number,
    cardID: PropTypes.number,
    payLoan: PropTypes.func
};