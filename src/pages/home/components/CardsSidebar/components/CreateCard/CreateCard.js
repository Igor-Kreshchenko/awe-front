import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './CreateCard.scss'
import { TextField, Button, Switch, FormGroup } from '@material-ui/core';
import { Card } from '../../../../../../common';
import visa from './images/visa.png';
import mastercard from './images/mastercard.png';
import { createCardStartAction, createCardStopAction } from '../../cardsSidebar-slice';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useTranslation, Trans } from 'react-i18next';

const currencyButtonStyle = {
    margin: '0 10px 10px 0',
    border: 'solid 1px gray'
}

const mainButtonStyle = {
    border: 'solid 1px black',
    marginBottom: '10px'
}

const CreateCardComponent = ({ firstName, lastName, closeModal, createCard, userID, newCard,
                                 isCreating, creatingSuccess, stopCreating, createCardError }) => {

    const { t } = useTranslation()
    const [ fullName, setFullName ] = useState({ firstName, lastName });
    const [ type, setType ] = useState(1);
    const [ currency, setCurrency ] = useState({ type: 'uah', value: 1 })
    const [ checked, setChecked ] = useState(false);

    const handleSwitcher = (event) => {
        setChecked(event.target.checked);
    };

    const nameHandler = (e)=>{
        e.preventDefault()
        setFullName({ ...fullName, [ e.target.name ]: e.target.value })
    }

    const creating = ()=>{
        createCard({
            userID,
            type,
            currency: currency.value,
            firstName: fullName.firstName,
            lastName: fullName.lastName
        })
    }

    const finishCreating = (e)=>{
        closeModal(e)
        stopCreating()
    }

    if(creatingSuccess){
        return (
          <div className="create-card__success">
            <div>
              <h2 className="create-card__title success">{ t('modals.create_card.success') } </h2>
              <div className="create-card__success-icon"> <CheckCircleIcon style={ { fontSize: '80px', color: 'green' } }/></div>
              <Card size={ 4 } firstName={ fullName.firstName } lastName={ fullName.lastName }
                      type={ (type === newCard.TypeID) ? 'visa' : 'mastercard' } currency={ currency.type }
                      number={ newCard.Number } expiration={ newCard.Expiration }

              />
              <Button color="primary" style={ { marginTop: '50px' } } variant="outlined" fullWidth size="large" onClick={ finishCreating }>{ t('modals.button_3') }</Button>
            </div>
          </div>
        )
    }

    return (
      <div className="create-card">
        <h2 className="create-card__title">Awesome Bank</h2>
        <div className="create-card__show-card">
          <Card firstName={ fullName.firstName } lastName={ fullName.lastName }
          type={ (type=== 1) ? 'visa' : 'mastercard' } currency={ currency.type }
          number="00000000000000000" expiration="07/2021"

          />
        </div>
        <div className="create-card__fullname">
          <TextField value={ fullName.firstName } fullWidth disabled={ !checked } name="firstName" onChange={ nameHandler }
                     variant="outlined" label={ t('modals.create_card.name') } style={ { margin: '20px 10px 0 0' } } />
          <TextField value={ fullName.lastName } fullWidth disabled={ !checked } name="lastName" onChange={ nameHandler }
                     variant="outlined" label={ t('modals.create_card.surname') }  style={ { margin: '20px 0 0 0' } }  />
        </div>
        <div className="create-card__show-switcher">
          <h6>{ t('modals.create_card.name_change') }</h6>
          <Switch
              checked={ checked }
              onChange={ handleSwitcher }
              color="primary"
          />
        </div>
        <h3 className="create-card__title">{ t('modals.create_card.type') }</h3>
        <div className="create-card__type">
          <Button style={ { background: `${ type === 1 ? 'lightgrey' : 'white' }`, borderRadius: '5px', padding: 0, marginRight: '10px' } }
                  onClick={ ()=>{ setType(1) } }>
            <img className="create-card__type-img" src={ visa }/>
          </Button>
          <Button style={ { background: `${ type === 2 ? 'lightgrey' : 'white' }`, borderRadius: '5px', padding: 0 } }
          onClick={ ()=>{ setType(2) } }>
            <img className="create-card__type-img" src={ mastercard }/>
          </Button>
        </div>
        <h3 className="create-card__title">{ t('modals.create_card.currency') }</h3>
        <div>
          <Button style={ { ...currencyButtonStyle, background: `${ currency.value === 1 ?  'lightgrey' : 'white' }` } }
                  onClick={ ()=>{ setCurrency({ type: 'uah', value: 1 }) } }>UAH</Button>
          <Button style={ { ...currencyButtonStyle, background: `${ currency.value === 2 ?  'lightgrey' : 'white' }` } }
                  onClick={ ()=>{ setCurrency({ type: 'usd', value: 2 }) } } >USD</Button>
          <Button style={ { ...currencyButtonStyle, background: `${ currency.value === 3 ?  'lightgrey' : 'white' }` } }
                  onClick={ ()=>{ setCurrency({ type: 'eur', value: 3 }) } } >EUR</Button>
          <Button style={ { ...currencyButtonStyle, background: `${ currency.value === 4 ?  'lightgrey' : 'white' }` } }
                  onClick={ ()=>{ setCurrency({ type: 'btc', value: 4 }) } }>BTC</Button>
        </div>
        <div className="create-card__error" >{ createCardError ? createCardError.data.message : '' }</div>
        <div className="create-card__main-buttons">
          <Button disabled={ isCreating } color='primary' size="large" fullWidth={ true } style={ { ...mainButtonStyle, color: 'white', background: '#4F30C1' } } onClick={ creating }>
            { isCreating ? t('modals.button_4') : t('modals.button_1') }
          </Button>
          <Button size="large" fullWidth={ true } style={ { ...mainButtonStyle } } onClick={ closeModal }>
            { t('modals.button_2') }
          </Button>
        </div>
      </div>
    );
};

CreateCardComponent.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    closeModal: PropTypes.func,
    createCard: PropTypes.func,
    userID: PropTypes.number,
    isCreating: PropTypes.bool,
    creatingSuccess: PropTypes.bool,
    stopCreating: PropTypes.func,
    createCardError: PropTypes.object,
    newCard: PropTypes.object
};

const mapStateToProps = (state)=>({
    firstName: state.profileReducer.user.FirstName,
    lastName: state.profileReducer.user.SecondName,
    userID: state.profileReducer.user.UserID,
    creatingSuccess: state.cardsReducer.creatingCardSuccess,
    isCreating: state.cardsReducer.isCardCreating,
    createCardError: state.cardsReducer.createCardError,
    newCard: state.cardsReducer.newCreatedCard
});

const mapDispatchToProps = (dispatch)=>({
    createCard: (data) => dispatch(createCardStartAction(data)),
    stopCreating: () => dispatch(createCardStopAction())
})

export const CreateCard = connect(mapStateToProps, mapDispatchToProps)(CreateCardComponent)