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
        mimeType: 'application/json',
        body: JSON.stringify(userData)
    });
    if (req.ok)
        dispatch(loginSuccess(await req.json()))
    else
        dispatch(loginError())
}

const loginSuccess = (data) => {
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