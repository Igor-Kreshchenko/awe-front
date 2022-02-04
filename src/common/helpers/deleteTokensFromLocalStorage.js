import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import { deleteItemFromLocalStorage } from './deleteItemFromLocalStorage'

export const deleteTokensFromLocalStorage = () => {
  deleteItemFromLocalStorage(ACCESS_TOKEN)
  deleteItemFromLocalStorage(REFRESH_TOKEN)
}