import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getLoginStartByTokens } from '../../pages/login/login-slice';
import { getItemFromLocalStorage } from '../helpers/getItemFromLocalStorage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export const requireAuth = (Component) => {

  const AppAuthWpapper = ({ isAuth, loginStart }) => {

    useEffect(() => {
      if (!isAuth) {
        const tokensData = {
          AccessToken: getItemFromLocalStorage(ACCESS_TOKEN),
          RefreshToken: getItemFromLocalStorage(REFRESH_TOKEN)
        }

        if (tokensData.AccessToken && tokensData.RefreshToken) {
          loginStart(tokensData)
        }
      }
    }, [])

    return <Component />
  }

  const mapStateToProps = (state) => ({
    isAuth: !!state.profileReducer.auth,
  });

  const mapDispatchToProps = (dispatch) => ({
    loginStart: (formData) => dispatch(getLoginStartByTokens(formData))
  });

  AppAuthWpapper.propTypes = {
    isAuth: PropTypes.bool,
    loginStart: PropTypes.func
  };

  return connect(mapStateToProps, mapDispatchToProps)(AppAuthWpapper)
}
