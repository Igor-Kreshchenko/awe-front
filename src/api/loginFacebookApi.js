import { httpService } from '../common/services';

export const loginFacebookApi = (data) => httpService.post('/auth/facebook', data);
