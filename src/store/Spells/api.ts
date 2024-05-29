const SOURCE_FILE = "./src/assets/spells/sources.json";
const SPELL_FILE = "./src/assets/spells/master-spells.json";
const fs = window.require("fs");

const getDamageString = (spellDesc: string) => {
  let splitSpellDesc = spellDesc.split("{@damage ");
  if (splitSpellDesc.length > 1) {
    return splitSpellDesc[1].split("}")[0];
  }
};

const translateSchool = (letter: string) => {
  switch (letter) {
    case "A":
      return "Abjuration";
    case "C":
      return "Conjuration";
    case "D":
      return "Divination";
    case "E":
      return "Enchantment";
    case "I":
      return "Illusion";
    case "N":
      return "Necromancy";
    case "T":
      return "Transmutation";
    case "V":
      return "Evocation";
    default:
      return "";
  }
};

export const getSpells = async (): Promise<any> => {
  let spellSourceFileData = JSON.parse(
    fs.readFileSync(SOURCE_FILE, {
      encoding: "utf-8",
      flag: "r",
    })
  );

  let spellSourceData: { [key: string]: any } = {};
  for (const spellSource in spellSourceFileData) {
    for (const spellName in spellSourceFileData[spellSource]) {
      spellSourceData[spellName] = spellSourceFileData[spellSource][spellName];
    }
  }

  let fileData: { spell: any[] } = JSON.parse(
    fs.readFileSync(SPELL_FILE, {
      encoding: "utf-8",
      flag: "r",
    })
  );

  let spells: ISpell[] = fileData.spell.map((spell) => {
    let spellClass: ClassNames[];
    if (spellSourceData[spell.name]["class"]) {
      spellClass = spellSourceData[spell.name]["class"].map(
        (charClass: { name: string; source: string }) => {
          return charClass.name.toLowerCase();
        }
      );
    } else {
      spellClass = spellSourceData[spell.name]["classVariant"].map(
        (charClass: { name: string; source: string }) => {
          return charClass.name;
        }
      );
    }

    let spellDesc = spell.entries
      .map((spellDesc: any) => {
        if (typeof spellDesc === "string") {
          return spellDesc;
        }
      })
      .filter((entry: any) => entry !== undefined)
      .join(" ");

    getDamageString(spellDesc);

    return {
      name: spell.name,
      duration:
        spell.duration[0].type === "timed"
          ? `${spell.duration[0].duration.amount} ${spell.duration[0].duration.type}(s)`
          : "Instant",
      desc: spellDesc,
      higher_level: spell.entriesHigherLevel
        ? spell.entriesHigherLevel[0].entries[0]
        : "None",
      level: spell.level.toString(),
      range:
        spell.range.type !== "special"
          ? spell.range.distance.amount
            ? `${spell.range.distance.amount} ${spell.range.distance.type}`
            : `${spell.range.distance.type
                .charAt(0)
                .toUpperCase()}${spell.range.distance.type.slice(1)}`
          : spell.type,
      school: translateSchool(spell.school),
      source: spell.source,
      ritual: spell.meta ? true : false,
      concentration: spell.duration[0].concentration ? true : false,
      casting_time: { number: spell.time[0].number, unit: spell.time[0].unit },
      components: Object.keys(spell.components).join(", "),
      material: spell.components.m ? spell.components.m : "None",
      classes: spellClass,
      damage: getDamageString(spellDesc),
    };
  });
  return spells;
};
