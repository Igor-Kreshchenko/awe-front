import { httpService } from '../common/services';

export const loginByTokensApi = (data) => httpService.post('/auth/loginByToken', data)