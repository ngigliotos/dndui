import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacters } from "./api";
import {
  addCharacter,
  getCharactersPending,
  getCharactersSuccess,
  initialState,
  removeCharacter,
} from "./reducers";

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    return await getCharacters();
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    removeCharacter,
    addCharacter,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, getCharactersPending);
    builder.addCase(fetchCharacters.fulfilled, getCharactersSuccess);
  },
});

export const { reducer: charactersReducer, actions } = charactersSlice;
