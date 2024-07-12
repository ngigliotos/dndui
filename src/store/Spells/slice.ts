import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSpells } from "./api";
import {
  getSpellListDetailsPending,
  getSpellsPending,
  getSpellsSuccess,
  initialState,
} from "./reducers";

function switchDamageTypes(dc: IDifficultyClass) {
  switch (dc.dc_type.name.toLowerCase()) {
    case "str":
      return "Strength";
    case "dex":
      return "Dexterity";
    case "con":
      return "Constitution";
    case "int":
      return "Intelligence";
    case "wis":
      return "Wisdom";
    case "cha":
      return "Charisma";
    default:
      return "";
  }
}

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
