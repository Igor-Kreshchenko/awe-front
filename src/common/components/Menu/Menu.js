import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Menu.scss';
import userLogo from './images/user.png';
import { Link } from 'react-router-dom';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ConfirmationNumberRoundedIcon from '@material-ui/icons/ConfirmationNumberRounded';
import PiggyIcon from '@material-ui/icons/MonetizationOn';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonBase } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { logoutUser } from './../../../pages';

export const MenuComponent = ({ firstName, lastName, logout, openMenu, setOpenMenu }) => {
  const [ showCloseButton, setShowCloseButton ] = useState(false)
  const { t } = useTranslation()

  const updateWidth = () => {
    if(window.innerWidth <= 950) {
      if(!showCloseButton) setShowCloseButton(true)
    } else {
      if(setShowCloseButton) setShowCloseButton(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <div className={ !openMenu ? 'menu-wrapper' : 'menu-wrapper active' }>
      { showCloseButton && <div className="menu__close"><ButtonBase onClick={ () => setOpenMenu(false) }><CloseIcon fontSize="large" /></ButtonBase></div> }
      <Link style={ { textDecoration: 'none' } } to="/"><div className="menu__logo" >{ !openMenu ? 'Awesome Bank' : 'AWE' }</div></Link>
      <div className="menu__profile">
        <img className="menu__profile logo" src={ userLogo } />
        <div className={ !openMenu ? 'menu__profile name' : 'menu__profile name active' } >{ firstName } { lastName }</div>
      </div>
      <ul className="menu__links">
        <Link style={ { textDecoration: 'none' } } to="/home">
          <li className="menu__links-item">
            <DonutSmallIcon fontSize={ !openMenu ? 'default' : 'large' } style={ { marginRight: '5px' } } />
            <div className={ !openMenu ? 'menu__links-item__text active' : 'menu__links-item__text' }>{ t('menu.home') }</div>
          </li>
        </Link>
        <Link style={ { textDecoration: 'none' } } to="/home/profile">
          <li className="menu__links-item">
            <AccountCircleIcon fontSize={ !openMenu ? 'default' : 'large' } style={ { marginRight: '5px' } } />
            <div className={ !openMenu ? 'menu__links-item__text active' : 'menu__links-item__text' }>{ t('menu.profile') }</div>
          </li>
        </Link>
        <Link style={ { textDecoration: 'none' } } to="/home/all-events">
          <li className="menu__links-item">
            <ConfirmationNumberRoundedIcon fontSize={ !openMenu ? 'default' : 'large' } style={ { marginRight: '5px' } } />
            <div className={ !openMenu ? 'menu__links-item__text active' : 'menu__links-item__text' }>{ t('menu.events') }</div>
          </li>
        </Link>
        <Link style={ { textDecoration: 'none' } } to="/home/piggy">
          <li className="menu__links-item">
            <PiggyIcon fontSize={ !openMenu ? 'default' : 'large' } style={ { marginRight: '5px' } } />
            <div className={ !openMenu ? 'menu__links-item__text active' : 'menu__links-item__text' }>{ t('menu.piggy') }</div>
          </li>
        </Link>
        <Link style={ { textDecoration: 'none' } } to="/home/map">
          <li className="menu__links-item">
            <MyLocationIcon fontSize={ !openMenu ? 'default' : 'large' } style={ { marginRight: '5px' } } />
            <div className={ !openMenu ? 'menu__links-item__text active' : 'menu__links-item__text' }>{ t('menu.map') }</div>
          </li>
        </Link>
        <Link style={ { textDecoration: 'none', display: 'block', marginTop: '30px' } } to="/" onClick={ logout }>
          <li className="menu__links-item">
            <ExitToAppIcon fontSize={ !openMenu ? 'default' : 'large' } style={ { marginRight: '5px' } } />
            <div className={ !openMenu ? 'menu__links-item__text active' : 'menu__links-item__text' }>{ t('menu.logout') }</div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

MenuComponent.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  logout: PropTypes.func,
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  firstName: state.profileReducer.user.FirstName,
  lastName: state.profileReducer.user.SecondName,
  isLoading: state.profileReducer.user.loading,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser())
});

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent)
