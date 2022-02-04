import { httpService } from '../common/services';

export const checkLoginApi = (data) => httpService.post('/auth/checkLogin', data);
export const verifyApi = (data) => httpService.post('/auth/verify', data);
export const loginApi = (data) => httpService.post('/auth/login', data);
