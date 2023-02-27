import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseApiUrl } from "../index";
const name = "leaderboard";

const HANGMAN = "HANGMAN"
const MEMORY = "MEMORY"
const QUIZ = "QUIZ"
const gameTypes = [
  HANGMAN,
  MEMORY,
  QUIZ
]

// Stato iniziale della info sulla classifica
const initialState = {
  leaderboard: {},
  loadingLeaderboard: false,
  errorMsg: ""
};

export const getLeaderboard = createAsyncThunk(
  `${name}/getScores`,
  async (_, thunkAPI) => {
      const user = thunkAPI.getState().auth.user;
      const response = await fetch(`${baseApiUrl}/users?scoreGames=true&fields=punteggiDeiGiochi,name`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${user.token}`,
          },
      })
      if (!response.ok)
        return thunkAPI.rejectWithValue(await response.json())
      return response.json()
  }
)

const getScoresArray = (usersArray, gameType) => {
  const resultArray = []
  for (const user of usersArray){
    for (const score of user.punteggiDeiGiochi)
      if (score.game.toUpperCase() === gameType)
        resultArray.push({
          name: user.name,
          score: score.score
        })
  }
  return resultArray
}

const compare = (a, b) => {
  if (a > b)
    return 1
  else if (b < a)
    return -1
  else
    return 0
}

const divideScores = (scores) => {
  const finalScoreboards = {}
  for (const type of gameTypes){
    finalScoreboards[type] = getScoresArray(scores, type).sort((user1, user2) => {
      if (type === HANGMAN || type === MEMORY) return compare(user1.score, user2.score)
      else return compare(user2.score, user1.score)
    })
  }
  return finalScoreboards
}

const leaderboardSlice = createSlice({
  name,
  initialState,
  reducers: {
    waitingLeaderboard: (state) => {
      state.loadingLeaderboard = true;
    },
    clearLeaderboardError: (state) => {
      state.errorMsg = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLeaderboard.fulfilled, (state, action) => {
      state.leaderboard = divideScores(action.payload)
      state.loadingLeaderboard = false;
    });
    builder.addCase(getLeaderboard.rejected, (state, action) => {
      state.errorMsg = action.payload.msg
    })
  },
});

export const { waitingLeaderboard, clearLeaderboardError} = leaderboardSlice.actions;

export const leaderboard = leaderboardSlice.reducer;
