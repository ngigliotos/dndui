import { PayloadAction } from "@reduxjs/toolkit";

export interface IRacesSliceState {
  races: { [key: string]: { [key: string]: IRaceInfo } };
  racesAndVariants: { [key: string]: IRaceInfo };
}

export const initialState: IRacesSliceState = {
  races: {},
  racesAndVariants: {},
};

export const getRacesPending = (state: IRacesSliceState) => ({
  ...state,
  classes: {},
});

export const getRacesSuccess: (
  state: IRacesSliceState,
  action: PayloadAction<any>
) => IRacesSliceState = (
  state: IRacesSliceState,
  action: PayloadAction<any>
) => {
  const { payload } = action;

  return {
    ...state,
    races: payload.races,
    racesAndVariants: payload.racesAndVariants,
  };
};
