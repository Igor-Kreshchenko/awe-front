import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import '../LoanList.scss'
import { LoanModal } from '../LoanModal/LoanModal';

export const LoanListItem = ({ currency, loan, payLoan }) => {
    const { t } = useTranslation();

    const getDate = (date) => {
        const resDate = new Date(date);
        const day = resDate.getDate();
        const month = resDate.getMonth()+1;
        const year = resDate.getFullYear();
        return `${ day }/${ month }/${ year }`
    }

    const [ open, setOpen ] = useState(false);
  
    const handleModal = (e) => {
        e.preventDefault()
        if (open) {
            setOpen(false)
        } else setOpen(true)
    }

    return(
      <>
        {open && <LoanModal closeModal={ handleModal } minPayment={ loan.MinimalMonthlyPayment } loanID={ loan.ID } cardID={ loan.CardID } payLoan={ payLoan } />}
        {loan.CreatedAt && <Box className="loan-item">
          <div className="loan-item_block">
            <p><span className="loan-item-description">{ t('loan.CreatedAt') }: </span>{ getDate(loan.CreatedAt) }</p>
            <p><span className="loan-item-description">{ t('loan.LoanAmount') }: </span> { loan.LoanAmount } { currency } </p>
            <p><span className="loan-item-description">{ t('loan.Term') }: </span> { loan.Term } { t('loan.Month') }</p>
          </div>
          <div className="loan-item_block">
            <p><span className="loan-item-description">{ t('loan.Interest') }: </span> { loan.Interest }</p>
            <p><span className="loan-item-description">{ t('loan.HaveToPay') }: </span> { loan.HaveToPay } { currency } </p>
            <p><span className="loan-item-description">{ t('loan.MinMonthPaiment') }: </span> { loan.MinimalMonthlyPayment } { currency } </p>
          </div>
          <div className="loan-item_block">
            <p><span className="loan-item-description">{ t('loan.Paid') }: </span> { loan.Paid } { currency } </p>
            <p><span className="loan-item-description">{ t('loan.NextPaymentDate') }: </span> { getDate(loan.NextPaymentDate) }</p>
          </div>
          <div>
            <Button color="primary" variant="outlined" fullWidth size="large" onClick={ handleModal }>{ t('loan.PayButton') }</Button>
          </div>
        </Box>}
      </>
    )
}

LoanListItem.propTypes = {
    currency: PropTypes.string,
    loan: PropTypes.object,
    payLoan: PropTypes.func
  };