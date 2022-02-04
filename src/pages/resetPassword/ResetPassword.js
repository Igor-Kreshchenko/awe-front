import React from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useParams, NavLink } from 'react-router-dom';
import { LogoImg } from './../../common';
import PropTypes from 'prop-types';
import { validationSchema } from './utils/validationShema';
import reducer from './resetPassword-slice';
import './resetPassword.scss';

const ResetPassword = ({ isLoading, isSuccess, error, resetPassword }) => {
  const { token } = useParams();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema(t),
    onSubmit: (values) => {
      resetPassword({
        password: values.password,
        token: token
      });
    }
  });

  return (
    <Box className="reset-password" >
      <NavLink to="/">
        <img className="login__logo" alt="logo" src={ LogoImg }></img>
      </NavLink>
      <h1 className="reset-password__title"> { isSuccess ? t('resetPassword.successfullReset') : t('resetPassword.resetYourPassword') } </h1>
      <form onSubmit={ formik.handleSubmit }>
        { isSuccess ? (
          <Box className="success-msg"> { t('resetPassword.youCanUse') } </Box>
        ) : (
          <Box >
            <TextField
              className="auth_input"
              fullWidth
              id="password"
              name="password"
              label={ t('resetPassword.password') }
              type="password"
              value={ formik.values.password }
              onChange={ formik.handleChange }
              error={ formik.touched.password && Boolean(formik.errors.password) }
              helperText={ formik.touched.password && formik.errors.password }
            />
            <TextField
              className="auth_input"
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label={ t('resetPassword.confirmPassword') }
              type="password"
              value={ formik.values.confirmPassword }
              onChange={ formik.handleChange }
              error={ formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) }
              helperText={ formik.touched.confirmPassword && formik.errors.confirmPassword }
            />
          </Box>
        ) }

        { isSuccess ? (
          <Button
            fullWidth
            color={ isLoading ? 'default' : 'primary' }
            variant={ 'contained' }
            disabled={ isLoading }
            type="submit"
          >
            <Link className="link-login" style={ { textDecoration: 'none', color: '#fff' } } to="/login">
              {  t('resetPassword.login')  }
            </Link>
          </Button>
        ) : (
          <Button
            fullWidth
            color={ isLoading ? 'default' : 'primary' }
            variant={ 'contained' }
            disabled={ isLoading }
            type="submit"
            style={ { background: '#582dda', marginTop: '10px', } }
          >
            { isLoading ? t('resetPassword.loading') : t('resetPassword.send') }
          </Button>
        ) }
      </form>
      <div className="reset-password__error">{ error } </div>

    </Box >
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.resetPassword.loading,
    isSuccess: state.resetPassword.isSuccess,
    error: state.resetPassword.error
  };
}

function mapDispatchToState(dispatch) {
  return {
    resetPassword: (password) => dispatch(reducer.getResetPasswordStart(password))
  };
}

ResetPassword.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  isSuccess: PropTypes.string,
  resetPassword: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToState)(ResetPassword);
