import { httpService } from '../common/services';
import axios from 'axios'

export const getUserTransactionData = () => httpService.get('data/landing-page')
export const getRateData = () => axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')