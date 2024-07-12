import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IClassesSliceState } from "./reducers";

export const classesSliceSelector = (state: RootState): IClassesSliceState =>
  state.classes;

export const selectClasses = createSelector(
  classesSliceSelector,
  (classesState: IClassesSliceState) => classesState.classes
);

export const selectSpecificClass = createSelector(
  [
    (state: RootState) => state.classes,
    (state: RootState, name?: string) => name,
  ],
  (classes, name) => (name ? classes.classes[name] : undefined)
);
