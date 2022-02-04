// export all pages here
export { Login, loginReducer, loginSaga, loginByTokensSaga } from './login';
export { LoginGoogle } from './loginGoogle';
export { LoginFacebook } from './loginFacebook';
export { PiggyPage } from './piggy/PiggyPage';
export { watchRegisterUser, registerReducer, Register } from './register';
export { Title } from './title/title';
export { Main } from './main/Main';
export { watchResetPassword, resetPasswordReducer, ResetPassword } from './resetPassword';
export { watchForgotPassword, forgotPasswordReducer, ForgotPassword } from './forgotPassword';
export { cardsReducer, watchCards, Home } from './home';
export { profileReducer, logoutUser, watchGetProfile, watchUpdateProfile, watchLogout } from './profile';
export { landingPageReducer } from './title/title-slice';
export { watcherDataLoad } from './title/title-sagas';
export { piggyReducer } from './piggy/piggyPage-slice';
export { watchPiggy } from './piggy/piggyPage-sagas';
export { notificationsReduser }  from './notifications/notifications-slice';