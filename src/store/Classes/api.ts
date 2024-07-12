const SOURCE_FILE = "./src/assets/classes/master-class.json";
const fs = window.require("fs");

function parseDescription(desc: any[]) {
  desc.forEach((item, index) => {
    if (typeof item !== "string") {
      if (item.items) {
        desc[index] = item.items.join("\n");
      } else if (item.options) {
        desc[index] = item.options.entries
          .map((entry: any) => entry.subclassFeature)
          .join(" ");
      } else {
        desc[index] = item.subclassFeature;
      }
    }
  });

  return desc.join(" ");
}

export const getClasses = async (): Promise<any> => {
  let classesFileData: {
    classes: any[];
    subclass: any[];
    classFeature: any[];
    subclassFeature: any[];
  } = JSON.parse(
    fs.readFileSync(SOURCE_FILE, {
      encoding: "utf-8",
      flag: "r",
    })
  );
  let classes: { [key: string]: IClassInfo } = {};
  classesFileData.classes.forEach((classItem) => {
    classes[classItem.name.toLowerCase()] = {
      name: classItem.name,
      hdFace: classItem.hd.faces,
      savingThrowProfs: classItem.proficiency,
      startingProfs: {
        armor: classItem.startingProficiencies.armor
          ? classItem.startingProficiencies.armor.map((item: any) => {
              if (
                typeof item === "string" &&
                !item.toLowerCase().includes("shield")
              )
                return item + " Armor";
              else if (typeof item !== "string") return item.proficiency + "s";
              else return item + "s";
            })
          : "None",

        weapons: classItem.startingProficiencies.weapons.map((weapon: any) => {
          if (
            weapon.toLowerCase() === "simple" ||
            weapon.toLowerCase() === "martial"
          )
            return weapon + " Weapons";
          else return weapon + "s";
        }),
        skills: {
          skills: classItem.startingProficiencies.skills[0].choose
            ? classItem.startingProficiencies.skills[0].choose.from
            : "Any",
          num: classItem.startingProficiencies.skills[0].choose
            ? classItem.startingProficiencies.skills[0].choose.count
            : classItem.startingProficiencies.skills[0].any,
        },
      },
      startingEquipment: classItem.startingEquipment.default,
      classFeatures: [],
      subclasses: [],
      tableData: classItem.classTableGroups,
      fluff: classItem.fluff,
    };
  });
  classesFileData.subclass.forEach((subclass) => {
    classes[subclass.className.toLowerCase()].subclasses.push({
      name: subclass.name,
      shortname: subclass.shortName,
      spellcastingAbility: subclass.spellcastingAbility
        ? subclass.spellcastingAbility
        : undefined,
      features: [],
    });
  });
  classesFileData.classFeature.forEach((classFeature) => {
    classes[classFeature.className.toLowerCase()].classFeatures.push({
      name: classFeature.name,
      className: classFeature.className,
      level: classFeature.level,
      desc: parseDescription(classFeature.entries),
    });
  });
  classesFileData.subclassFeature.forEach((subclassFeature) => {
    let currSubclass = classes[
      subclassFeature.className.toLowerCase()
    ].subclasses.filter(
      (subclass) => subclass.shortname === subclassFeature.subclassShortName
    );
    currSubclass[0].features.push({
      name: subclassFeature.name,
      subclassShortName: subclassFeature.subclassShortName,
      level: subclassFeature.level,
      desc: parseDescription(subclassFeature.entries),
    });
  });
  return classes;
};
