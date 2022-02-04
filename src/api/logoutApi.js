import { getItemFromLocalStorage, httpService, REFRESH_TOKEN, ACCESS_TOKEN } from '../common';

export const logoutApi = () => httpService.post('/auth/logout', {
  AccessToken: getItemFromLocalStorage(ACCESS_TOKEN) || '',
  RefreshToken: getItemFromLocalStorage(REFRESH_TOKEN)
})