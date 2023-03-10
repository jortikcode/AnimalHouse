import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { baseApiUrl } from "../index";
const name = "locations";

// Stato iniziale dei prodotti
const initialState = {
  locations: [],
  location: {},
  cities: [],
  loadingLocations: false,
  loadingCities: false,
  loadingLocation: false,
  errorMsg: ""
};

// Thunk per ottenere la lista delle sedi
export const getLocationsByCity = createAsyncThunk(
  `${name}/getLocationsByCity`,
  async ({ city = "" }, thunkAPI) => {
    const params = queryString.stringify({
      city,
    });
    const response = await fetch(`${baseApiUrl}/locations?${params}`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere info su una location dato l'id
export const getLocationByID = createAsyncThunk(
  `${name}/getLocationByID`,
  async ({ id = "" }, thunkAPI) => {
    const response = await fetch(`${baseApiUrl}/locations/${id}`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

// Thunk per ottenere la lista delle Città
export const getAllCities = createAsyncThunk(
  `${name}/getAllCities`,
  async (_, thunkAPI) => {
    const response = await fetch(`${baseApiUrl}/locations/city`);
    if (!response.ok)
      return thunkAPI.rejectWithValue(await response.json())
    return response.json();
  }
);

const locationsSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearAll: (state) => {
      state.products = [];
      state.cart = {};
    },
    waitingGetLocation: (state) => {
      state.loadingLocation = true;
    },
    waitingGetLocations: (state) => {
      state.loadingLocations = true;
    },
    waitingGetCities: (state) => {
      state.loadingCities = true;
    },
    clearErrorLocations: (state) => {
      state.errorMsg = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.loadingCities = false;
      state.cities = action.payload;
    });
    builder.addCase(getLocationsByCity.fulfilled, (state, action) => {
      state.loadingLocations = false;
      state.locations = action.payload;
    });
    builder.addCase(getLocationByID.fulfilled, (state, action) => {
        state.loadingLocation = false
        state.location = action.payload
    });
    builder.addCase(getAllCities.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    })
    builder.addCase(getLocationByID.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    })
    builder.addCase(getLocationsByCity.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    })
  },
});

export const { waitingGetCities, waitingGetLocations, waitingGetLocation, clearErrorLocations } = locationsSlice.actions;

export const locations = locationsSlice.reducer;
