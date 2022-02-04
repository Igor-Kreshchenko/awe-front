import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { validationSchema } from './utils/validationSchema';
import { red, green, grey } from '@material-ui/core/colors';
import reducer from './profile-slice';
import PropTypes from 'prop-types';
import { getItemFromLocalStorage } from '../../common/helpers/getItemFromLocalStorage';
import { useTranslation } from 'react-i18next';
import './profile.scss';
import { Link } from 'react-router-dom';
import { Layout } from '../../common/components/Layout'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { enUS, uk } from 'date-fns/locale';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? '0' + s : s;
  }
  const d = new Date(inputFormat);
  return [ pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear() ].join('-');
}

const useStyles = makeStyles({
  table: {
    minWidth: 520,
    border: 'none',
    color: '#fff',
    margin: 0,
    padding: 0
  }
});

const Profile = ({ isLoading, isUpdated, user, updateUser, error, openMenu, setOpenMenu }) => {
  const [ isUpdate, setIsUpdate ] = useState(false);
  const { t } = useTranslation();
  const token = getItemFromLocalStorage('ACCESS_TOKEN');
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstName: user ? user.FirstName : '',
      secondName: user ? user.SecondName : '',
      email: user ? user.Email : '',
      birthDate: user ? user.BirthDate : '',
      telNumber: user ? user.TelNumber : ''
    },
    validationSchema: validationSchema(t),
    onSubmit: (values) => updateUser(values)

  });
  useEffect(() => {
    if(isUpdated && !isLoading && !error && user) {
      formik.setValues({
        firstName: user.FirstName,
        secondName: user.SecondName,
        email: user.Email,
        birthDate: user.BirthDate,
        telNumber: user.TelNumber
      })
      setIsUpdate(false);
    }
    if(isUpdated &&  !isLoading && error) {
      setIsUpdate(true);
    }
  },[ isLoading, error, isUpdated ]);

  function createData(name, data) {
    return { name, data };
  }

  const rows = [
    createData(t('profile.firstName'), user.FirstName),
    createData(t('profile.secondName'), user.SecondName),
    createData(t('profile.email'), user.Email),
    createData(t('profile.phone'), user.TelNumber),
    createData(t('profile.date'), convertDate(new Date(user.BirthDate)))
  ];
  return (
    <Layout openMenu={ openMenu } setOpenMenu={ setOpenMenu }>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box
              className="profile__box-border profile__user"
              width="50%"
              display="flex"
              alignItems="center"
              border={ `1px solid${ grey[ 400 ] }` }
              bgcolor="#6e63fd"
            >
          { isUpdate ? (
            <Box className="profile__form" mt={ 2 } ml={ 10 } width="60%">
              <form onSubmit={ formik.handleSubmit }>
                <Box className="profile__form-field">
                  <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label={ t('profile.firstName') }
                        type="text"
                        inputProps={ {
                          style: { color: '#fff' }
                        } }
                        value={ formik.values.firstName }
                        onChange={ formik.handleChange }
                        error={ formik.touched.firstName && Boolean(formik.errors.firstName) }
                        helperText={ formik.touched.firstName && formik.errors.firstName }
                      />
                </Box>
                <Box className="profile__form-field">
                  <TextField
                        fullWidth
                        id="secondName"
                        name="secondName"
                        label={ t('profile.secondName') }
                        type="text"
                        inputProps={ {
                          style: { color: '#fff' }
                        } }
                        value={ formik.values.secondName }
                        onChange={ formik.handleChange }
                        error={ formik.touched.secondName && Boolean(formik.errors.secondName) }
                        helperText={ formik.touched.secondName && formik.errors.secondName }
                      />
                </Box>
                <Box className="profile__form-field">
                  <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={ t('profile.email') }
                        value={ formik.values.email }
                        inputProps={ {
                          style: { color: '#fff' }
                        } }
                        onChange={ formik.handleChange }
                        error={ formik.touched.email && Boolean(formik.errors.email) }
                        helperText={ formik.touched.email && formik.errors.email }
                      />
                </Box>

                <Box
                      display="flex"
                      justifyContent="space-between"
                      className="profile__form-field profile__date-phone"
                    >
                  <Box className="profile__date-field">
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
                            onChange={ val => { formik.setFieldValue('birthDate', val) } }
                            KeyboardButtonProps={ { 'aria-label': 'change date' } }
                            error={ formik.touched.birthDate && Boolean(formik.errors.birthDate) }
                            helperText={ formik.touched.birthDate && formik.errors.birthDate }
                          />
                    </MuiPickersUtilsProvider>
                  </Box>
                  <Box>
                    <TextField
                          id="telNumber"
                          name="telNumber"
                          label={ t('profile.phone') }
                          type="string"
                          inputProps={ {
                            style: { color: '#fff' }
                          } }
                          value={ formik.values.telNumber }
                          onChange={ formik.handleChange }
                          error={ formik.touched.telNumber && Boolean(formik.errors.telNumber) }
                          helperText={ formik.touched.telNumber && formik.errors.telNumber }
                        />
                  </Box>
                </Box>
                <Box mt={ 6 } mb={ 4 } color="#fff" className="profile__form-snd-btn">
                  <Button className="profile__send-btn" type="submit" style={ { backgroundColor: green[ 500 ] } }>
                    { isLoading ? t('profile.loading') : t('profile.send') }
                  </Button>
                  <Button
                        type="submit"
                        className="profile__cancel-btn"
                        onClick={ () => {
                          formik.resetForm();
                          setIsUpdate(false)
                        } }
                        style={ { backgroundColor: red[ 500 ] } }
                      >
                    { t('profile.cancel') }
                  </Button>
                </Box>
              </form>
              <Box mb={ 4 } style={ { textAlign: 'center', color: red[ 500 ] } }> { error }</Box>
            </Box>
              ) : (
                user && (
                  <Box ml={ 10 } mt={ 4 } className="profile__form">
                    <Table className={ classes.table } className="profile__table" aria-label="caption table">
                      <TableBody style={ { border: 'none' } }>
                        { rows.map((row) => (
                          <TableRow key={ row.name } >
                            <TableCell className="profile__table-cell" component="th" scope="row" style={ { borderBottom: 'none', color: '#fff', } }>
                              { row.name }
                            </TableCell>
                            <TableCell align="left" className="profile__table-cell" style={ { borderBottom: 'none', color: '#fff', } }>
                              { row.data }
                            </TableCell>
                          </TableRow>
                        )) }
                      </TableBody>
                    </Table>
                    <Box mt={ 4 } mb={ 8 } pl={ 2 }>
                      <Box mr={ 8 } mb={ 3 }>
                        <Button variant="contained" color="primary" onClick={ () => setIsUpdate(true) }>
                          { isLoading ? t('profile.loading') : t('profile.update') }
                        </Button>
                      </Box>
                      <Box>
                        <Button variant="contained" className="profile__change-psw-btn" color="primary">
                          <Link className="change-password-link" to={ `/change-password/${ token }` }>
                            { t('profile.changePassword') }
                          </Link>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                )
              ) }
        </Box>
      </Box>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    isUpdated: state.profileReducer.isUpdated,
    isLoading: state.profileReducer.loading,
    error: state.profileReducer.error,
    user: state.profileReducer.user
  };
}

function mapDispatchToState(dispatch) {
  return {
    updateUser: (user) => dispatch(reducer.updateProfileStart(user))
  };
}

Profile.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  isUpdated: PropTypes.bool,
  updateUser: PropTypes.func,
  user: PropTypes.object,
  openMenu: PropTypes.bool,
  setOpenMenu: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToState)(Profile);
