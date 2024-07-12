import { List, Select, Typography } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectRaces, selectSpecificRace } from "../store/Races";
import { RootState } from "../store/store";
import { ReactElement, useMemo, useState } from "react";
import { formatSavingThrows } from "../components/ClassSummary";

export function Race() {
  const params: { raceName?: string; variantName?: string } = useParams();
  const raceData = useSelector((state: RootState) =>
    selectSpecificRace(state, params?.raceName)
  );
  const [currVariant, setCurrVariant] = useState(
    raceData && params.variantName ? raceData[params.variantName] : undefined
  );

  const variationOptions = useMemo<
    { value: string; label: ReactElement }[]
  >(() => {
    if (raceData) {
      return Object.entries(raceData).map((raceInfo) => {
        return {
          value: raceInfo[1].source,
          label: <span>{raceInfo[1].source}</span>,
        };
      });
    } else {
      return [];
    }
  }, [raceData]);

  const switchSize = (size: string) => {
    switch (size.toLowerCase()) {
      case "t":
        return "tiny";
      case "s":
        return "small";
      case "m":
        return "medium";
      case "l":
        return "large";
      case "h":
        return "huge";
      case "g":
        return "gargantuan";
      case "c":
        return "colossal";
    }
  };

  const formatEntry = (desc: string) => {
    let splitdesc = desc.split(/{([^}]*)}/);
    let parsedDesc: string[] = [];
    splitdesc.forEach((value) => {
      if (value.startsWith("@dice ")) {
        parsedDesc.push(value.split(" ")[1]);
      } else if (
        value.startsWith("@damage ") ||
        value.startsWith("@condition ") ||
        value.startsWith("@spell ") ||
        value.startsWith("@action ") ||
        value.startsWith("@spell ") ||
        value.startsWith("@item ") ||
        value.startsWith("@race ") ||
        value.startsWith("@skill ") ||
        value.startsWith("@creature")
      ) {
        //Remove only first index of split then rejoin
        let valueToAdd = value.split(" ");
        valueToAdd.shift();
        parsedDesc.push(valueToAdd.join(" ").split("|")[0]);
      } else {
        parsedDesc.push(value);
      }
    });
    return parsedDesc.join("");
  };

  //This formats all the race features into a readable string list. MEGA FUNCTION
  const formatRaceFeatures = (race: IRaceInfo) => {
    const raceFeatures: string[] = [];

    if (race.abilityBonus) {
      let abilityString = "Ability Score Increase: ";
      //Need this because ts doesnt understand race.abilityBonus is defined inside the forEach
      let abilityBonusEntriesLength = Object.entries(race.abilityBonus).length;
      Object.entries(race.abilityBonus).forEach((score, index) => {
        if (score[0].toLowerCase() !== "choose") {
          abilityString += `Your ${
            formatSavingThrows([score[0]])[0]
          } score increases by ${score[1]}${
            index !== abilityBonusEntriesLength - 1 ? ", " : ""
          }`;
        } else {
          abilityString += `And choose ${
            score[1].count
          } ability scores from [${formatSavingThrows(score[1].from).join(
            ", "
          )}] to increase by 1`;
        }
      });
      raceFeatures.push(abilityString);
    } else {
      raceFeatures.push(
        "Ability Score Increase: When determining your character’s ability scores, increase one score by 2 and increase a different score by 1, or increase three different scores by 1. You can't raise any of your scores above 20."
      );
    }
    if (race.speed) {
      Object.entries(race.speed).forEach((speed) => {
        const verb =
          speed[0].toLowerCase() === "walk"
            ? "Move"
            : speed[0].charAt(0).toUpperCase() + speed[0].slice(1);
        raceFeatures.push(
          `${verb}: Your character has a ${verb.toLowerCase()} speed of ${
            speed[1]
          }ft`
        );
      });
    }
    raceFeatures.push(
      `Size: Your character's size is ${switchSize(race.size)}`
    );
    //This is age handling
    const ageEntry = race.entries.find(
      (entry) => entry.name.toLowerCase() === "age"
    );
    if (ageEntry) {
      raceFeatures.push(`Age: ${ageEntry.entries[0]}`);
    } else if (race.age) {
      if (race.age.mature) {
        raceFeatures.push(
          `Age: ${race.name}s reach maturity around age ${race.age?.mature} and cannot live past ${race.age?.max}`
        );
      } else {
        raceFeatures.push(
          `Age: ${race.name}s cannot live past ${race.age?.max}`
        );
      }
    } else {
      raceFeatures.push(
        `Age: Unknown at this time, unfortunately you must go online for this information.`
      );
    }

    if (race.numOfSkillsToChoose && race.skillProficiencies) {
      raceFeatures.push(
        `Skills: You gain proficiency in ${
          race.numOfSkillsToChoose
        } of the following skills of your choice: [${race?.skillProficiencies
          .map((prof) => {
            return prof.charAt(0).toUpperCase() + prof.slice(1);
          })
          .join(", ")}]`
      );
    }
    race.entries.forEach((entry) => {
      if (
        entry.type === "entries" &&
        entry.name.toLowerCase() !== "age" &&
        entry.name.toLowerCase() !== "size"
      ) {
        raceFeatures.push(
          `${entry.name}: ${entry.entries
            .map((entry) => {
              return formatEntry(entry);
            })
            .join("")}`
        );
      }
    });
    return raceFeatures;
  };

  return (
    <div>
      {raceData && currVariant && (
        <div className="page-container">
          <Typography className="class-info-name">
            {currVariant.name}
          </Typography>
          <Select
            defaultValue={currVariant.source}
            className="race-variant-select"
            options={variationOptions}
            onChange={(e) => {
              setCurrVariant(raceData[e]);
            }}
          ></Select>
          <Typography className="race-descriptions-title">
            Description
          </Typography>
          <div className="race-description-container">
            <List
              dataSource={currVariant.fluff ? currVariant.fluff : []}
              renderItem={(item) => (
                <List.Item className="race-fluff-entry">-{item}</List.Item>
              )}
            />
          </div>
          <Typography className="race-descriptions-title">Features</Typography>
          <div className="race-description-container">
            <List
              dataSource={formatRaceFeatures(currVariant)}
              renderItem={(item) => (
                <List.Item className="race-fluff-entry">-{item}</List.Item>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
