import { PayloadAction } from "@reduxjs/toolkit";

export interface ISpellsSliceState {
  spells: { [id: string]: ISpell };
  spellOptions: { value: string; label: string }[];
}

export const initialState: ISpellsSliceState = {
  spells: {},
  spellOptions: [],
};

export const emptySpell: ISpell = {
  name: "",
  desc: "",
  range: "",
  components: "",
  material: "",
  ritual: false,
  duration: "",
  concentration: false,
  casting_time: {
    number: 0,
    unit: "feet",
  },
  level: "1",
  source: "",
  school: "",
  classes: [],
};

export const getSpellsPending = (state: ISpellsSliceState) => ({
  ...state,
  spells: {},
});

export const getSpellsSuccess: (
  state: ISpellsSliceState,
  action: PayloadAction<ISpellSummaryList>
) => ISpellsSliceState = (
  state: ISpellsSliceState,
  action: PayloadAction<any>
) => {
  const { payload } = action;

  const spells: ISpell[] = payload;

  let spellDict: { [id: string]: ISpell } = {};
  let spellOptions: { value: string; label: string }[] = [];

  spells.forEach((spell) => {
    spellDict[spell.name.toLowerCase()] = spell;
    spellOptions.push({ value: spell.name, label: spell.name });
  });

  return {
    ...state,
    spells: spellDict,
    spellOptions: spellOptions,
  };
};

export const getSpellListDetailsPending = (state: ISpellsSliceState) => ({
  ...state,
});
