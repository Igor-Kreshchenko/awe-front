import { Box, Button, Modal } from '@material-ui/core';
import React, { useEffect, useState, forwardRef } from 'react';
import { Card } from '../../common';
import { Piggy } from '../../common/components';
import { Layout } from '../../common/components/Layout';
import { PiggyForm } from './component/PiggyForm/PiggyForm';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import './PiggyPage.scss'
import { ChangePercent } from './component/ChangePercent/ChangePercent';
import { CreatePiggy } from './component/CreatePiggy/CreatePiggy';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { loadCardsAction, loadPiggyAction } from './piggyPage-slice';
import { getCurrencySymbol } from '../../common/helpers/getCurrencySymbol';
import { httpService } from '../../common';
import { roundCardAmount } from '../../common/helpers';

const ModalRef = forwardRef((props, ref) => (<div ref={ ref } { ...props } ></div>));

const PiggyPageComponent = ({ openMenu, setOpenMenu, loadAllCards, cards, loadPiggy, piggy, isSendMoneySuccess }) => {

  const { t } = useTranslation()

  const [ openModalPercent, setOpenModalPercent ] = useState(false)
  const [ openModalPiggy, setOpenModalPiggy ] = useState(false)
  const [ cardAmount, setCardAmount ] = useState(0)
  const [ activeCardIndex, setActiveCardIndex ] = useState(0)

  useEffect(() => {
    loadAllCards({ index: activeCardIndex })
  }, [ isSendMoneySuccess ])

  useEffect(() => {
    const getAmount = async () => {
      const { data: { data } } = await httpService.get(`cards/bank-transactions/balance/${ cards[ activeCardIndex ].ID }`)
      setCardAmount(data)
    }

    if (cards[ activeCardIndex ]) {
      getAmount()
    }
  }, [ cards, activeCardIndex ]) 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (currentCardIndex) => {
      setActiveCardIndex(currentCardIndex)
      loadPiggy({ cardID: cards[ currentCardIndex ].ID })
    }
};

  return (
    <Layout openMenu={ openMenu } setOpenMenu={ setOpenMenu }>
      <div className="piggyPage__title">{ t('piggy.title') }</div>
      {
        !cards.length ?
          <div className="piggyPage-card__nocard">{ t('piggy.noCard') }</div> 
          :
          <Box className="piggyPage">
            <div className="piggyPage-piggy-wrapper">
              <div style={ { fontSize: 25, marginBottom: 20 } }>{ t('piggy.piggy') }</div>
              {
                !!piggy ? 
                  <div className="piggyPage-piggy-wrapper__buttom">
                    <Piggy percent={ piggy.Percent * 100 } currency={ piggy.Currency }/>
                    <div className="piggyPage-piggy__amount">
                      { t('piggy.amount') }: <span>{piggy.Amount} { getCurrencySymbol(piggy.Currency) }</span>
                    </div>
                    <Button onClick={ () => setOpenModalPercent(true) } className="piggyPage-piggy__btn" style={ { backgroundColor: 'rgb(79, 48, 193)', color: 'white' } }>{ t('piggy.changePercent') }</Button>
                  </div> 
                  :
                  <div className="piggyPage-piggy_nopiggy" >
                    <div className="piggyPage-piggy_nopiggy__title">{ t('piggy.noPiggy') }</div>
                    <Button onClick={ () => setOpenModalPiggy(true) } variant="outlined" size="large" style={ { backgroundColor: '#0f9b0d', color: 'white' } }>{ t('piggy.createPiggy') }</Button>
                  </div>  
              }
            </div>
            <div className="piggyPage-card-wrapper">
              <div style={ { fontSize: 25, marginBottom: 20 } }>{ t('piggy.card') }</div>
              <div>
                <Slider { ...sliderSettings }>
                  {
                    cards.map((card)=>{
                      return <div key={ card.ID }>
                        <Card size={ 4 } type={ card.Type } currency={ card.Currency } firstName={ card.FirstName } lastName={ card.LastName }
                            expiration={ card.Expiration } number={ card.Number }/>
                      </div> })
                  }
                </Slider> 
              </div>
              {
                cards.length ? 
                  <div className="piggyPage-card__amount">
                    { t('piggy.amount') }: <span>{ roundCardAmount(cardAmount) } { getCurrencySymbol(cards[ activeCardIndex ].Currency) }</span>
                  </div>
                : ''
              }
              
            </div>
            <PiggyForm piggyID={ !!piggy ? piggy.ID : '' } cardID={ !!piggy ? piggy.CardID : '' }/>
          </Box>
      }

      <Modal
        style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }
        open={ openModalPercent }
        onClose={ () => setOpenModalPercent(false) }>
        <ModalRef>
          <ChangePercent setOpenModal={ setOpenModalPercent } />
        </ModalRef>
      </Modal>
      <Modal
        style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }
        open={ openModalPiggy }
        onClose={ () => setOpenModalPiggy(false) }>
        { cards.length && <ModalRef><CreatePiggy setOpenModal={ setOpenModalPiggy } cardNumber={ cards[ activeCardIndex ].Number } cardID={ cards[ activeCardIndex ].ID } userID={ cards[ activeCardIndex ].UserID } currency={ cards[ activeCardIndex ].Currency } /></ModalRef> }
      </Modal>
    </Layout>
  );
}

PiggyPageComponent.propTypes = {
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func,
  loadAllCards: PropTypes.func,
  cards: PropTypes.array,
  loadPiggy: PropTypes.func,
  piggy: PropTypes.object,
  isSendMoneySuccess: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    cards: state.piggyReducer.cards,
    piggy: state.piggyReducer.selectedPiggy,
    isSendMoneySuccess: state.piggyReducer.sendedMoneySuccess,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCards: (data) => dispatch(loadCardsAction(data)),
    loadPiggy: (data) => dispatch(loadPiggyAction(data))
  }
}

export const PiggyPage = connect(mapStateToProps, mapDispatchToProps)(PiggyPageComponent)