import { PayloadAction } from "@reduxjs/toolkit";

export interface ICharactersSliceState {
  characters: { [id: string]: ICharacter };
}

export const initialState: ICharactersSliceState = {
  characters: {},
};

export const emptyCharacter: ICharacter = {
  name: "",
  class: "",
  level: 1,
  proficiencyBonus: 2,
  initiative: 0,
  armorClass: 10,
  moveSpeed: 30,
  maxHealth: 0,
  currHealth: 0,
  tempHealth: 0,
  abilityScores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    wisdom: 0,
    intelligence: 0,
    charisma: 0,
  },
  savingThrowProfs: {
    strength: false,
    dexterity: false,
    constitution: false,
    intelligence: false,
    wisdom: false,
    charisma: false,
  },
  hasSpells: false,
  spells: [],
  remainingHitDie: "0",
  spellSlots: {},
  attacks: [],
};

export const getCharactersPending = (state: ICharactersSliceState) => ({
  ...state,
  characters: {},
});

export const getCharactersSuccess: (
  state: ICharactersSliceState,
  action: PayloadAction<ICharacter[]>
) => ICharactersSliceState = (
  state: ICharactersSliceState,
  action: PayloadAction<ICharacter[]>
) => {
  const { payload } = action;
  const charMap: { [key: string]: ICharacter } = {};
  payload.forEach((char) => {
    if (char.id) {
      charMap[char.id] = char;
    }
  });

  return {
    ...state,
    characters: charMap,
  };
};

export const removeCharacter = (
  state: ICharactersSliceState,
  { payload }: PayloadAction<string>
): void => {
  delete state.characters[payload];
};
