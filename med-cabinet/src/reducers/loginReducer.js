import {LOGGING_IN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT} from '../actions/actions';

const initialState = {
    logginIn: false,
    token: '',
    userInfo: 0,
    userId:0,
    logError:  '',
    message:"",
    res:{}
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGGING_IN :
            return {
                ...state,
                loggingIn: true
            }
        case LOGIN_SUCCESS :
            return {
                ...state,
                loggingIn: false,
                userInfo: action.payload.userInfo,
                message: action.payload.message,
                token: action.payload.token,
                res:action.payload
            }
        case LOGIN_ERROR :
            return {
                ...state,
                loggingIn: false,
                logError: action.payload
            }
        case LOGOUT :
            return {
                isPosting: false,
                isLoggingIn: false,
                token: '',
                logError: '',
                userId: 0,
            }
            default :
            return state
    }
}
export default loginReducer;