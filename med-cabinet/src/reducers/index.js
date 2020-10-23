import { combineReducers } from 'redux'
import signupReducer from './signupReducer'
import saveItemReducer from './saveItemReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    signupReducer,
    loginReducer
})