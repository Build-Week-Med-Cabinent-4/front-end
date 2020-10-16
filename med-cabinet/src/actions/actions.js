import axios from 'axios'

//sign up

export const POST_USER = "POST_USER"
export const USER_SUCCESS = "USER_SUCCESS"
export const USER_ERROR = "USER_ERROR"

//login

export const LOGGING_IN = "LOGGING_IN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

//logout

export const LOGOUT = "LOGOUT"


//function to create user

export const createUser = (creds) => dispatch => {

    dispatch({ type: POST_USER });

    axios.post('', creds)
    .then(res => {
        console.log(res.data)
       
        dispatch({ type: USER_SUCCESS, payload: res.data })
    })
    .catch(err => {
        console.log('Error', err.message)
        dispatch({ type: USER_ERROR, payload: err.message })
    })
}

//function to login 

export const logIn = (creds) => dispatch => {

    dispatch({ type: LOGGING_IN })

    axios.post("", creds)
    .then(res => {
        window.localStorage.setItem('token', res.data.token)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    })
    .catch(err => {
        console.log(err.message)
        dispatch({ type: LOGIN_ERROR, payload: err.message })
    })
}

//logout function

export const logOut = () => {
    window.localStorage.clear();
    return {
        type: LOGOUT
    }
}