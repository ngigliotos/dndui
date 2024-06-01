import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICharactersSliceState } from "./reducers";

export const charactersSliceSelector = (
  state: RootState
): ICharactersSliceState => state.characters;

export const selectCharacters = createSelector(
  charactersSliceSelector,
  (characterState: ICharactersSliceState) => characterState.characters
);

export const selectInitialCharacters = createSelector(
  charactersSliceSelector,
  (characterState: ICharactersSliceState) => characterState.intialCharacters
);

export const selectSpecificCharacter = createSelector(
  [
    (state: RootState) => state.characters,
    (state: RootState, id?: string) => id,
  ],
  (characters, id) => (id ? characters.characters[id] : undefined)
);
