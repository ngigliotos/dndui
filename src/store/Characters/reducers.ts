import { PayloadAction } from "@reduxjs/toolkit";

export interface ICharactersSliceState {
  characters: { [id: string]: ICharacter };
  intialCharacters: { [id: string]: ICharacter };
}

export const initialState: ICharactersSliceState = {
  characters: {},
  intialCharacters: {},
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
  hasSpells: true,
  spells: [],
  remainingHitDie: "0",
  spellSlots: {},
  attacks: [],
  languages: "",
  items: "",
  details: "",
  otherProfs: "",
};

export const getCharactersPending = (state: ICharactersSliceState) => ({
  ...state,
  characters:
    Object.entries(state.characters).length === 0 ? {} : state.characters,
  intialCharacters: {},
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

  console.log(Object.entries(state.characters).length === 0);

  return {
    ...state,
    characters:
      Object.entries(state.characters).length === 0
        ? charMap
        : state.characters,
    intialCharacters: charMap,
  };
};

export const addCharacter = (
  state: ICharactersSliceState,
  { payload }: PayloadAction<ICharacter>
): void => {
  //Id should always exist here
  if (payload.id) {
    state.characters[payload.id] = payload;
  }
};
export const removeCharacter = (
  state: ICharactersSliceState,
  { payload }: PayloadAction<string>
): void => {
  let characters = state.characters;
  delete characters[payload];
};
