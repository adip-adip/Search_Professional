import axios from "axios"

export const login = (data : {email: string, password : string }) => {
    return axios.post('https://localhost3001/api/auth/login', data)
}