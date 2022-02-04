import { takeLatest, put, call } from 'redux-saga/effects';
import { getUser, updateUser, logoutApi } from '../../api';
import { deleteTokensFromLocalStorage } from '../../common';
import reducer, { LOGOUT, START, START_UPDATE } from './profile-slice';

function* getProfile() {
  try {
    const fetchedData = yield call(getUser);
    yield put(reducer.getProfileSuccess(fetchedData.data.user));
  } catch (error) {
    yield put(reducer.getProfileError(error));
  }
}

function* updateProfile(action) {
  try {
    const fetchedData = yield call(updateUser, action.payload);
    yield put(reducer.updateProfileSuccess(fetchedData.data.user));
  } catch (error) { 
    yield put(reducer.updateProfileError(error.response.data.message)); 
  }
}

function* logoutProfile() {
  try {
    yield call(logoutApi)
    yield call(deleteTokensFromLocalStorage)

  } catch (error) {
    deleteTokensFromLocalStorage()
  }
}

export function* watchGetProfile() {
  yield takeLatest(START, getProfile);
}

export function* watchUpdateProfile() {
  yield takeLatest(START_UPDATE, updateProfile);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logoutProfile)
}
