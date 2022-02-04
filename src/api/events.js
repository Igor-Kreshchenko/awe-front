import { httpService } from '../common/services';

export const getEvents = () => httpService.get('/events');