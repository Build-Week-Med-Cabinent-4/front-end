  
import axios from 'axios'

export const axiosWithAuth = (props) => {
    const token = window.localStorage.getItem('token')
    return axios.create({
        baseURL: 'https://med-cabinet-6.herokuapp.com/api',
        headers: {
            Authorization: token
        }
    })
}