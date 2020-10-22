import {SAVE_INITIALIZE, SAVE_RECOMMEND_SUCCESS, SAVE_RECOMMEND_FAILURE} from '../actions/actions';

const initialState = {
    saved:[],
    saving:false,

}
export const saveItemReducer = (state = initialState, action) => {

    switch(action.type){
        case SAVE_INITIALIZE : 
        return {
            ...state,
            saving: true
        }
        case SAVE_RECOMMEND_SUCCESS :
        return {
            ...state,
            saving: false,
            saved.push[action.payload]
        }
        case SAVE_RECOMMEND_FAILURE :
        return {
            ...state
        }   