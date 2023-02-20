import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { baseApiUrl } from "../index";

const name = "services";

// Stato iniziale delle prenotazioni
const initialState = {
  services: [],
  service: {},
  bookings: [],
  loadingBookings: false,
  loadingService: false,
  loadingAllServices: false,
  loadingBills: false,
  error: ""
};

// Thunk per ottenere la lista dei servizi
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

// Thunk per ottenere la lista delle prenotazioni
export const getAllBookings = createAsyncThunk(
  `${name}/getAllBookings`,
  async ({
    serviceID = "",
    startDate = ""
  }) => {
    const params = queryString.stringify({
      serviceID,
      startDate
    });
    const response = await fetch(
      `${baseApiUrl}/booking?${params}`
    );
    return await response.json();
  }
);

// Thunk per creare una prenotazione
export const createBooking = createAsyncThunk(
  `${name}/createBooking`,
  async (data, thunkAPI) => {
    const user = thunkAPI.getState().auth.user
    const rejectWithValue = thunkAPI.rejectWithValue
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
    if (!response.ok)
      return rejectWithValue("Errore generico");
    return await response.json();
  }
);



// Thunk per ottenere un servizio specifico
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
    waitingGetAllBookings: (state) => {
      state.loadingBookings = true
    }
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
    builder.addCase(createBooking.rejected, (state, action) => {
      state.error = action.payload
    })
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.loadingBookings = false
      state.bookings = action.payload
    })
  },
});

export const {
    waitingGetAllServices,
    waitingGetByServiceByID,
    waitingGetService,
    waitingGetAllBookings
} = serviceSlice.actions;
export const bookings = serviceSlice.reducer;
