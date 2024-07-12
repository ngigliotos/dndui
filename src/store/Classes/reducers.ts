import { PayloadAction } from "@reduxjs/toolkit";

export interface IClassesSliceState {
  classes: { [id: string]: IClassInfo };
}

export const initialState: IClassesSliceState = {
  classes: {},
};

export const getClassesPending = (state: IClassesSliceState) => ({
  ...state,
  classes: {},
});

export const getClassesSuccess: (
  state: IClassesSliceState,
  action: PayloadAction<any>
) => IClassesSliceState = (
  state: IClassesSliceState,
  action: PayloadAction<any>
) => {
  const { payload } = action;

  console.log(payload);
  return {
    ...state,
    classes: payload,
  };
};
