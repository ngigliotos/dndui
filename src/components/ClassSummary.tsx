import { Typography } from "antd";
import { Link } from "react-router-dom";
import ROUTES from "../constants/routes";

export function formatSavingThrows(saves: string[]) {
  return saves.map((save) => {
    switch (save) {
      case "str":
        return "Strength";
      case "dex":
        return "Dexterity";
      case "con":
        return "Constitution";
      case "wis":
        return "Wisdom";
      case "int":
        return "Intelligence";
      case "cha":
        return "Charisma";
      default:
        return "";
    }
  });
}

export function ClassSummary(props: { classInfo: IClassInfo }) {
  const joinEntries = (entries: any[]) => {
    return entries.filter((entry) => typeof entry === "string").join(" ");
  };

  return (
    <div className="class-summary-container">
      <Link to={`${ROUTES.classInfo}/${props.classInfo.name.toLowerCase()}`}>
        <Typography className="class-name">{props.classInfo.name}</Typography>
        <Typography className="class-info">{`Hit Die: d${props.classInfo.hdFace}`}</Typography>
        <Typography className="class-info">{`Saving Throws: ${formatSavingThrows(
          props.classInfo.savingThrowProfs
        )}`}</Typography>
        <Typography className="class-desc">
          {joinEntries(props.classInfo.fluff[0].entries)}
        </Typography>
      </Link>
    </div>
  );
}
