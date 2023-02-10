import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import queryString from 'query-string'

const name = "products"

// Stato iniziale dei prodotti
const initialState = {
    products: [],
    product: {},
    cart: {},
    loadingAll: false
}

// Url base della API (http://localhost:8000/api/v1 || http://site212222.tw.cs.unibo.it/api/v1)
const baseUrl = process.env.REACT_APP_BASE_API_URL

// Thunk per ottenere la lista dei prodotti
export const getAllProducts = createAsyncThunk(
    `${name}/getAllProducts`,
    async ({ featured = false, name = "", sort = true, numericFilters = "price>0,rating>0" }) => {
        const params = queryString.stringify({
            featured: featured,
            name: name,
            sort: sort,
            numericFilters: numericFilters
        } , {
            arrayFormat: 'comma'
        })
        const response = await fetch(`${baseUrl}/products?${params}`);
        return response.json();
    }
);

// Thunk per ottenere ottenere info di uno specifico prodotto
export const getProduct = createAsyncThunk(
    `${name}/getProduct`,
    async ({ product_id }) => {
        const response = await fetch(`${baseUrl}/products/${product_id}`);
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loadingAll = false
            state.products = action.payload
        })
        builder.addCase(getAllProducts.rejected, (state) => {
            state.loadingAll = false
            state.products = null
            state.product = null
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.product = null
        })
    }
})

export const { clearAll, clearCart, waitingGetAll } = productSlice.actions
export const marketplace = productSlice.reducer