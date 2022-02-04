import { put, takeLatest, call } from 'redux-saga/effects';
import { getLoginSuccess, getLoginError, START_BY_TOKENS } from '../login-slice';
import { ACCESS_TOKEN, REFRESH_TOKEN, setItemToLocalStorage } from '../../../common';
import { loginByTokensApi } from './../../../api'
import { profileReducer } from '../../profile';

export default function* watcherLoginByTokensSaga() {
  yield takeLatest(START_BY_TOKENS, getLoginByTokensUser);
}

function* getLoginByTokensUser(action) {
  try {
    const payload = yield call(loginByTokensApi, action.payload);

    yield put(getLoginSuccess());
    yield put(profileReducer.getProfileSuccess(payload.data.data))

    if (payload.data.data.AccessToken) {
      setItemToLocalStorage(ACCESS_TOKEN, payload.data.data.AccessToken);
    }
    if (payload.data.data.RefreshToken) {
      setItemToLocalStorage(REFRESH_TOKEN, payload.data.data.RefreshToken);
    }
  } catch (error) {

  }
}
