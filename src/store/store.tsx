import { configureStore } from "@reduxjs/toolkit";
import { charactersReducer } from "./Characters";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { spellsReducer } from "./Spells";
import { classesReducer } from "./Classes";
import { racesReducer } from "./Races";

export const storeOptions = {
  reducer: {
    characters: charactersReducer,
    spells: spellsReducer,
    classes: classesReducer,
    races: racesReducer,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
