import { httpService } from '../common';

export const registerUser = (data) => httpService.post('auth/register', data);
