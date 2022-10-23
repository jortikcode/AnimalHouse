import { 
        LOGIN_SUCCESS, 
        LOGIN_ERROR
        } from "../actions/constants"

const initialState = {
    loggedIn: false
}
export const account = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return ({
                    ...state,
                    loggedIn: true
                });
        case LOGIN_ERROR:
            return ({
                    ...state,
                    loggedIn: false
                });
        default:
            return state;
    }
}