import { httpService } from '../common/services';

export const getCardsByUserID = () => httpService.get('/cards');
export const createCards = (data) => httpService.post('/cards', data);
export const createTransactions = (data) => httpService.post('cards/bank-transactions', data);
export const loadChartsData = (data) => httpService.get(`cards/bank-transactions/data/${ data.cardID }`)
export const getTransactionsByCardID = (data) => httpService.get(`cards/bank-transactions/card/${ data }`)
