import { httpService } from '../common/services';

export const getBanks = (data) => httpService.get(`/banks?city=${ data }`);