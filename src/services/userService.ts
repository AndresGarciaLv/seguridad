import {genericRequest} from '@/utils/genericRequest'

const base_url = import.meta.env.VITE_URL_API ?? 'http://localhost:3000'


export const loginService = async (email: string, password: string) => {
    const response = await genericRequest(base_url + '/users/login', 'POST',{email, password})
   
}