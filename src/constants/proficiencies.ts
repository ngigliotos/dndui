export const skillProficiencies = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
].map((prof) => ({ label: prof, value: prof }));

export const savingThrowProficiencies: savingThrowProficiencyTypes[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

export const skillProficiencyTypeList: skillProficiencyTypes[] = [
  "acrobatics",
  "animalHandling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleightOfHand",
  "stealth",
  "survival",
];

export const skillProficiencyObjs: ISkillProficiencyObj[] =
  skillProficiencyTypeList.map((prof) => {
    let splitProf = prof.split(/(?=[A-Z])/);
    let profLabel = splitProf?.join(" ");
    profLabel =
      profLabel.substring(0, 1).toUpperCase() +
      profLabel.substring(1, profLabel.length);
    return { label: profLabel, value: prof };
  });
