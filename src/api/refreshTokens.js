import { getItemFromLocalStorage, httpService, REFRESH_TOKEN } from '../common';

export const refreshTokenApi = () => httpService.post('/auth/refresh', {
  RefreshToken: getItemFromLocalStorage(REFRESH_TOKEN)
})