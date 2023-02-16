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
};

// Thunk per ottenere la lista delle sedi
export const getLocationsByCity = createAsyncThunk(
  `${name}/getLocationsByCity`,
  async ({ city = "" }) => {
    const params = queryString.stringify({
      city,
    });
    const response = await fetch(`${baseApiUrl}/locations?${params}`);
    return await response.json();
  }
);

// Thunk per ottenere info su una location dato l'id
export const getLocationByID = createAsyncThunk(
  `${name}/getLocationByID`,
  async ({ id = "" }) => {
    const response = await fetch(`${baseApiUrl}/locations/${id}`);
    return await response.json();
  }
);

// Thunk per ottenere la lista delle citta'
export const getAllCities = createAsyncThunk(
  `${name}/getAllCities`,
  async () => {
    const response = await fetch(`${baseApiUrl}/locations/city`);
    return await response.json();
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
    })
  },
});

export const { waitingGetCities, waitingGetLocations, waitingGetLocation } = locationsSlice.actions;

export const locations = locationsSlice.reducer;
