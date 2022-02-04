import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getLoginStart } from '../login/login-slice';
import { LOGIN_GOOGLE, RECORD_NOT_FOUND } from '../../common/constants/constants';
import './loginGoogle.scss';

const LoginGoogle = ({ loginStart, isAuth, isLoad, error  }) => {
  const { push } = useHistory();
  const { t } = useTranslation();
  const search = new URL(window.location.href).searchParams;
  const code = search.get('code');
  const state = search.get('state');
  const errorMessage = error?.error;

  if (isAuth) {
    push('/home');
  }

  if (errorMessage === RECORD_NOT_FOUND) {
    push({
      pathname: '/register',
      state: { 
        email: error.data.email,
        fullName: error.data.name 
      }
    })
  }

  useEffect(() => {
    const handleGoogle = async () => {
      await loginStart(code, state);
    };

    if (code) {
      handleGoogle();
    } else {
      push('/login');
    }
  }, []);

  return (
    <>
      {!!isLoad && <div className="oauth-message">{t('loginOauthGoogle.loadingMessage')}</div>}
      {!!error && ( 
        <div>
          <p>{t('loginOauth.error') + errorMessage }</p>
          <Link to="/login">{t('loginOauth.goBack')}</Link>
        </div> 
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuth: !!state.profileReducer.auth,
  error: state.login.error,
  isLoad: state.login.isLoad
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (code, state) => dispatch(getLoginStart({ loginType: LOGIN_GOOGLE, code, state }))
});

LoginGoogle.propTypes = {
  loginStart: PropTypes.func,
  isAuth: PropTypes.bool,
  isLoad: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.string,
  code: PropTypes.string,
  state: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginGoogle);
