import {POST_USER, USER_SUCCESS, USER_ERROR} from '../actions/actions';

//setting up initial state 
const initialState = {
    isPosting:false,
    userID:0

}
const signupReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_USER :
            return {
                ...state,
                isPosting: true
            }
        case USER_SUCCESS :
            console.log(action.payload)
            return {
                    ...state,
                    userID: action.payload.id,
                    isPosting: false
                }
        case USER_ERROR :
            return {
                ...state,
                isPosting: false,
                error: action.payload
            }
            default :
            return state
    }
}
export default signupReducer;