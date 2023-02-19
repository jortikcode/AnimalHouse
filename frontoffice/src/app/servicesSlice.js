import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { baseApiUrl } from "../index";

const name = "services";

// Stato iniziale dei prodotti
const initialState = {
  services: [],
  service: {},
  bookings: [],
  loadingBookings: [],
  loadingService: false,
  loadingAllServices: false,
  loadingBills: false
};

// Thunk per ottenere la lista dei prodotti
export const getAllServices = createAsyncThunk(
  `${name}/getAllServices`,
  async ({
    location = ""
  }) => {
    const params = queryString.stringify({
      location,
    });
    const response = await fetch(
      `${baseApiUrl}/services?${params}`
    );
    return await response.json();
  }
);

// Thunk per ottenere la lista dei prodotti
export const getAllBookings = createAsyncThunk(
  `${name}/getAllBookings`,
  async ({
    location = ""
  }) => {
    const params = queryString.stringify({
      location,
    });
    const response = await fetch(
      `${baseApiUrl}/services?${params}`
    );
    return await response.json();
  }
);

// Thunk per creare una prenotazione
export const createBooking = createAsyncThunk(
  `${name}/createBooking`,
  async (data, thunkAPI) => {
    const user = thunkAPI.getState().auth.user
    const response = await fetch(
      `${baseApiUrl}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authentication": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...data,
          user: user.userInfo._id
        })
      }
    );
    return await response.json();
  }
);



// Thunk per ottenere la lista dei prodotti
export const getServiceByID = createAsyncThunk(
    `${name}/getServiceByID`,
    async ({
      id
    }) => {
      const response = await fetch(
        `${baseApiUrl}/services/${id}`
      );
      return await response.json();
    }
  );
  

const serviceSlice = createSlice({
  name,
  initialState,
  reducers: {
    waitingGetAllServices: (state) => {
      state.loadingAllServices = true;
    },
    waitingGetService: (state) => {
        state.loadingService = true
    },
    waitingGetByServiceByID: (state) => {
      state.loadingService = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.loadingAllServices = false;
      state.services = action.payload;
    });
    builder.addCase(getServiceByID.fulfilled, (state, action) => {
        state.loadingService = false
        state.service = action.payload
    })
    builder.addCase(createBooking.fulfilled, (state, action) => {
      state.bookings.unshift(action.payload)
    })
  },
});

export const {
    waitingGetAllServices,
    waitingGetByServiceByID,
    waitingGetService
} = serviceSlice.actions;
export const bookings = serviceSlice.reducer;
