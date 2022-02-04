import { httpService } from '../common';

export const getPiggyByCardID = (cardID) => httpService.get(`piggy/${ cardID }`)
export const changePiggyPercent = (data) => httpService.put(`piggy/${ data.piggyID }`, { percent: Number(data.percent) })
export const createPiggyWithData = (data) => httpService.post('/piggy', data)

export const sendMoneyToPiggy = (data) => httpService.post(`cards/bank-transactions/${ data.cardID }`, { amount: data.amount })
export const sendMoneyToCard = (data) => httpService.post(`cards/bank-transactions/piggy/${ data.piggyID }`, { amount: data.amount })