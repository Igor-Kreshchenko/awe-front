import { httpService } from '../common/services';

export const getLoanList = (data) => httpService.get(`loans/${ data.cardID }`);
export const getLoanApi = (data) => httpService.post('loans', data);
export const updateLoan = (data) => httpService.patch(`loans/${ data.loanID }`, data);
export const getLoanByID = (data) => httpService.get(`loans/loan/${ data.loanID }`)