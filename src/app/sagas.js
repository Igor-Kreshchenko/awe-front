import { all, fork } from 'redux-saga/effects';
import { watchNotifications } from '../pages/notifications/notifications-sagas';
import {
  loginByTokensSaga,
  loginSaga,
  watchRegisterUser,
  watchForgotPassword,
  watchResetPassword,
  watchCards,
  watchGetProfile,
  watchUpdateProfile,
  watchLogout,
  watcherDataLoad,
  watchPiggy
} from './../pages';

export function* rootSagas() {
  yield all(
    [
      watchRegisterUser,
      loginSaga,
      watchForgotPassword,
      watchResetPassword,
      loginByTokensSaga,
      watchCards,
      watchGetProfile,
      watchUpdateProfile,
      watchLogout,
      watcherDataLoad,
      watchPiggy,
      watchNotifications
    ].map(fork)
  );
}
