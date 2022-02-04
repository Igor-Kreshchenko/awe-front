import { put, takeLatest, call } from 'redux-saga/effects';
import { START, getLoginSuccess, getLoginError } from '../login-slice';
import { ACCESS_TOKEN, REFRESH_TOKEN, setItemToLocalStorage } from '../../../common';
import { loginApi, loginGoogleApi, loginFacebookApi } from './../../../api';
import { profileReducer } from '../../profile';
import { LOGIN_GOOGLE, LOGIN_FACEBOOK } from '../../../common/constants/constants';

export default function* watcherLoginSaga() {
  yield takeLatest(START, getLoginUser);
}

function* getLoginUser(action) {
  try {
    let payload;
    switch (action.payload.loginType) {
      case LOGIN_GOOGLE: {
        const { code, state } = action.payload;
        payload = yield call(loginGoogleApi, { code, state });
        break;
      }
      case LOGIN_FACEBOOK: {
        const { code, state } = action.payload;
        payload = yield call(loginFacebookApi, { code, state });
        break;
      }
      default: {
        const { otp, token } = action.payload;
        payload = yield call(loginApi, { otp, token });
        break;
      }
    }

    yield put(getLoginSuccess());
    yield put(profileReducer.getProfileSuccess(payload.data.data));

    setItemToLocalStorage(ACCESS_TOKEN, payload.data.data.AccessToken);
    setItemToLocalStorage(REFRESH_TOKEN, payload.data.data.RefreshToken);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      yield put(getLoginError(error.response.data));
    } else {
      yield put(getLoginError(error.message));
    }
  }
}
