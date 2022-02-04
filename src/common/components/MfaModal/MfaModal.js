import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLoginStart } from '../../../pages/login/login-slice';
import './MfaModal.scss';

  const MfaModal = ({ isNotification, notification, isAuth, loginStart, token, handleMfaBtn }) => {
  const { t } = useTranslation();
  const [ inputValue, setInputValue ] = useState('');

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const otp = inputValue;

      loginStart({ otp, token });
    } catch (err) {
      console.log(err);
    }
  }

  function handleInput(e) {
     setInputValue(e.target.value);
  }

  if (isAuth) {
    return <Redirect to={ '/home' } />
  }

    return <div className="mfa_backdrop">
      <div className="mfa_modal">
        <form action="submit" className="mfa_form" onSubmit={ handleSubmit }>
          <h2 className="mfa_title">{ t('mfa.title') }</h2>
          <div className="btn_box">
            <button name="email" type="button" className="mfa_button" onClick={ handleMfaBtn }>{ t('mfa.btnEmail') }</button>
            <button name="phone" type="button" className="mfa_button" onClick={ handleMfaBtn }>{ t('mfa.btnPhone') }</button>
          </div>
          { isNotification && <p className="mfa_notification">{ t('mfa.notification') + notification }</p> }
          <input onChange={ handleInput } type="text" className="mfa_input" placeholder={ t('mfa.placeholder') }/>
        </form>
      </div>
    </div>
}

const mapStateToProps = (state) => ({
  isAuth: !!state.profileReducer.auth,
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (formData) => dispatch(getLoginStart(formData )),
});

export default connect(mapStateToProps, mapDispatchToProps)(MfaModal);

MfaModal.propTypes = {
  isNotification: PropTypes.bool,
  notification: PropTypes.string,
  token: PropTypes.string,
  handleMfaBtn: PropTypes.func,
  isAuth: PropTypes.bool,
  loginStart: PropTypes.func
};