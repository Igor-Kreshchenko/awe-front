import React, { useEffect, useState, forwardRef } from 'react';
import { connect } from 'react-redux';
import './CardsSidebar.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import { Card, Transaction } from '../../../../common';
import { Button, IconButton, List, CircularProgress, Modal, DialogContent, Backdrop, Menu, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import { loadCardsAction, loadSelectedCardAction, setErrorAction, loadTransactionsAction } from './cardsSidebar-slice';
import Slider from 'react-slick';
import { CreateCard } from './components/CreateCard/CreateCard';
import { CreateTransaction } from './components/CreateTransaction/CreateTransaction';
import { useTranslation } from 'react-i18next';
import { roundCardAmount } from '../../../../common/helpers';

const ModalRef = forwardRef((props, ref) => (<div ref={ ref } { ...props } ></div>));

const buttonsStyle = {
    background: '#f66b0a',
    borderRadius: '10px',
    minWidth: 45,
    width: 45,
    height: 45
}

export const CardsSidebarComponent = ({ cards, loadCards, loadTransactions, isLoading, selectedCard, loadSelectedCard,
                                          UserID, creatingCardSuccess, creatingTransactionSuccess, setError, selectedCardTransactions }) => {
    let date
    const [ filter, setFilter ] = useState(1)
    const [ indx, setIndx ] = useState(0)
    const { t } = useTranslation()

    const [ openCardCreate, setOpenCardCreate ] = useState(false)
    const [ openTransactionCreate, setOpenTransactionCreate ] = useState(false)
    const [ anchorEl, setAnchorEl ] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (number) => {
        setFilter(number)
        setAnchorEl(null);
    };

    const openModalCardCreate = (e)=>{
        e.preventDefault()
        setOpenCardCreate(true)
    }

    const openModalTransactionCreate = (e)=>{
        e.preventDefault()
        setOpenTransactionCreate(true)
    }

    const closeModalCardCreate = (e)=>{
        e.preventDefault()
        setOpenCardCreate(false)
        setError(null)
    }

    const closeModalTransactionCreate = (e)=>{
        e.preventDefault()
        setOpenTransactionCreate(false)
        setError(null)
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (current)=>{
            setIndx(current)
            loadSelectedCard({ cards, index: current })
        }
    };

    useEffect(() => {
        loadCards({ id: UserID, indx })
    }, [ creatingCardSuccess, creatingTransactionSuccess ]);

    useEffect(() => {
      if (selectedCard?.ID) {
        loadTransactions(selectedCard.ID)
      }
  }, [ selectedCard ]);

    if (isLoading){
        return <div className="card-sidebar__circular">
          <CircularProgress/>
        </div>
    }

    return (
      <div className="card-sidebar">
        <div className="card-sidebar-content">
          <div className="card-sidebar-content__cards">
            <div className="card-sidebar__create">
              { t('cardsSidebar.myCards') }
              <Button style={ buttonsStyle } name="card" variant="contained" color="primary" onClick={ openModalCardCreate }>
                <AddIcon fontSize="large"/>
              </Button>
            </div>
            { cards.length ?
              <Slider { ...settings }>
                {
                    cards.map((card)=>{
                        return <div key={ card.ID }>
                          <Card size={ 3.35 } type={ card.Type } currency={ card.Currency } firstName={ card.FirstName } lastName={ card.LastName }
                          expiration={ card.Expiration } number={ card.Number }/>
                        </div>
                    })
                }
              </Slider> :
              <div className="card-sidebar__none"> { t('cardsSidebar.noCards') }</div> }
          </div>
          <div className="card-sidebar-content__transactions">
            <div className="card-sidebar__create" style={ { paddingBottom: '20px' } }>
              { t('cardsSidebar.myTransactions') }
              <>
                <IconButton onClick={ handleClick }>
                  <FilterListIcon fontSize="large"/>
                </IconButton>
                <Menu
                      id="simple-menu"
                      anchorEl={ anchorEl }
                      keepMounted
                      open={ Boolean(anchorEl) }
                      onClose={ handleClose }
                >
                  <MenuItem  onClick={ () => handleClose(1) }>{ t('cardsSidebar.all') }</MenuItem>
                  <MenuItem  onClick={ () => handleClose(2) }>{ t('cardsSidebar.incomes') }</MenuItem>
                  <MenuItem  onClick={ () => handleClose(3) }>{ t('cardsSidebar.costs') }</MenuItem>
                </Menu>
                <Button style={ buttonsStyle } onClick={ openModalTransactionCreate } variant="contained" color="primary">
                  <AddIcon fontSize="large"/>
                </Button>
              </>
            </div>
            <List className="MuiList-root MuiList-padding custom">
              {
                selectedCardTransactions ?  [ ...selectedCardTransactions ].reverse().map((e) => {
                    if ( filter === 2 && e.SenderCard.Number === selectedCard.Number ) return
                    if ( filter === 3 && e.SenderCard.Number !== selectedCard.Number ) return
                    const check = date !== e.CreatedAt.slice(0, 10);
                    (date !== e.CreatedAt.slice(0, 10)) ? date = e.CreatedAt.slice(0, 10) : date;

                    return (e.Type && <div key={ e.ID }>
                      <div className="card-sidebar__transaction">{ check ? date  : '' }</div>
                      <Transaction amount={ roundCardAmount(e.Amount) } currency={ e.Currency } senderFullName={ e.ReceiverCard.FirstName + ' ' + e.ReceiverCard.LastName }
                                 recipientFullName={ e.ReceiverCard.FirstName + ' ' + e.ReceiverCard.LastName }
                                 time={ { hour: new Date(e.CreatedAt).getHours(), min: new Date(e.CreatedAt).getMinutes() } }
                                 message={ e.Message } senderCard={ e.SenderCard.Number } cardNumber={ selectedCard.Number } type={ e.Type } typeDetails={ e.TypeDetails } />
                    </div>)
              }) : <div className="card-sidebar__none"> { t('cardsSidebar.noTransactions') }</div>
             }
            </List>
          </div>
        </div>
        <Modal style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }
            open={ openCardCreate }
            onClose={ closeModalCardCreate }
            BackdropComponent={ Backdrop }
            BackdropProps={ {
                timeout: 300,
            } }
        >
          <ModalRef>
            <CreateCard closeModal={ closeModalCardCreate }/>
          </ModalRef>
        </Modal>
        <Modal style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }
                 open={ openTransactionCreate }
                 onClose={ closeModalTransactionCreate }
                 BackdropComponent={ Backdrop }
                 BackdropProps={ {
                     timeout: 300,
                 } }
        >
          <ModalRef>
            <CreateTransaction closeModal={ closeModalTransactionCreate }/>
          </ModalRef>
        </Modal>
      </div>
    );
};

CardsSidebarComponent.propTypes = {
    cards: PropTypes.array,
    selectedCardTransactions: PropTypes.array,
    selectedCard: PropTypes.object,
    isLoading: PropTypes.bool,
    loadCards: PropTypes.func,
    loadTransactions: PropTypes.func,
    loadSelectedCard: PropTypes.func,
    UserID: PropTypes.number,
    creatingCardSuccess: PropTypes.bool,
    creatingTransactionSuccess: PropTypes.bool,
    setError: PropTypes.func
}

const mapStateToProps = (state)=>({
    cards: state.cardsReducer.cards,
    selectedCardTransactions: state.cardsReducer.selectedCardTransactions,
    isLoading: state.cardsReducer.isLoading,
    selectedCard: state.cardsReducer.selectedCard,
    auth: state.profileReducer.auth,
    creatingCardSuccess: state.cardsReducer.creatingCardSuccess,
    creatingTransactionSuccess: state.cardsReducer.creatingTransactionSuccess
})

const mapDispatchToProps = (dispatch)=>({
    loadCards: (data) => dispatch(loadCardsAction(data)),
    loadTransactions: (data) => dispatch(loadTransactionsAction(data)),
    loadSelectedCard: data => dispatch(loadSelectedCardAction(data)),
    setError: (data) => dispatch(setErrorAction(data))
})

export const CardsSidebar = connect(mapStateToProps, mapDispatchToProps)(CardsSidebarComponent)
