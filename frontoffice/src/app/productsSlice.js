import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { baseApiUrl } from "../index";

const name = "products";

// Stato iniziale dei prodotti
const initialState = {
  products: [],
  product: {},
  categories: [],
  cart: {},
  bills: [],
  loadingAll: false,
  loadingOne: false,
  loadingCategories: false,
  loadingBills: false,
  pageLoaded: false,
  updatedBills: false,
  errorMsg: ""
};

// Thunk per ottenere la lista dei prodotti
export const getAllProducts = createAsyncThunk(
  `${name}/getAllProducts`,
  async ({
    featured = "",
    name = "",
    sort = "",
    numericFilters = "",
    category = "",
    location = "",
    city = ""
  }, thunkAPI) => {
    if (category === "all") category = "";
    if (city === "all") location = "";
    if (!featured) featured = "";
    if (!sort) sort = "";
    const params = queryString.stringify({
      featured,
      name,
      location,
      sort,
      category,
    });
    const response = await fetch(
      `${baseApiUrl}/products?${params}&numericFilters=${numericFilters}`
    );
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere la lista dei prodotti
export const getAllBills = createAsyncThunk(
  `${name}/getAllBills`,
  async (_, thunkAPI) => {
    const { userInfo } = thunkAPI.getState().auth.user;
    const id = userInfo["_id"];
    const params = queryString.stringify({
      userID: id,
    });
    const response = await fetch(`${baseApiUrl}/bill?${params}`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere il carrello di un utente
export const getCart = createAsyncThunk(
  `${name}/getCart`,
  async (_, thunkAPI) => {
    const { token, userInfo } = thunkAPI.getState().auth.user;
    const id = userInfo["_id"];
    const params = queryString.stringify({
      id,
    });

    const response = await fetch(`${baseApiUrl}/cart?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

export const createBill = createAsyncThunk(
  `${name}/createBill`,
  async (data, thunkAPI) => {
    const { token, userInfo } = thunkAPI.getState().auth.user;
    const id = userInfo["_id"];

    const response = await fetch(`${baseApiUrl}/bill`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: id,
        products: data?.cart?.products,
        total: data?.total,
        paymentMethod: data?.paymentMethod,
        type: data.type,
        service: data?.service,
      }),
    });
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per aggiungere un prodotto al carrello di un utente
export const addToCart = createAsyncThunk(
  `${name}/addToCart`,
  async ({ id = "" }, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const params = queryString.stringify({
      id: user.userInfo["_id"],
    });
    const response = await fetch(`${baseApiUrl}/cart?${params}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per aggiungere un prodotto al carrello di un utente
export const updateCart = createAsyncThunk(
  `${name}/updateCart`,
  async ({ id = "", quantity = "" }, thunkAPI) => {
    const user = thunkAPI.getState().auth.user;
    const params = queryString.stringify({
      id: user.userInfo["_id"],
    });
    const response = await fetch(`${baseApiUrl}/cart?${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        productId: id,
        quantity,
      }),
    });
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere la lista delle categorie
export const getAllCategories = createAsyncThunk(
  `${name}/getAllCategories`,
  async (_, thunkAPI) => {
    const response = await fetch(`${baseApiUrl}/products?getCategories=true`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere ottenere info di uno specifico prodotto
export const getProduct = createAsyncThunk(
  `${name}/getProduct`,
  async ({ id }, thunkAPI) => {
    const response = await fetch(`${baseApiUrl}/products/${id}`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

const productSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearAll: (state) => {
      state.products = [];
      state.cart = {};
    },
    firstLoad: (state) => {
      state.pageLoaded = true
    },
    clearCart: (state) => {
      state.cart = {};
    },
    waitingGetAll: (state) => {
      state.loadingAll = true;
    },
    waitingGetById: (state) => {
      state.loadingOne = true;
    },
    waitingBills: (state) => {
      state.loadingBills = true;
    },
    loadBills: (state) => {
      state.updatedBills = true
    },
    clearErrorProducts: (state) => {
      state.errorMsg = ""
    },
    waitingGetAllCategories: (state) => {
      state.loadingCategories = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loadingAll = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.products = [];
      state.errorMsg = action.payload.msg
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loadingOne = false;
      state.product = action.payload.product;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.product = {};
      state.errorMsg = action.payload.msg
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loadingCategories = false;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(createBill.fulfilled, (state, action) => {
      state.cart = {};
      state.updatedBills = false
    });
    builder.addCase(createBill.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
    builder.addCase(getAllBills.fulfilled, (state, action) => {
      state.loadingBills = false;
      state.updatedBills = true
      state.bills = action.payload;
    });
    builder.addCase(getAllBills.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    });
  },
});

export const {
  clearAll,
  clearCart,
  waitingGetAll,
  waitingGetById,
  waitingGetAllCategories,
  waitingBills,
  firstLoad,
  loadBills,
  clearErrorProducts
} = productSlice.actions;
export const marketplace = productSlice.reducer;
