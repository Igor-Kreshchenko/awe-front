import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const validationSchema = (t) => yup.object({
  email: yup.string().email(t('validation.EnterValidEmail')).required(t('validation.FieldIsRequired')),
  password: yup.string().required(t('validation.FieldIsRequired'))
});

const LoginForm = (props) => {
  const { onSubmit, isLoad } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema(t),
    onSubmit: onSubmit
  });

  return (
    <form onSubmit={ formik.handleSubmit }>
      <TextField
        className="auth_input"
        fullWidth
        id="email"
        name="email"
        label={ t('login.email') }
        value={ formik.values.email }
        onChange={ formik.handleChange }
        error={ formik.touched.email && Boolean(formik.errors.email) }
        helperText={ formik.touched.email && formik.errors.email }
      />
      <TextField
        className="auth_input"
        fullWidth
        id="password"
        name="password"
        label={ t('login.password') }
        type="password"
        value={ formik.values.password }
        onChange={ formik.handleChange }
        error={ formik.touched.password && Boolean(formik.errors.password) }
        helperText={ formik.touched.password && formik.errors.password }
      />
      <Button
        color={ isLoad ? 'default' : 'primary' }
        variant="contained"
        fullWidth
        type="submit"
        disabled={ isLoad }
        style={ { background: '#582dda', marginTop: '10px', } }>
        { isLoad ? t('login.loading') : t('login.loginButton') }
      </Button>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  isLoad: PropTypes.bool
};