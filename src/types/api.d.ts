declare interface ICharacter {
  [key: string]: any;
  id?: string;
  name: string;
  level?: number;
  class: string;
  race?: string;
  proficiencyBonus?: number;
  initiative: number;
  armorClass: number;
  moveSpeed: number;
  currHealth: number;
  maxHealth: number;
  tempHealth: number;
  abilityScores: IAbilityScores;
  savingThrowProfs: ISavingThrowProficiencies;
  skillProfs?: ISkillProficiencies;
  attacks: IAttack[];
  hasSpells: boolean;
  spells: string[];
  remainingHitDie: string;
  spellSlots: { [key: number]: ISpellSlot };
  languages: string;
  items: string;
  details: string;
  otherProfs: string;
}

declare interface ISpellSlot {
  max: number;
  current: number;
}

declare interface IAbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  wisdom: number;
  intelligence: number;
  charisma: number;
}

declare interface ISkillProficiencies {
  [key: skillProficiencyTypes]: boolean;
  acrobatics: boolean;
  animalHandling: boolean;
  arcana: boolean;
  athletics: boolean;
  deception: boolean;
  history: boolean;
  insight: boolean;
  intimidation: boolean;
  investigation: boolean;
  medicine: boolean;
  nature: boolean;
  perception: boolean;
  performance: boolean;
  persuasion: boolean;
  religion: boolean;
  sleightOfHand: boolean;
  stealth: boolean;
  survival: boolean;
}

declare interface ISavingThrowProficiencies {
  [key: savingThrowProficiencyTypes]: boolean;
  strength: boolean;
  dexterity: boolean;
  constitution: boolean;
  intelligence: boolean;
  wisdom: boolean;
  charisma: boolean;
}

type savingThrowProficiencyTypes =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma";

type skillProficiencyTypes =
  | "acrobatics"
  | "animalHandling"
  | "arcana"
  | "athletics"
  | "deception"
  | "history"
  | "insight"
  | "intimidation"
  | "investigation"
  | "medicine"
  | "nature"
  | "perception"
  | "performance"
  | "persuasion"
  | "religion"
  | "sleightOfHand"
  | "stealth"
  | "survival";

type AttacksKeys = "method" | "toHit" | "damage";

declare interface ISkillProficiencyObj {
  label: string;
  value: skillProficiencyTypes;
}

declare interface IAttack {
  [key: "method" | "toHit" | "damage"]: string;
  method: string;
  toHit: string;
  damage: string;
}

declare interface IBaseCatalog {
  index: string;
  name: string;
  url: string;
}

declare interface ISpellSummary extends IBaseCatalog {
  level: number;
}

declare interface ISpellSummaryList {
  count: number;
  spells: ISpellSummary[];
}

declare interface ISpell {
  name: string;
  desc: string;
  page?: string;
  range: string;
  components: string;
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: ICastingTime;
  level: string;
  school: string;
  source: string;
  higher_level?: string;
  classes: string[];
  damage?: string;
}

declare interface IDamage {
  damage_type: IBaseCatalog;
  damage_at_slot_level?: IDamageAtSlotLevel;
  damage_at_character_level?: IDamageAtCharacterLevel;
}

declare interface IDamageAtSlotLevel {
  [key: number]: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
}

declare interface IDamageAtCharacterLevel {
  1: string;
  5: string;
  11: string;
  15: string;

  17: string;
  20: string;
}

declare interface IDifficultyClass {
  dc_type: IBaseCatalog;
  dc_success: string;
}

declare interface ICastingTime {
  number: number;
  unit: string;
  condition?: string;
}
type ClassNames =
  | "Barbarian"
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Monk"
  | "Paladin"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Warlock"
  | "Wizard"
  | "Blood hunter";

declare interface IClassInfo {
  name: string;
  hdFace: number;
  savingThrowProfs: string[];
  startingProfs: IStartingProfs;
  startingEquipment: string[];
  classFeatures: IClassFeature[];
  subclasses: ISubclass[];
  tableData?: any[];
  fluff: any[];
}

declare interface IStartingProfs {
  armor: string[];
  weapons: string[];
  skills: {
    skills: string[];
    num: number;
  };
}

declare interface IClassFeature {
  name: string;
  className: string;
  level: number;
  desc: string;
}

declare interface ISubclass {
  name: string;
  shortname: string;
  spellcastingAbility?: string;
  features: ISubclassFeature[];
}

declare interface ISubclassFeature {
  name: string;
  subclassShortName: string;
  level: number;
  desc: string;
}
