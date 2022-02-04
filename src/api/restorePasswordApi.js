import { httpService } from '../common/services';

export const forgotPassword = (data) => httpService.post('password/forgot', data);
export const resetPassword = (data) => httpService.post('password/reset', data);