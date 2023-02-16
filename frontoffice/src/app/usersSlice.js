import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseApiUrl } from '../index'

// Nomae dello slice
const name = "user"
// Stato iniziale dell'utente
const initialState = {
    user: JSON.parse(localStorage.getItem('user') || "{}"),
    isLogged: localStorage.getItem('user') ? true : false,
    updatedAnimals: true,
    userSearched: {},
    loadUserByID: false
}

// Thunk per il login di un utente
const login = createAsyncThunk(
    `${name}/login`,
    async ({ email, password }) => {
        const response = await fetch(`${baseApiUrl}/auth/login`, { 
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    }
);

// Thunk per la registrazione di un utente
const signup = createAsyncThunk(
    `${name}/signup`,
    async (userInfo) => {
        const response = await fetch(`${baseApiUrl}/auth/register`, { 
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
        })
        return await response.json();
    }   
)

// Thunk per la registrazione di un utente
const updateUser = createAsyncThunk(
    `${name}/update`,
    async ({ userInfo }) => {
        const formData = new FormData()

        for (const key in userInfo)
            if (key === "imageName")
                formData.append(userInfo["imageName"][0])
            else
                formData.append(userInfo[key])

        const response = await fetch(`${baseApiUrl}/auth/register`, { 
            method: 'PATCH',
            body: formData
        })
        return await response.json();
    }   
)

const getUserByID = createAsyncThunk(
    `${name}/getUserByID`,
    async ({ id }) => {
        const response = await fetch(`${baseApiUrl}/users/${id}`)
        return await response.json()
    }
)

const userSlice = createSlice({ 
    name, 
    initialState, 
    reducers: {
        logout: (state) => {
            state.user = {};
            state.isLogged = false;
            localStorage.removeItem('user');
        },
        loadAnimals: (state) => {
            state.updatedAnimals = false
        },
        waitingUserByID: (state) => {
            state.loadUserByID = true
        }

    }, 
    extraReducers: (builder) => {
        // Reducers dei thunks di login e registrazione
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
            if (!state.user.userInfo)
                state.isLogged = false
            else
                state.isLogged = true
        })
        builder.addCase(login.rejected, (state, action) => {
            state.user = {}
            state.isLogged = false
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload
            state.isLogged = true
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.user = {}
            state.isLogged = false
        })
        builder.addCase(getUserByID.fulfilled, (state, action) => {
            state.userSearched = action.payload
            state.loadUserByID = false
        })
    }
})

export const { logout, loadAnimals, waitingUserByID } = { ...userSlice.actions }
export { login, signup, updateUser, getUserByID }

export const auth = userSlice.reducer