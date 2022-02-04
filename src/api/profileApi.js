import { httpService } from '../common';

export const getUser = () => httpService.get('profile');
export const updateUser = (data) =>  httpService.put('profile', data);