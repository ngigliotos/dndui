import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClassesPending, getClassesSuccess, initialState } from "./reducers";
import { getClasses } from "./api";

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async () => {
    return await getClasses();
  }
);

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.pending, getClassesPending);
    builder.addCase(fetchClasses.fulfilled, getClassesSuccess);
  },
});

export const { reducer: classesReducer } = classesSlice;
