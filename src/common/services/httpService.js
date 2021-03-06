import axios from 'axios';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../helpers';
import { refreshTokenApi } from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpService.interceptors.response.use(res => res, err => {
  const condition = !err.config.url.includes('auth') &&
    err.response.status === 401 &&
    err.config &&
    !err.config.__isRetryRequest

  if (condition) {
    return refreshTokenApi().then((res) => {
      setItemToLocalStorage(ACCESS_TOKEN, res.data.data.AccessToken);
      setItemToLocalStorage(REFRESH_TOKEN, res.data.data.RefreshToken);
      return res
    }).then((res) => {
      err.config.headers.Authorization = `Bearer ${ res.data.data.AccessToken }`
      err.config.__isRetryRequest = true;
      return httpService(err.config)
    })
  }
  else {
    return Promise.reject(err);
  }
})

httpService.interceptors.request.use(req => {
  if (!req.url.includes('auth')) {
    req.headers.Authorization = `Bearer ${ getItemFromLocalStorage(ACCESS_TOKEN) }`
  }
  return req
})
