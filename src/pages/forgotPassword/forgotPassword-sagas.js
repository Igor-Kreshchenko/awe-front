import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
import reducer, { START } from './forgotPassword-slice';
import { forgotPassword  } from '../../api';

function* forgotPasswordAsync(action) {
  try {
    const email = {
      'email': action.payload
    };
    const fetcheData = yield call(forgotPassword, email);
    yield put(reducer.getForgotPasswordSuccess(fetcheData.data.message));
  } catch (error) {
    yield put(reducer.getForgotPasswordError(error.response.data.message));
  }
}

export function* watchForgotPassword() {
  yield takeLatest(START, forgotPasswordAsync);
}
