import {
    THEME_ACTION
} from './constants.js'
export const themeAction = (darkMode ) => {
    return (
        {
            type: THEME_ACTION,
            payload: {darkMode}
        }
    );
}