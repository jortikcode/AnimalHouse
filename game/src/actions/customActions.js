import {
    THEME_ACTION,
    LOGIN_ATTEMPT
} from './constants.js'
export const themeAction = (darkMode) => {
    return (
        {
            type: THEME_ACTION,
            payload: {darkMode}
        }
    );
}

export const loginAttempt = (username, password) => {
    /* fetch('/api/login', {
        method: 'GET'
    }) */
    return (
        {
            type: LOGIN_ATTEMPT,
            payload: null
        }
    );
}