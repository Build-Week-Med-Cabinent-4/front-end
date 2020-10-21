  
import axios from 'axios'

export const axiosWithAuth = (props) => {
    const token = window.localStorage.getItem('token')
    return axios.create({
        baseURL: 'https://lambda-med4-api.herokuapp.com',
        headers: {
            Authorization: token
        }
    })
}