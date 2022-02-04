import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FacebookIcon from '@material-ui/icons/Facebook';
import { LangMenu, CustomSlider, ExchangeRate } from '../../common';
import './title.scss';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import transactionsImg from './images/transactions.svg';
import userImg from './images/user.svg';
import statImg from './images/stat.svg';
import { useTranslation } from 'react-i18next';
import { startDataAction } from './title-slice';
import CircularProgress from '@material-ui/core/CircularProgress';

export const TitleComponent = ({ getData, isLoading, isAuth }) => {
  const { t } = useTranslation()

  useEffect(()=>{
    getData()
  }, [])

  const history = useHistory();

  const onGetStarted = () => {
    history.push('/register');
  }

  const images = [ userImg, transactionsImg, statImg ];

  return (
    <>
      <div className="container">
        <main className="title-main-block">
          <nav className="nav">
            <div className="title-nav">
              <div className="nav-logo">
                <h1>
                  <Link className="title-navlinklogo" to="/">
                    AwesomeBank
                  </Link>
                </h1>
              </div>
            </div>
            <div className="title-nav">
              <div className="nav-element">
                { !isAuth ? (
                  <Link className="title-navlink" to="/login">{ t('landingPage.auth.login') }</Link>
                ) : (
                  <Link className="title-navlink" to="/home">{ t('menu.home') }</Link>
                ) }

              </div>
              <div className="nav-element">
                <Link className="title-navlink" to="/register">
                  { t('landingPage.auth.register') }
                </Link>
              </div>
              <div className="nav-lang">
                <LangMenu />
              </div>
            </div>
          </nav>
          <div className="title-main">
            <div className="title-description">
              <div className="description-name">{ t('landingPage.auth.greetings') }</div>
              <div className="description-text">{ t('landingPage.mainDescription') }</div>
              <div className="button-wrap">
                <button onClick={ onGetStarted } className="title-button">{ t('landingPage.yellowButton') }</button>
              </div>
            </div>
            <div className="title-carousel">
              <CustomSlider>
                { [ 1, 2, 3 ].map((el, index) => {
                  return (
                    <div key={ el } className="slider-item">
                      <div className="slider-item-name">{ t(`landingPage.carousel.${ el }.title`) }</div>
                      <div className="slider-item-text">{ t(`landingPage.carousel.${ el }.description`) }</div>
                      <div>
                        <img className="carousel-image" src={ images[ index ] } alt="ilustraition for text" />
                      </div>
                    </div>
                  );
                })}
              </CustomSlider>
            </div>
          </div>
          <div className="title-exchange">
            { isLoading ? <CircularProgress/> : <ExchangeRate /> }
          </div>
        </main>
      </div>
      <footer className="title-footer">
        <div className="footer-logo">AwesomeBank</div>
        <div className="footer-links">
          <div className="footer-link-wrap">
            <Link to="/about" className="footer-navlink">About us</Link>
          </div>
          <div className="footer-link-wrap">
            <Link to="/faq" className="footer-navlink">FAQ</Link>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-navlink-icon">
            <div>
              <FacebookIcon />
            </div>
            <div>
              <a href="https://www.facebook.com/eliftech.life" className="footer-navlink">
                Eliftech
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

TitleComponent.propTypes = {
  getData: PropTypes.func,
  isLoading: PropTypes.bool,
  isAuth: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isLoading: state.landingPageReducer.isLoading,
  isAuth: state.profileReducer.auth
})

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(startDataAction())
})

export const Title = connect(mapStateToProps, mapDispatchToProps)(TitleComponent)