import { takeLatest, put, call } from 'redux-saga/effects';
import reducer, { START } from './resetPassword-slice';
import _ from 'lodash';
import { resetPassword  } from '../../api';

function* resetPasswordAsync(action) {
  try {
    const formUser = _.omit(action.payload, [ 'confirmPassword' ]);
    const fetcheData = yield call(resetPassword,formUser);   
    yield put(reducer.getResetPasswordSuccess (fetcheData.statusText));
  
  } catch (error) {
    yield put(reducer.getResetPasswordError(error.response.data.message));
  }
}

export function* watchResetPassword() {
  yield takeLatest(START, resetPasswordAsync);
}
