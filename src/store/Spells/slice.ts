import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSpells } from "./api";
import { getSpellsPending, getSpellsSuccess, initialState } from "./reducers";

export const fetchSpells = createAsyncThunk("spells/fetchSpells", async () => {
  return await getSpells();
});

const spellsSlice = createSlice({
  name: "spells",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSpells.pending, getSpellsPending);
    builder.addCase(fetchSpells.fulfilled, getSpellsSuccess);
  },
});

export const { reducer: spellsReducer } = spellsSlice;
