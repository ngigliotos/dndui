import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectSpecificClass } from "../store/Classes";
import { RootState } from "../store/store";
import { List, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useEffect, useRef } from "react";
import { HashLink } from "react-router-hash-link";

export function Class() {
  const params: { class?: string } = useParams();
  const classData = useSelector((state: RootState) =>
    selectSpecificClass(state, params?.class)
  );
  const featuresRef = useRef([]);

  useEffect(() => {
    featuresRef.current = featuresRef.current.slice(
      0,
      classData?.classFeatures.length
    );
  }, [classData?.classFeatures]);

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -50;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const formatText = (
    text: string,
    splitChar?: string[],
    doFirstSplit?: boolean
  ) => {
    let returnText = text
      .replace(/{@.*?\ /g, "")
      .replace(/\|.*?}/g, "")
      .replaceAll("}", "");

    if (splitChar) {
      splitChar.forEach((char) => {
        let wordsToCap = returnText.split(char);
        returnText = wordsToCap
          .map((word, index) => {
            if (!doFirstSplit && index === 0) {
              return word;
            }
            return (
              word.substring(0, word.search(/[a-z]|[A-Z]/) + 1).toUpperCase() +
              word.substring(word.search(/[a-z]|[A-Z]/) + 1)
            );
          })
          .join(char);
      });
    }

    return returnText;
  };

  //This is very complex, please try to avoid messing with it
  const classTablesColumns: [ColumnProps<any>[], any[]] | undefined = [[], []];
  classData?.tableData?.forEach((data) => {
    let baseIndex = classTablesColumns[0].length;
    let dataLabels: string[] = [];
    data.colLabels.forEach((label: string) => {
      let formattedLabel = formatText(label);
      dataLabels.push(formattedLabel);
      classTablesColumns[0].push({
        title: <Typography.Text>{formattedLabel}</Typography.Text>,
        dataIndex: formattedLabel,
        key: formattedLabel,
      });
    });
    for (let i = 0; i < 20; i++) {
      let labeledData: { [key: string]: any } = { Level: i + 1 };
      if (data.rows) {
        data.rows[i].forEach((dataSet: any, index: number) => {
          if (typeof dataSet === "string" || typeof dataSet === "number") {
            labeledData[dataLabels[index]] = dataSet;
          } else {
            if (dataSet.type === "bonus")
              labeledData[dataLabels[baseIndex + index]] = `+${dataSet.value}`;
            else if (dataSet.type === "dice")
              labeledData[
                dataLabels[baseIndex + index]
              ] = `${dataSet.toRoll[0].number}d${dataSet.toRoll[0].faces}`;
            else labeledData[dataLabels[baseIndex + index]] = dataSet.value;
          }
        });
      }
      if (data.rowsSpellProgression) {
        data.rowsSpellProgression[i].forEach((dataSet: any, index: number) => {
          if (typeof dataSet === "string" || typeof dataSet === "number") {
            labeledData[dataLabels[index]] = dataSet;
          } else {
            if (dataSet.type === "bonus")
              labeledData[dataLabels[baseIndex + index]] = `+${dataSet.value}`;
            else labeledData[dataLabels[baseIndex + index]] = dataSet.value;
          }
        });
      }
      labeledData["key"] = i;
      //Only set class features by level on first loop
      if (classTablesColumns[1][i]) {
        classTablesColumns[1][i] = {
          ...classTablesColumns[1][i],
          ...labeledData,
        };
      } else {
        labeledData["features"] = classData.classFeatures.filter((feature) => {
          if (feature.level === i + 1) return feature.name;
        });
        classTablesColumns[1].push(labeledData);
      }
    }
  });

  //Inject level in
  classTablesColumns[0].unshift({
    title: <Typography.Text>Level</Typography.Text>,
    dataIndex: "Level",
    key: "Level",
  });

  //Inject class features by level
  classTablesColumns[0].push({
    title: <Typography.Text>Unlocked Features</Typography.Text>,
    dataIndex: "features",
    key: "features",
    render: (text, record) =>
      record.features.map((feature: IClassFeature, index: number) => {
        let text = feature.name;
        if (index !== record.features.length - 1) text += ", ";
        return (
          <HashLink
            smooth
            scroll={scrollWithOffset}
            key={`${feature.name}-${feature.level}-link`}
            className="class-unlocked-feature-link"
            to={`#${feature.name}-${feature.level}`}
          >
            {text}
          </HashLink>
        );
      }),
  });

  return (
    <div className="page-container">
      {classData && (
        <div>
          <Typography className="class-info-name">{classData.name}</Typography>
          {classTablesColumns && (
            <div>
              <Typography.Text className="class-table-title">
                Level Table
              </Typography.Text>
              <div style={{ display: "inline-block", minWidth: "60%" }}>
                <Table
                  className="class-table"
                  columns={classTablesColumns[0]}
                  dataSource={classTablesColumns[1]}
                  pagination={false}
                ></Table>
              </div>
            </div>
          )}
          <div className="class-start-info-container">
            <div className="class-start-eq-list">
              <Typography className="class-start-eq">
                Starting Equipment
              </Typography>
              <List
                dataSource={classData.startingEquipment}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text className="class-list-item">
                      {formatText(item, ["(a)", "(b)"])}
                    </Typography.Text>
                  </List.Item>
                )}
              ></List>
            </div>
            <div className="class-start-eq-list">
              <Typography className="class-start-eq">
                Starting Weapon/Armor Proficiencies
              </Typography>
              <List
                dataSource={[
                  ...classData.startingProfs.armor,
                  ...classData.startingProfs.weapons,
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text className="class-list-item">
                      {formatText(item, [" "], true)}
                    </Typography.Text>
                  </List.Item>
                )}
              ></List>
            </div>
            <div className="class-start-eq-list">
              <Typography className="class-start-eq">
                Starting Skill Proficiencies (Pick
                {classData.startingProfs.skills.num})
              </Typography>
              <List
                dataSource={classData.startingProfs.skills.skills}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text className="class-list-item">
                      {formatText(item, [" "], true)}
                    </Typography.Text>
                  </List.Item>
                )}
              ></List>
            </div>
          </div>
          <div>
            <Typography className="class-features-header">
              Class Features
            </Typography>
            {classData.classFeatures.map((feature) => {
              return (
                <div
                  className="class-feature-container"
                  id={`${feature.name}-${feature.level}`}
                  key={`${feature.name}-${feature.level}`}
                >
                  <Typography className="class-feature-title">
                    {feature.name}-Level {feature.level}
                  </Typography>
                  <Typography.Text className="class-feature-desc">
                    {formatText(feature.desc)}
                  </Typography.Text>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
