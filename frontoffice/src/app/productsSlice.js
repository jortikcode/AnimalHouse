import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import queryString from 'query-string'

const name = "products"

// Stato iniziale dei prodotti
const initialState = {
    products: [],
    product: {},
    cart: {},
    loadingAll: false,
    loadingOne: false
}

// Url base della API (http://localhost:8000/api/v1 || http://site212222.tw.cs.unibo.it/api/v1)
const baseUrl = process.env.REACT_APP_BASE_API_URL

// Thunk per ottenere la lista dei prodotti
export const getAllProducts = createAsyncThunk(
    `${name}/getAllProducts`,
    async ({ featured = "", name = "", sort = "", numericFilters = ""}) => {
        const params = queryString.stringify({
            featured,
            name,
            sort
        })
        const response = await fetch(`${baseUrl}/products?${params}&numericFilters=${numericFilters}`);
        return response.json();
    }
);

// Thunk per ottenere ottenere info di uno specifico prodotto
export const getProduct = createAsyncThunk(
    `${name}/getProduct`,
    async ({ id }) => {
        const response = await fetch(`${baseUrl}/products/${id}`);
        return response.json();
    }
);

const productSlice = createSlice({
    name,
    initialState,
    reducers: {
        clearAll: (state) => {
            state.products = []
            state.cart = {}
        },
        clearCart: (state) => {
            state.cart = {}
        },
        waitingGetAll: (state) => {
            state.loadingAll = true
        },
        waitingGetById: (state) => {
            state.loadingOne = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loadingAll = false
            state.products = action.payload
        })
        builder.addCase(getAllProducts.rejected, (state) => {
            state.products = []
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.loadingOne = false
            state.product = action.payload.product
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.product = {}
        })
    }
})

export const { clearAll, clearCart, waitingGetAll, waitingGetById } = productSlice.actions
export const marketplace = productSlice.reducer