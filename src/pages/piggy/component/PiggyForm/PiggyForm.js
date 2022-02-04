import { Button, Modal, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './PiggyForm.scss'
import ArrowsIcon from '@material-ui/icons/CompareArrows';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { sendMoneyStopAction, sendMoneyToCardAction, sendMoneyToPiggyAction } from '../../piggyPage-slice';
import { SuccessModal } from '../SuccessModal/SuccessModal';

const PiggyFormComponent = ({ isSuccess, error, piggyID, cardID, startSendMoneyToPiggy, startSendMoneyToCard, stopSendMoney }) => {

    const { t } = useTranslation()

    const [ toCard, setToCard ] = useState(true)
    const [ amount, setAmount ] = useState(0)

    const handleFieldChange = (e) => {
        if(e.target.value < 0) {
            setAmount(0)
        } else {
            setAmount(e.target.value)
        }
    }

    const sendMoney = () => {
      if(toCard) {
        startSendMoneyToCard({ 
          amount: Number(amount),
          piggyID
        })
      } else {
        startSendMoneyToPiggy({ 
          amount: Number(amount),
          cardID
        })
      }
      setAmount(0)
    }

    const stopChange = () => {
      stopSendMoney()
    }

    return (
      <div className="piggy-form">
        <div className="piggy-form__title">
          { t('piggy.transfer.title') }
        </div>
        <div className="piggy-form__description">
          { t('piggy.transfer.description') }
        </div>
        <Button onClick={ () => setToCard(!toCard) } style={ { marginBottom: '30px', background: '#949497', color: 'white', width: '40%', height: 40 } }>
          <ArrowsIcon fontSize="large"/>
        </Button>
        <TextField onChange={ handleFieldChange } label={ t('piggy.amount') } value={ amount } fullWidth variant="outlined" type="number"/>   
        <Button onClick={ sendMoney } disabled={ !piggyID || (amount === 0) } className="piggy-form__btn" style={ { marginTop: '30px', height: 45, background: '#4F30C1', color: 'white' } } fullWidth>{ `${ toCard ? t('piggy.transfer.transferToCard') : t('piggy.transfer.transferToPiggy') }` }</Button>
        { error && <div style={ { color: 'red', marginTop: 10 } }>{ error.data.error }</div> }
        {
          isSuccess && <Modal
          style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }
          open={ isSuccess }>
            <div className="sendMoney__success">
              <SuccessModal title={ toCard ? t('piggy.transferedToCard') : t('piggy.transferedToPiggy') } stopChange={ stopChange } />
            </div>
          </Modal>
        }
      </div>
    )
}

PiggyFormComponent.propTypes = {
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.object,
  piggyID: PropTypes.number,
  cardID: PropTypes.number,
  startSendMoneyToPiggy: PropTypes.func,
  startSendMoneyToCard: PropTypes.func,
  stopSendMoney: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.piggyReducer.sendedMoneySuccess,
    error: state.piggyReducer.sendMoneyError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startSendMoneyToPiggy: (data) => dispatch(sendMoneyToPiggyAction(data)),
    startSendMoneyToCard: (data) => dispatch(sendMoneyToCardAction(data)),
    stopSendMoney: () => dispatch(sendMoneyStopAction())
  }
}

export const PiggyForm = connect(mapStateToProps, mapDispatchToProps)(PiggyFormComponent)