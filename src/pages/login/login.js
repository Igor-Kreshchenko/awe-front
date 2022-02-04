import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './component/LoginForm/LoginForm';
import { LogoImg } from './../../common';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { httpService } from '../../common/services';
import './login.scss';

import SocialButton from '../../common/components/SocialButton/SocialButton';
import { checkLoginApi } from '../../api';
import { MfaModal } from '../../common/components/MfaModal';
import { verifyApi } from '../../api/loginApi';

const Login = ({ isLoad, isAuth, error }) => {
  const { t } = useTranslation();
  const [ isMfa, setIsMfa ] = useState(false);
  const [ loginFormData, setLoginFormData ] = useState({});
  const [ isNotification, setIsNotification ] = useState(false);
  const [ notification, setNotification ] = useState('');
  const [ token, setToken ] = useState('');

  const handleMfaBtn = (e) => {
    const verifyMethod = e.target.name;

    setIsNotification(true);
    setNotification(e.target.innerText);

    verifyApi({
      email: loginFormData.email,
      verify: verifyMethod,
    }).
    then(res => setToken(res.data.token)).
    catch(err => console.log(err));
  };

  const submit = async (formData) => {
    try {
      setLoginFormData(formData);
      const res = await checkLoginApi(formData);

      if (res.status === 200) {
        setIsMfa(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isAuth) {
    return <Redirect to={ '/home' } />
  }

  const handleGoogleLogin = async () => {
    const { data: { url } } = await httpService.get('/auth/google');
    window.location.replace(url);
  };

  const handleFacebookLogin = async () => {
    const { data: { url } } = await httpService.get('/auth/facebook');
    window.location.replace(url);
  };

  return (
    <div>
      <div className="login">
        <Link to="/">
          <img className="login__logo" alt="logo" src={ LogoImg }></img>
        </Link>
        <h1 className="login__title">{ t('login.login') } </h1>
        <LoginForm onSubmit={ submit } isLoad={ isLoad } />
        <div className="login__forgotpassword">
          <Link className="login__forgotpassword__link" to="/forgot-password">
            { t('login.forgotYourPassword') }
          </Link>
        </div>
        {!!error?.error && <div className="login__error">{ error.error } </div>}
        <div>
          <hr className='line' />
          <span className='or'>
            { t('login.or') }
          </span>
          <hr className='line' />
        </div>
        <div className="login__social">
          <SocialButton
          label={ t('loginOauthGoogle.loginWithGoogle') }
          icon='/img/social/google-logo.png'
          onClick={ handleGoogleLogin }
        />

          <SocialButton
          label={ t('loginOauthFacebook.loginWithFacebook') }
          icon='/img/social/facebook-logo.png'
          onClick={ handleFacebookLogin }
        />
        </div>
        <div className="login__register">
          { t('login.ifForgot') }
          <Link className="login__register__link" to="/register">{ t('login.register') } </Link>
        </div>
      </div>
      { isMfa && <MfaModal isNotification={ isNotification } notification={ notification } token={ token } handleMfaBtn={ handleMfaBtn }/> }
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: !!state.profileReducer.auth,
  error: state.login.error,
  isLoad: state.login.isLoad
});

export default connect(mapStateToProps, null)(Login);

Login.propTypes = {
  isLoad: PropTypes.bool,
  isAuth: PropTypes.bool,
  error: PropTypes.object,
};
