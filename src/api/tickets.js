import axios from 'axios';
import { httpService } from '../common/services';

export const createTicket = (data) => httpService.post('/tickets', data);
export const getTickets = () => httpService.get('/tickets');
export const deleteTicket = (id) => httpService.delete(`/tickets/${ id }`);