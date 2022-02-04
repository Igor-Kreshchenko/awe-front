import { httpService } from '../common/services';

export const loginGoogleApi = (data) => httpService.post('/auth/google', data);
