import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRaces } from "./api";
import { getRacesPending, getRacesSuccess, initialState } from "./reducers";

export const fetchRaces = createAsyncThunk("races/fetchRaces", async () => {
  return await getRaces();
});

const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRaces.pending, getRacesPending);
    builder.addCase(fetchRaces.fulfilled, getRacesSuccess);
  },
});

export const { reducer: racesReducer } = racesSlice;
