import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
import reducer, { START } from './register-slice';
import { registerUser } from '../../api/registerUser';

function* registerUserAsync(action) {
  try {
    const formUser = _.omit(action.payload, [ 'confirmPassword' ]);

    const fetcheData = yield call(registerUser, formUser);
    yield put(reducer.getRegisterSuccess(fetcheData.statusText));
  } catch (error) {

    yield put(reducer.getRegisterError(error.response.data.error));
  }
}

export function* watchRegisterUser() {
  yield takeLatest(START, registerUserAsync);
}
