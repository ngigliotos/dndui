const SOURCE_FILE = "./src/assets/races/master-races.json";
const FLUFF_FILE = "./src/assets/races/fluff-races.json";
const fs = window.require("fs");

function generateEntriesFromFluff(data: any) {
  let stringsToAdd: string[] = [];
  if (data) {
    data.forEach((data_entry: any) => {
      if (data_entry.entries) {
        data_entry.entries.forEach((entry: any) => {
          if (typeof entry == "string") {
            stringsToAdd.push(entry);
          } else if (entry.entries) {
            stringsToAdd.push(...generateEntriesFromFluff(entry.entries));
          }
        });
      } else if (typeof data_entry == "string") {
        stringsToAdd.push(data_entry);
      }
    });
  }
  return stringsToAdd;
}

export const getRaces = async (): Promise<any> => {
  let racesFileData = JSON.parse(
    fs.readFileSync(SOURCE_FILE, { encoding: "utf-8", flag: "r" })
  );
  let raceFluffData = JSON.parse(
    fs.readFileSync(FLUFF_FILE, { encoding: "utf-8", flag: "r" })
  )["raceFluff"];

  let races: { [key: string]: { [key: string]: IRaceInfo } } = {};
  let racesAndVariants: { [key: string]: IRaceInfo } = {};
  let raceFluff: { [key: string]: any[] } = {};

  raceFluffData.forEach((race: any) => {
    raceFluff[`${race.name}-${race.source}`] = generateEntriesFromFluff(
      race.entries
    );
  });

  racesFileData.race.forEach((race: any) => {
    if (!race._copy) {
      let additionalSpells: IAdditionalSpell[] = [];
      if (race.additionalSpells) {
        race.additionalSpells.forEach((spell: any) => {
          //For some reason innate is learned by level
          if (spell.innate) {
            Object.entries(spell.innate).forEach((entry: [string, any]) => {
              if (!Array.isArray(entry[1])) {
                Object.entries(entry[1]).forEach(
                  (spellWithTime: [string, any]) => {
                    additionalSpells.push({
                      name: spellWithTime[1]["1"][0],
                      howItsKnown: "level",
                      chooseSpellAbility: typeof spell.ability === "object",
                      spellCastingAbility: spell.ability,
                      level: Number(entry[0]),
                      howOften: `Once per ${
                        spellWithTime[0] === "daily" ? "day" : "long rest"
                      }`,
                    });
                  }
                );
              } else {
                additionalSpells.push({
                  name: entry[1][0],
                  howItsKnown: "level",
                  chooseSpellAbility: typeof spell.ability === "object",
                  spellCastingAbility: spell.ability,
                  level: Number(entry[0]),
                  howOften: "Once per day",
                });
              }
            });
          }
          //For some reason known is learned innately
          if (spell.known) {
            Object.entries(spell.known).forEach((entry: [string, any]) => {
              if (!Array.isArray(entry[1])) {
                Object.entries(entry[1]).forEach(
                  (spellWithTime: [string, any]) => {
                    additionalSpells.push({
                      name: spellWithTime[1]["1"][0],
                      howItsKnown: "innate",
                      chooseSpellAbility: typeof spell.ability === "object",
                      spellCastingAbility: spell.ability,
                      level: undefined,
                      howOften: `Once per ${
                        spellWithTime[0] === "daily" ? "day" : "long rest"
                      }`,
                    });
                  }
                );
              } else {
                additionalSpells.push({
                  name: entry[1][0],
                  howItsKnown: "innate",
                  chooseSpellAbility: typeof spell.ability === "object",
                  spellCastingAbility: spell.ability,
                  level: undefined,
                  howOften: "Once per day",
                });
              }
            });
          }
        });
      }

      //Initialize to -1 so if we dont have a choose we can check if its -1 to ignore it
      let skillProficiencies: [string[], number] = [[], -1];
      if (race.skillProficiencies) {
        Object.entries(race.skillProficiencies[0]).forEach(
          (entry: [string, any]) => {
            if (entry[0] === "choose") {
              skillProficiencies[0] = entry[1]["from"];
              skillProficiencies[1] = entry[1]["count"] ? entry[1]["count"] : 1;
            } else if (entry[0] === "any") {
              skillProficiencies[0] = Object.keys(race.skillProficiencies[0]);
              skillProficiencies[1] = entry[1];
            } else {
              skillProficiencies[0] = Object.keys(race.skillProficiencies[0]);
            }
          }
        );
      }

      if (!races[race.name]) {
        races[race.name] = {};
      }

      let newRace: IRaceInfo = {
        name: race.name,
        size: race.size[0],
        source: race.source,
        speed:
          typeof race.speed === "number" ? { walk: race.speed } : race.speed,
        age: race.age,
        darkvision: race.darkvision,
        abilityBonus: race.ability ? race.ability[0] : undefined,
        languageProfs: race.languageProficiencies
          ? Object.keys(race.languageProficiencies[0])
          : ["common", "choose"],
        weaponProfs: race.weaponProficiencies
          ? Object.keys(race.weaponProficiencies[0])
          : [],
        skillProficiencies: skillProficiencies[0],
        numOfSkillsToChoose:
          skillProficiencies[1] === -1 ? undefined : skillProficiencies[1],
        entries: race.entries,
        additionalSpells: additionalSpells,
        resist: race.resist,
        fluff: raceFluff[`${race.name}-${race.source}`]
          ? raceFluff[`${race.name}-${race.source}`]
          : undefined,
      };

      races[`${race.name}`][`${race.source}`] = newRace;
      racesAndVariants[`${race.name}-${race.source}`] = newRace;
    }
  });
  return { races: races, racesAndVariants: racesAndVariants };
};
