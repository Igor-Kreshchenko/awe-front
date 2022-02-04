import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CreateTransaction.scss';
import { Select, TextField, Button, MenuItem } from '@material-ui/core';
import { createTransactionStartAction, createTransactionStopAction } from '../../cardsSidebar-slice';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTranslation } from 'react-i18next';

const mainButtonStyle = {
    border: 'solid 1px black',
    marginBottom: '10px'
}

const CreateTransactionComponent = ({ closeModal, createTransaction, cardID, isCreating, creatingSuccess, createTransactionStop, error }) => {

    const { t } = useTranslation()
    const [ sendBy, setSendBy ] = useState(1);
    const [ amount, setAmount ] = useState(0);
    const [ message, setMessage ] = useState('');
    const [ recipientDetails, setRecipientDetails ] = useState({ type:  t('modals.create_transaction.card') , value: '' });

    const messageHandler = e => {
        e.preventDefault()
        if(message.length < 120){
            setMessage(e.target.value)
        }
    }

    const recipientDetailsHandler = (e)=>{
        e.preventDefault()
        setRecipientDetails({ ...recipientDetails, value: e.target.value })
    }

    const amountHandler = (e) => {
        e.preventDefault()
        if(e.target.value < 0) setAmount(0)
        else setAmount(e.target.value)
    }

    const sendByHandler = e => {
        e.preventDefault()
        setSendBy(e.target.value)
        if (e.target.value === 1) setRecipientDetails({ ...recipientDetails, type:  t('modals.create_transaction.card')  })
        if (e.target.value === 2) setRecipientDetails({ ...recipientDetails, type:  t('modals.create_transaction.email')  })
        if (e.target.value === 3) setRecipientDetails({ ...recipientDetails, type:  t('modals.create_transaction.phone')  })
    }

    const createTransactions = ()=>{
       amount > 0 && createTransaction({
            senderCardId: cardID,
            receiverCardId: recipientDetails.ID,
            amount: parseInt(amount),
            method: sendBy,
            methodData: recipientDetails.value,
            message
        })
    }

    const finishCreating = (e)=>{
        closeModal(e)
        createTransactionStop()
    }

    if(creatingSuccess){
        return (
          <div className="create-card__success">
            <div>
              <h2 className="create-card__title success">{ t('modals.create_transaction.success') } </h2>
              <div className="create-card__success-icon"> <CheckCircleIcon style={ { fontSize: '80px', color: 'green' } }/></div>
              <Button color="primary" style={ { marginTop: '50px' } } variant="outlined"
                      fullWidth size="large" onClick={ finishCreating }>{ t('modals.button_3') }</Button>
            </div>
          </div>
        )
    }

    return (
      <div className="create-transaction">
        <h2 className="create-transaction__title">{ t('modals.create_transaction.title') }</h2>
        <Select onChange={ sendByHandler } value={ sendBy } defaultValue={ 1 } variant="outlined" style={ { width: '100%' } }>
          <MenuItem value={ 1 }>{ t('modals.create_transaction.sendByCard') }</MenuItem>
          <MenuItem value={ 2 }>{ t('modals.create_transaction.sendByEmail') }</MenuItem>
          <MenuItem value={ 3 }>{ t('modals.create_transaction.sendByPhone') }</MenuItem>
        </Select>
        <div className="create-transaction__inputs">
          <TextField
                variant="outlined"
                fullWidth
                label={ recipientDetails.type }
                onChange={ recipientDetailsHandler }
          />
        </div>
        <TextField
            variant="outlined"
            style={ { marginBottom: '50px' } }
            type="number"
            label={ t('modals.amount') }
            fullWidth
            value={ amount }
            onChange={ amountHandler }
        />
        <TextField
              variant="outlined"
              style={ { marginBottom: '50px' } }
              type="text"
              label={ t('modals.create_transaction.message') }
              multiline
              rows={ 3 }
              fullWidth
              value={ message }
              onChange={ messageHandler }
        />
        <div className="create-transaction__error">{ error ? error.data.message : '' }</div>
        <Button disabled={ isCreating } type="submit" color='primary' size="large"
                fullWidth style={ { ...mainButtonStyle, color: 'white', background: '#4F30C1' } }
                onClick={ createTransactions }
        >
          { isCreating ? t('modals.button_4') : t('modals.button_1') }
        </Button>
        <Button onClick={ closeModal } size="large" fullWidth style={ { ...mainButtonStyle } }>
          { t('modals.button_2') }
        </Button>
      </div>
    );
};

CreateTransactionComponent.propTypes = {
    closeModal: PropTypes.func,
    createTransaction: PropTypes.func,
    cardID: PropTypes.number,
    isCreating: PropTypes.bool,
    creatingSuccess: PropTypes.bool,
    createTransactionStop: PropTypes.func,
    error: PropTypes.object
};

const mapStateToProps = (state)=>({
    cardID: state.cardsReducer.selectedCard.ID,
    creatingSuccess: state.cardsReducer.creatingTransactionSuccess,
    isCreating: state.cardsReducer.isTransactionCreating,
    error: state.cardsReducer.createTransactionError
})

const mapDispatchToProps = (dispatch)=>({
    createTransaction: (data) => dispatch(createTransactionStartAction(data)),
    createTransactionStop: (data) => dispatch(createTransactionStopAction(data))
})

export const CreateTransaction = connect(mapStateToProps, mapDispatchToProps)(CreateTransactionComponent)
