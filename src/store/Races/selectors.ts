import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IRacesSliceState } from "./reducers";

export const racesSliceSelector = (state: RootState): IRacesSliceState =>
  state.races;

export const selectRaces = createSelector(
  racesSliceSelector,
  (racesState: IRacesSliceState) => racesState.races
);

export const selectSpecificRace = createSelector(
  [
    (state: RootState) => state.races,
    (state: RootState, name?: string) => name,
  ],
  (races, name) => (name ? races.races[name] : undefined)
);

export const selectSpecificRaceVariant = createSelector(
  [
    (state: RootState) => state.races,
    (state: RootState, name?: string) => name,
    (state: RootState, variant?: string) => variant,
  ],
  (races, name, variant) =>
    name && variant ? races.races[name][variant] : undefined
);

export const selectAllRacesWithVariants = createSelector(
  racesSliceSelector,
  (racesState: IRacesSliceState) => racesState.racesAndVariants
);
