import { genericRequest } from '../utils/genericRequest'

const base_url = import.meta.env.VITE_URL_API ?? 'http://localhost:3000'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

export const sqlService = async (newItem: string) => {
  return await genericRequest(base_url + '/items', 'POST', newItem)
}