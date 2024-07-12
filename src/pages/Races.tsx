import { useSelector } from "react-redux";
import { Col, Input, Row, Typography } from "antd";
import { selectRaces } from "../store/Races";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";

export function Races() {
  const races = useSelector(selectRaces);
  const raceKeys = Object.keys(races);
  const navigate = useNavigate();

  const [filteredWord, setFilteredWord] = useState("");

  const formatAbilityBonus = (race: IRaceInfo) => {
    let abilityString = "";
    if (race.abilityBonus) {
      let abilityBonusEntriesLength = Object.entries(race.abilityBonus).length;
      Object.entries(race.abilityBonus).forEach((score, index) => {
        if (score[0].toLowerCase() !== "choose") {
          abilityString += `${
            score[0].charAt(0).toUpperCase() + score[0].slice(1)
          }${index !== abilityBonusEntriesLength - 1 ? ", " : ""}`;
        } else {
          abilityString += "Choose";
        }
      });
    } else {
      abilityString += "Choose";
    }
    return abilityString;
  };

  const formatWeaponProfs = (str: string) => {
    return (str + ",")
      .split(/\|.*?,/)
      .map((splitStr) => {
        return splitStr.charAt(0).toUpperCase() + splitStr.slice(1);
      })
      .join("");
  };

  const allRaces = useMemo<IRaceInfo[]>(() => {
    let allRaces: IRaceInfo[] = [];
    raceKeys.forEach((key) => {
      Object.entries(races[key]).forEach((race) => {
        allRaces.push(race[1]);
      });
    });

    return allRaces;
  }, [races, raceKeys]);

  const filteredRaces = () => {
    return Object.values(allRaces).filter((race) =>
      race.name.toLowerCase().includes(filteredWord.toLowerCase())
    );
  };

  const options: ColumnProps<IRaceInfo>[] = [
    {
      title: <Typography.Text className="spell-title">Name</Typography.Text>,
      key: "name",
      dataIndex: "name",
    },
    {
      title: <Typography.Text className="spell-title">Source</Typography.Text>,
      key: "source",
      dataIndex: "source",
    },
    {
      title: (
        <Typography.Text className="spell-title">
          Ability Bonuses
        </Typography.Text>
      ),
      key: "abilityBonuses",
      render: (text, record) => formatAbilityBonus(record),
    },
    {
      title: (
        <Typography.Text className="spell-title">
          Skill Proficiencies
        </Typography.Text>
      ),
      key: "skillProfs",
      render: (text, record) =>
        record.numOfSkillsToChoose
          ? `Choose ${
              record.numOfSkillsToChoose
            } of [${record?.skillProficiencies
              .map((prof) => {
                return prof.charAt(0).toUpperCase() + prof.slice(1);
              })
              .join(", ")}]`
          : "None",
    },
    {
      title: (
        <Typography.Text className="spell-title">
          Language Proficiencies
        </Typography.Text>
      ),
      key: "langs",
      render: (text, record) => {
        return record.languageProfs
          .map((prof) => {
            return prof.charAt(0).toUpperCase() + prof.slice(1);
          })
          .join(", ");
      },
    },
    {
      title: (
        <Typography.Text className="spell-title">
          Weapon Proficiencies
        </Typography.Text>
      ),
      key: "langs",
      render: (text, record) => {
        return record.weaponProfs.length
          ? record.weaponProfs
              .map((prof) => {
                return formatWeaponProfs(prof);
              })
              .join(", ")
          : "None";
      },
    },
    {
      title: (
        <Typography.Text className="spell-title">Darkvision</Typography.Text>
      ),
      key: "darkvision",
      render: (text, record) =>
        record.darkvision ? `${record.darkvision}ft` : "None",
    },
  ];

  return (
    <div className="page-container">
      <Input
        className="spell-filter-input"
        value={filteredWord}
        onChange={(e) => setFilteredWord(e.target.value)}
        placeholder="Type Race name"
      ></Input>
      <Table
        className="spell-table"
        columns={options}
        dataSource={filteredRaces()}
        pagination={{ pageSize: 15 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate(`${ROUTES.raceInfo}/${record.name}/${record.source}`);
            }, // click row
          };
        }}
      ></Table>
    </div>
  );
}

export default Races;
