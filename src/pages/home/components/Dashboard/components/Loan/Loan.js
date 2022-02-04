import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Loan.scss';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { startGettingLoan, stopGettingLoan } from '../../../CardsSidebar/cardsSidebar-slice';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTranslation } from 'react-i18next';

export const LoanComponent = ({ closeModal, isLoading, isSuccess, error, startLoan, cardID, stopLoan, selectedCard } ) => {
    const [ amount, setAmount ] = useState(0)
    const [ loanTerm, setLoanTerm ] = useState(1);
    const { t } = useTranslation()

    const getLoan = () => {
        amount > 0 && Object.keys(selectedCard).length !== 0 && startLoan({
            cardID,
            amount: parseFloat(amount),
            term: parseFloat(loanTerm)
        })
    }

    const closeLoan = (e) => {
        stopLoan()
        closeModal(e)
    }

    const handleField = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
        if (e.target.value < 0) {
            setAmount(0)
        } else {
            setAmount(e.target.value)
        }
    }

    const handleTerm = (e) => {
        e.preventDefault()
        setLoanTerm(e.target.value);
    }

    if (isSuccess) {
        return <div className="create-card__success">
          <div>
            <h2 className="create-card__title success">{ t('modals.loan.success') }</h2>
            <div className="create-card__success-icon"> <CheckCircleIcon style={ { fontSize: '80px', color: 'green' } }/></div>
            <Button color="primary" style={ { marginTop: '50px' } } variant="outlined" fullWidth size="large"
                    onClick={ closeLoan }>{ t('modals.button_3') }</Button>
          </div>
        </div>
    }

    return (
      <div className="loan-wrapper">
        <div className="loan__title">Awesome Bank { t('modals.loan.title') }</div>
        <div className="loan__description"> { t('modals.loan.description') }</div>
        <TextField style= { { marginBottom: '10px' } } label={ t('modals.amount') } value={ amount } onChange={ handleField } fullWidth variant="outlined" type="number"/>
        { error ? error.data.message : '' }
       
        <FormControl fullWidth>
          <InputLabel>{ t('modals.term') }</InputLabel>
          <Select label={ t('modals.term') } value={ loanTerm } onChange={ handleTerm } fullWidth variant="outlined" >
            <MenuItem value={ 1 }>{ t('modals.loan.day') }</MenuItem>
            <MenuItem value={ 30 }>{ t('modals.loan.month') }</MenuItem>
            <MenuItem value={ 360 }>{ t('modals.loan.year') }</MenuItem>
          </Select>
        </FormControl>
       
        <Button style={ { marginTop: '30px', background: '#4F30C1', color: 'white' } }
                size="large" fullWidth variant="outlined" onClick={ getLoan }>{ isLoading ?  t('modals.button_4')  : t('modals.button_1') }</Button>
        <Button style={ { marginTop: '10px' } } size="large" fullWidth variant="outlined" onClick={ closeModal } >{ t('modals.button_2') }</Button>
      </div>
    );
};

LoanComponent.propTypes = {
    closeModal: PropTypes.func,
    isLoading: PropTypes.bool,
    isSuccess: PropTypes.bool,
    error: PropTypes.object,
    startLoan: PropTypes.func,
    cardID: PropTypes.number,
    stopLoan: PropTypes.func,
    selectedCard: PropTypes.object
};

const mapStateToProps = (state) => ({
    isLoading: state.cardsReducer.isGettingLoan,
    isSuccess: state.cardsReducer.gettingLoanSucces,
    error: state.cardsReducer.gettingLoanError,
    cardID: state.cardsReducer.selectedCard.ID,
    selectedCard: state.cardsReducer.selectedCard
})

const mapDispatchToProps = (dispatch) => ({
    startLoan: (data) => dispatch(startGettingLoan(data)),
    stopLoan: () => dispatch(stopGettingLoan())
})

export const Loan = connect(mapStateToProps, mapDispatchToProps)(LoanComponent)