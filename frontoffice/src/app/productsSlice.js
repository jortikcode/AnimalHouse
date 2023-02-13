import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import queryString from 'query-string'
import { baseApiUrl } from '../index'

const name = "products"

// Stato iniziale dei prodotti
const initialState = {
    products: [],
    product: {},
    categories: [],
    cart: {},
    loadingAll: false,
    loadingOne: false,
    loadingCategories: false
}

// Thunk per ottenere la lista dei prodotti
export const getAllProducts = createAsyncThunk(
    `${name}/getAllProducts`,
    async ({ featured = "", name = "", sort = "", numericFilters = "", category = ""}) => {
        if (category === "all")
            category = ""
        if (!featured)
            featured = ""
        if (!sort)
            sort = ""
        const params = queryString.stringify({
            featured,
            name,
            sort,
            category
        })
        const response = await fetch(`${baseApiUrl}/products?${params}&numericFilters=${numericFilters}`);
        return response.json();
    }
);

// Thunk per ottenere il carrello di un utente
export const getCart = createAsyncThunk(
    `${name}/getCart`,
    async ({  }, thunkAPI) => {
        const { token, userInfo } = thunkAPI.getState().auth.user
        const id = userInfo["_id"]
        const params = queryString.stringify({
            id
        })

        const response = await fetch(`${baseApiUrl}/cart?${params}`, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.json();
    }
);

// Thunk per aggiungere un prodotto al carrello di un utente
export const addToCart = createAsyncThunk(
    `${name}/addToCart`,
    async ({ id = ""}, thunkAPI) => {
        const user = thunkAPI.getState().auth.user
        const params = queryString.stringify({
            id: user.userInfo["_id"]
        })
        const response = await fetch(`${baseApiUrl}/cart?${params}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                productId: id
            })
        });
        return response.json();
    }
);

// Thunk per aggiungere un prodotto al carrello di un utente
export const updateCart = createAsyncThunk(
    `${name}/updateCart`,
    async ({ id = "", quantity = ""}, thunkAPI) => {
        const user = thunkAPI.getState().auth.user
        const params = queryString.stringify({
            id: user.userInfo["_id"]
        })
        const response = await fetch(`${baseApiUrl}/cart?${params}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                productId: id,
                quantity
            })
        });
        return response.json();
    }
);


// Thunk per ottenere la lista delle categorie
export const getAllCategories = createAsyncThunk(
    `${name}/getAllCategories`,
    async () => {
        const response = await fetch(`${baseApiUrl}/products?getCategories=true`);
        return response.json();
    }
);


// Thunk per ottenere ottenere info di uno specifico prodotto
export const getProduct = createAsyncThunk(
    `${name}/getProduct`,
    async ({ id }) => {
        const response = await fetch(`${baseApiUrl}/products/${id}`);
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
        },
        waitingGetAllCategories: (state) => {
            state.loadingCategories = true
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
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.loadingCategories = false
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload
        })
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.cart = action.payload
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.cart = action.payload
        })
    }
})

export const { clearAll, clearCart, waitingGetAll, waitingGetById, waitingGetAllCategories } = productSlice.actions
export const marketplace = productSlice.reducer