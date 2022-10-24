import { THEME_ACTION } from '../actions/constants.js'

const initialState = {
    darkMode: false
}

export const theme = (state = initialState, action) => {
    switch(action.type){
        case THEME_ACTION:
            return {
                ...state,
                darkMode: action.payload.darkMode
            }
        default:
            return state;
    }
}