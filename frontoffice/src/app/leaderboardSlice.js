import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { baseApiUrl } from "../index";
const name = "leaderboard";

// Stato iniziale della info sulla classifica
const initialState = {
  leaderboard: [],
  bestUsers: [],
};

// Thunk per ottenere la lista delle sedi
export const getLeaderboard = createAsyncThunk(
  `${name}/getLeaderboard`,
  async ({_}) => {
    const params = queryString.stringify({
      city,
    });
    const response = await fetch(`${baseApiUrl}/locations?${params}`);
    return response.json();
  }
);

const leaderboardSlice = createSlice({
  name,
  initialState,
  reducers: {
    waitingLeaderboard: (state) => {
      state.loadingLeaderboard = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.loadingLeaderboard = false;
      state.leaderboard = action.payload;
    });
  },
});

export const { waitingLeaderboard } = leaderboardSlice.actions;

export const leaderboard = leaderboardSlice.reducer;
