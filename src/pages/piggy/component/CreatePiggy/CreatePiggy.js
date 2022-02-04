import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './CreatePiggy.scss'
import { connect } from 'react-redux';
import { createPiggyAction, createPiggyStopAction } from '../../piggyPage-slice';
import { getCurrencyID } from '../../../../common/helpers/getCurrencyID';
import { SuccessModal } from '../SuccessModal/SuccessModal';

const CreatePiggyComponent = ({ setOpenModal, cardNumber, cardID, userID, currency, isSuccess, startCreatePiggy, stopCreatePiggy }) => {
    const [ percent, setPercent ] = useState(0) 

    const { t } = useTranslation()

    const handleChangeField = (e) => {
        if(e.target.value < 0) {
            setPercent(0)
        } else if(e.target.value > 100) {
            setPercent(1)
        } else {
            setPercent(e.target.value)
        }
    }

    const formatedNumber = `${ cardNumber.substring(0, 4) } ${ cardNumber.substring(4, 8) } ${ cardNumber.substring(8, 12) } ${ cardNumber.substring(12, 16) }`

    const createPiggy = () => {
      startCreatePiggy({
        userID,
        cardID,
        currency: getCurrencyID(currency),
        percent: Number(percent / 100),
      })
    }

    const stopChange = () => {
      stopCreatePiggy()
      setOpenModal(false)
    }

    if (isSuccess) {
      return <SuccessModal title={ t('piggy.piggyCreated') } stopChange={ stopChange } />
    }

    return (
      <div className="createPiggy-wrapper">
        <div className="createPiggy__title">{ t('piggy.createPiggyForCard') }</div>
        <span style={ { fontSize: 25 } }>{ formatedNumber }</span>
        <div className="createPiggy__description">{ t('piggy.enterPercent') }</div>
        <TextField style={ { marginBottom: 20 } } onChange={ handleChangeField } value={ percent } label={ t('piggy.percent') } variant="outlined" type="number" fullWidth />
        <Button onClick={ createPiggy } style={ { background: '#4F30C1', color: 'white', marginBottom: 10 } } size="large" variant="outlined" fullWidth>{ t('modals.button_6') }</Button>
        <Button onClick={ () => setOpenModal(false) } variant="outlined" size="large"  fullWidth>{ t('modals.button_2') }</Button>
      </div>
    )
}

CreatePiggyComponent.propTypes = {
    setOpenModal: PropTypes.func,
    cardNumber: PropTypes.string,
    cardID: PropTypes.number,
    userID: PropTypes.number,
    currency: PropTypes.string,
    isSuccess: PropTypes.bool,
    startCreatePiggy: PropTypes.func,
    stopCreatePiggy: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    isSuccess: state.piggyReducer.createdPiggySuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startCreatePiggy: (data) => dispatch(createPiggyAction(data)),
    stopCreatePiggy: () => dispatch(createPiggyStopAction())
  }
}

export const CreatePiggy = connect(mapStateToProps, mapDispatchToProps)(CreatePiggyComponent)
