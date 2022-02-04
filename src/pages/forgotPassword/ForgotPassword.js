import React, { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { green,red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { validationSchema } from './utils/validationSchema';
import reducer from './forgotPassword-slice';
import { NavLink } from 'react-router-dom';
import { LogoImg } from './../../common';
import { useTranslation } from 'react-i18next';
import './forgotPassword.scss';

const ForgotPassword = ({ isLoading, isSuccess, error, forgotPassword }) => {
  const [ serverSuccessMessage, setServerSuccessMessage ] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      setServerSuccessMessage(isSuccess)
    }
  }, [ isSuccess ]);

  const formik = useFormik({
    initialValues: {
      email: '',

    },
    validationSchema: validationSchema(t),
    onSubmit: ({ email }) => {
      forgotPassword(email);
    },
  });

  return (
    <Box>
      <Box className="forgot-password" >
        <NavLink to="/">
          <img className="forgot-password__logo" alt="logo" src={ LogoImg }></img>
        </NavLink>
        <h1 className="forgot-password__title">{ t('forgotPassword.forgotPassword') }</h1>
        <form onSubmit={ formik.handleSubmit }>

          <Box className="" mb={ 0.4 } height="68px">
            <TextField
              fullWidth
              id="email"
              name="email"
              label={ t('forgotPassword.email') }
              value={ formik.values.email }
              onChange={ formik.handleChange }
              error={ formik.touched.email && Boolean(formik.errors.email) }
              helperText={ formik.touched.email && formik.errors.email }
            />
          </Box>
          <Button
            fullWidth
            color={ isLoading ? 'default' : 'primary' }
            variant="contained"
            disabled={ isLoading }
            type="submit"
            style={ { background: '#582dda', marginTop: '10px', } }>
            { isLoading ? t('forgotPassword.loading') : t('forgotPassword.send') }
          </Button>

        </form>
        <div className="forgot-password__error">{ error } </div>

        { serverSuccessMessage ? (
          <Box
            className="forgot-password__success-msg"
            mb={ 1 }
            style={ { backgroundColor: green[ 400 ] } }
            height="80px"
            textAlign="center"
          >
            <Box
              className="forgot-password__success-msg_close"
              style={ { backgroundColor: green[ 400 ] } }
              onClick={ () => { setServerSuccessMessage(false) } }
              pt={ 0.8 }              
            >
              <CloseIcon fontSize="small"  style={ { backgroundColor: red[ 700 ], color:'#fff', cursor: 'pointer', marginLeft: '285px', marginBottom:'5px' } } />
            </Box>
            <Box >
              { serverSuccessMessage }
            </Box>
          </Box>
        ) : (
          <Box className="forgot-password__login"  >
            { t('forgotPassword.didRemember') }
            <NavLink className="forgot-password__login__link" to="/login">{ t('forgotPassword.tryLoggin') }</NavLink>
          </Box>
        ) }
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.forgotPassword.loading,
    isSuccess: state.forgotPassword.isSuccess,
    error: state.forgotPassword.error,
  };
}

function mapDispatchToState(dispatch) {
  return {
    forgotPassword: (email) => dispatch(reducer.getForgotPasswordStart(email)),
  };
}

ForgotPassword.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  isSuccess: PropTypes.string,
  forgotPassword: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToState)(ForgotPassword);
