const classNameArray: ClassNames[] = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
  "Blood hunter",
];

export const classes: { text: string; value: ClassNames }[] =
  classNameArray.map((className) => ({ text: className, value: className }));
