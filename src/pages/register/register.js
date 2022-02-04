import React, { useEffect } from 'react';
import { TextField, Box, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, NavLink, useLocation } from 'react-router-dom';
import { validationSchema } from './utils/validationSchema';
import reducer from './register-slice';
import { useTranslation } from 'react-i18next';
import './register.scss';
import { getItemFromLocalStorage, LogoImg } from './../../common/';
import './register.scss';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { enUS, uk } from 'date-fns/locale';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const Register = ({ register, isLoading, error, isSuccess }) => {
  const history = useHistory();
  const location = useLocation();
  const { t  } = useTranslation();
  const fullName = location.state?.fullName.split(' ');

  useEffect(() => {

    if (isSuccess) {
      history.push('/login');
    }
  }, [ history, isSuccess ]);

  const formik = useFormik({
    initialValues: {
      firstName: fullName?.[ 0 ] || '',
      secondName: fullName?.[ 1 ] || '',
      email: location.state?.email || '' ,
      password: '',
      confirmPassword: '',
      birthDate: null,
      telNumber: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <Box className="regist">
      <NavLink to="/">
        <img className="regist__logo" alt="logo" src={ LogoImg }></img>
      </NavLink>
      <h1 className="regist__title"> { t('register.register') }</h1>
      <form onSubmit={ formik.handleSubmit }>
        <Box className="double__field">
          <Box className="double__field_box">
            <TextField
              className="auth_input"
              fullWidth
              id="firstName"
              name="firstName"
              label={ t('register.firstName') }
              type="text"
              value={ formik.values.firstName }
              onChange={ formik.handleChange }
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={
                formik.touched.firstName && formik.errors.firstName
              }
            />
          </Box>
          <Box className="double__field_box">
            <TextField
              className="auth_input"
              fullWidth
              id="secondName"
              name="secondName"
              label={ t('register.secondName') }
              type="text"
              value={ formik.values.secondName }
              onChange={ formik.handleChange }
              error={
                formik.touched.secondName &&
                Boolean(formik.errors.secondName)
              }
              helperText={
                formik.touched.secondName && formik.errors.secondName
              }
            />
          </Box>
        </Box>
        <Box className="double__field_box">
          <TextField
            className="auth_input"
            fullWidth
            id="email"
            name="email"
            label={ t('register.email') }
            value={ formik.values.email }
            onChange={ formik.handleChange }
            error={ formik.touched.email && Boolean(formik.errors.email) }
            helperText={ formik.touched.email && formik.errors.email }
          />
        </Box>
        <Box className="double__field">
          <Box className="double__field_box">
            <TextField
              className="auth_input"
              fullWidth
              id="password"
              name="password"
              label={ t('register.password') }
              type="password"
              value={ formik.values.password }
              onChange={ formik.handleChange }
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              helperText={ formik.touched.password && formik.errors.password }
            />
          </Box>
          <Box className="double__field_box">
            <TextField
              className="auth_input"
              fullWidth
              id="confirm_password"
              name="confirmPassword"
              label={ t('register.confirmPassword') }
              type="password"
              value={ formik.values.confirmPassword }
              onChange={ formik.handleChange }
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
              }
            />
          </Box>
        </Box>

        <Box className="double__birth_phone">
          <Box className="double__field_box">
            <MuiPickersUtilsProvider utils={ DateFnsUtils } locale={ getItemFromLocalStorage('i18nextLng') == 'ua' ? uk : enUS } >
              <KeyboardDatePicker
                className="auth_input"
                id="birthDate"
                label={ t('profile.date') }
                variant="inline"
                format="dd/MM/yyyy"
                placeholder="dd/mm/yyyy"
                autoOk={ true }
                value={ formik.values.birthDate }
                onChange={ val => {
                  formik.setFieldValue('birthDate', val);
                } }
                KeyboardButtonProps={ {
                  'aria-label': 'change date',
                } }
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                helperText={
                  formik.touched.birthDate && formik.errors.birthDate
                }
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box className="double__field_box">
            <TextField
              className="auth_input"
              fullWidth
              id="telNumber"
              name="telNumber"
              label={ t('register.phone') }
              type="string"
              value={ formik.values.telNumber }
              onChange={ formik.handleChange }
              error={
                formik.touched.telNumber && Boolean(formik.errors.telNumber)
              }
              helperText={
                formik.touched.telNumber && formik.errors.telNumber
              }
            />
          </Box>
        </Box>
        <Button
          fullWidth
          color={ isLoading ? 'default' : 'primary' }
          variant="contained"
          type="submit"
          disabled={ isLoading }
          style={ { background: '#582dda', marginTop: '10px', } }>
          { isLoading ? t('register.loading') : t('register.register') }
        </Button>
      </form>

      <Box className="regist__error">
        { error }
      </Box>
      <Box className="regist__login">
        { t('register.haveAccount') }
        <NavLink className="regist__login__link" to="/login">{ t('register.login') } </NavLink>
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    isLoading: state.register.loading,
    isSuccess: state.register.isSuccess,
    error: state.register.error,
  };
}

function mapDispatchToState(dispatch) {
  return {
    register: (user) => dispatch(reducer.getRegisterStart(user)),
  };
}

Register.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  isSuccess: PropTypes.string,
  register: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToState)(Register);
