import {
    THEME_ACTION,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from './constants.js'


export const themeAction = (darkMode) => {
    return (
        {
            type: THEME_ACTION,
            payload: {darkMode}
        }
    );
}

export const loginAttempt = (userData) => async (dispatch) => {
    const req = await fetch(`/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    })
    .catch(error => {
        throw new Error("Errore " + error);
    });
    // Wrong condition, req.ok is always true even when login is rejected, you should check the body of the response
    if (req.ok)
        dispatch(loginSuccess())
    else
        dispatch(loginError())
}

const loginSuccess = (data = {}) => {
    return ({
        type: LOGIN_SUCCESS,
        payload: data
    });
}

const loginError = () => {
    return ({
        type: LOGIN_ERROR,
        payload: null
    })
}