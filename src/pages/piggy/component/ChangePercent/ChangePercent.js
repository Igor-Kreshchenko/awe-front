import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './ChangePercent.scss'
import { connect } from 'react-redux';
import { changePercentAction, changePercentStopAction } from '../../piggyPage-slice';
import { SuccessModal } from '../SuccessModal/SuccessModal';

const ChangePercentComponent = ({ setOpenModal, piggyID, cardID, isSuccess, startChangePercent, stopChangePercent }) => {
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

  const changePercent = () => {
    const formatPercent = percent / 100
    startChangePercent({ 
      percent: formatPercent,
      piggyID,
      cardID 
    })
  }

  const stopChange = () => {
    stopChangePercent()
    setOpenModal(false)
  }

  if (isSuccess) {
    return <SuccessModal title={ t('piggy.percentChanged') } stopChange={ stopChange }/>
  }

  return (
    <div className="changePercent-wrapper">
      <div className="changePercent__title">{ t('changePercent.title') }</div>
      <div className="changePercent__description">{ t('changePercent.description') }</div>
      <TextField style={ { marginBottom: 20 } } onChange={ handleChangeField } value={ percent } label={ t('changePercent.percent') } variant="outlined" type="number" fullWidth />
      <Button onClick={ changePercent } style={ { background: '#4F30C1', color: 'white', marginBottom: 10 } } size="large" variant="outlined" fullWidth>{ t('modals.button_5') }</Button>
      <Button onClick={ () => setOpenModal(false) } variant="outlined" size="large"  fullWidth>{ t('modals.button_2') }</Button>
    </div>
  )
}

ChangePercentComponent.propTypes = {
  setOpenModal: PropTypes.func,
  piggyID: PropTypes.number,
  cardID: PropTypes.number,
  isSuccess: PropTypes.bool,
  startChangePercent: PropTypes.func,
  stopChangePercent: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    piggyID: state.piggyReducer.selectedPiggy.ID,
    cardID: state.piggyReducer.selectedPiggy.CardID,
    isSuccess: state.piggyReducer.changedPercentSuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startChangePercent: (data) => dispatch(changePercentAction(data)),
    stopChangePercent: () => dispatch(changePercentStopAction()),
  }
}

export const ChangePercent = connect(mapStateToProps, mapDispatchToProps)(ChangePercentComponent)
