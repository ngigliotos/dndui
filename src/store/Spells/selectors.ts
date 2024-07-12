import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISpellsSliceState } from "./reducers";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const spellsSliceSelector = (state: RootState): ISpellsSliceState =>
  state.spells;

export const useSelectSpells = () => {
  const spellSelector = useMemo(() => {
    return createSelector(
      [spellsSliceSelector],
      (spellsState: ISpellsSliceState) => spellsState.spells
    );
  }, []);
  return useSelector(spellSelector);
};
