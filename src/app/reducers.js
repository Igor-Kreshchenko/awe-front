import { loginReducer, profileReducer, piggyReducer, registerReducer, forgotPasswordReducer, resetPasswordReducer, cardsReducer, landingPageReducer, notificationsReduser } from '../pages'

export const reducers = {
  profileReducer, 
  register: registerReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  piggyReducer,
  cardsReducer,
  landingPageReducer,
  notificationsReduser
};
