import React, { useState, forwardRef, useEffect } from 'react';
import './Dashboard.scss';
import { InputBase, Button, Modal, Backdrop } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { connect } from 'react-redux';
import ShortTextIcon from '@material-ui/icons/ShortText';
import moneyPiggy from './images/money-piggy-bank.png';
import { MoneyBoard } from './components/MoneyBoard/MoneyBoard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ChartComponent } from './components/Chart/Chart';
import { useTranslation, Trans } from 'react-i18next';
import { Loan } from './components/Loan/Loan';
import { httpService, LangMenu } from '../../../../common';
import { roundCardAmount } from '../../../../common/helpers';
import { LoanList } from './components/LoanList/LoanList';
import { getCurrencySymbol } from '../../../../common/helpers/getCurrencySymbol';

const ModalRef = forwardRef((props, ref) => (<div ref={ ref } { ...props } ></div>));

const buttonStyle = {
    minWidth: '1px',
    width: '50px',
    borderRadius: '10px',
    color: '#505050',
}

const DashboardComponent = ({ openMenu, setOpenMenu, chartsData, isLoading, card, loanList })=>{
    const { t } = useTranslation()
    const [ open, setOpen ] = useState(false)
    const [ cardAmount, setCardAmount ] = useState(0)

  useEffect(() => {
    const getAmount = async () => {
      const { data: { data } } = await httpService.get(`cards/bank-transactions/balance/${ card.ID }`)
      setCardAmount(data)
    }

    getAmount()
  }, [ card ]) 

    const handleModal = (e) => {
        e.preventDefault()
        if (open) {
            setOpen(false)
        } else setOpen(true)
    }

    const menuHandler = () => {
        if(openMenu) setOpenMenu(false)
        else setOpenMenu(true)
    }

    return <div className="dashboard-wrapper">
      <div className="dashboard-upper__tools">
        <div className="dashboard-upper__search-container">
          <Button onClick={ menuHandler } style={ { ...buttonStyle, marginRight: '40px' } }>
            <ShortTextIcon fontSize="large"/>
          </Button>
          <InputBase disabled className="dashboard-upper__search" type="search" fullWidth={ true } placeholder="Search"/>
        </div>
        <Box>
          <LangMenu />
        </Box>
      </div>
      <div className="dashboard-loan">
        <div className="dashboard-loan__description">
          <h3 className="dashboard-loan__header">{ t('dashboard.loan.title') }</h3>
          <p className="dashboard-loan__text">
            { t('dashboard.loan.description') }
          </p>
          <Button disableElevation size="medium"
                        onClick={ handleModal }
                        style={ { background: '#f66b0a',color: 'white', marginTop: '10px', textTransform: 'none', fontWeight: 'bold' } }
                        variant="contained">
            <p>{ t('dashboard.loan.buttonText') }</p>
          </Button>
        </div>
        <img className="dashboard-loan__image" src={ moneyPiggy } alt="loan"/>
      </div>
      { isLoading ? <div className="dashboard-calculations__progres"><CircularProgress/></div> : (
        <div className="dashboard-calculations">
          <div className="dashboard-calculations__left">
            <MoneyBoard total={ roundCardAmount(chartsData.TotalSavings) }
                              today={ roundCardAmount(chartsData.SavingsToday) }
                              week={ roundCardAmount(chartsData.SavingsThisWeek) }
                              month={ roundCardAmount(chartsData.SavingsThisMonth) }
                              currency={ getCurrencySymbol(card.Currency) }
                              savings={ true }/>

            <MoneyBoard total={ roundCardAmount(chartsData.TotalExpenses) }
                              today={ roundCardAmount(chartsData.ExpensesToday) }
                              week={ roundCardAmount(chartsData.ExpensesThisWeek) }
                              month={ roundCardAmount(chartsData.ExpensesThisMonth) }
                              currency={  getCurrencySymbol(card.Currency) }
                              savings={ false }/>
          </div>
          <ChartComponent day={ chartsData.ExpensesDay }
                              week={ chartsData.ExpensesWeek }
                              month={ chartsData.ExpensesMonth }
                              currency={ getCurrencySymbol(card.Currency) }
                              amount={ roundCardAmount(cardAmount) }  />
        </div>
          )}
      <LoanList currency={ card.Currency } list={ loanList }/>
      <Modal style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }
            open={ open }
             BackdropComponent={ Backdrop }
             BackdropProps={ {
                 timeout: 300,
             } }
             onClose={ handleModal }>
        <ModalRef>
          <Loan closeModal={ handleModal }/>
        </ModalRef>
      </Modal>
    </div>
}

DashboardComponent.propTypes = {
    openMenu: PropTypes.bool,
    setOpenMenu: PropTypes.func,
    chartsData: PropTypes.object,
    isLoading: PropTypes.bool,
    card: PropTypes.object,
    loanList: PropTypes.array
};

const mapStateToProps = (state) => ({
    chartsData: state.cardsReducer.chartsData,
    isLoading: state.cardsReducer.isLoadingChartsData,
    card: state.cardsReducer.selectedCard,
    loanList: state.cardsReducer.loanList
})

export const Dashboard = connect(mapStateToProps)(DashboardComponent)