import ExtraStat from "./ExtraStat";
import HealthBar from "./HealthBar";
import { Button, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import { Controller, UseFormReturn } from "react-hook-form";
import { useMemo } from "react";

interface ITableAttackEntry extends IAttack {
  id: number;
}

export function ExtraInfo(props: {
  initialCharacter: ICharacter;
  methods: UseFormReturn<ICharacter, any, undefined>;
}) {
  const watchAttackData = props.methods.watch("attacks");

  const attackTableData = useMemo(
    () =>
      watchAttackData
        ? watchAttackData.map((data, index) => {
            return { ...data, id: index };
          })
        : [],
    [watchAttackData]
  );

  const options: ColumnProps<ITableAttackEntry>[] = [
    {
      title: (
        <Typography.Text className="attack-title">
          Weapon Or Spell
        </Typography.Text>
      ),
      dataIndex: "method",
      key: "method",
      render: (text, record, index) => (
        <Controller
          name={`attacks.${index}.method`}
          {...props.methods}
          render={({ field }) => (
            <TextArea
              {...field}
              spellCheck="false"
              className="weapon-table-input"
              autoSize
            />
          )}
        />
      ),
    },
    {
      title: <Typography.Text className="attack-title">To Hit</Typography.Text>,
      dataIndex: "toHit",
      key: "toHit",
      render: (text, record, index) => (
        <Controller
          name={`attacks.${index}.toHit`}
          {...props.methods}
          render={({ field }) => (
            <TextArea
              {...field}
              spellCheck="false"
              className="table-input"
              autoSize
            />
          )}
        />
      ),
    },
    {
      title: (
        <Typography.Text className="attack-title">Damage Dealt</Typography.Text>
      ),
      dataIndex: "damage",
      key: "damage",
      render: (text, record, index) => (
        <Controller
          name={`attacks.${index}.damage`}
          {...props.methods}
          render={({ field }) => (
            <TextArea
              {...field}
              spellCheck="false"
              className="table-input"
              autoSize
            />
          )}
        />
      ),
    },
  ];

  return (
    <div className="hp-stat-attack-container">
      <div className="extra-stats">
        <ExtraStat
          methods={props.methods}
          label="Initiative"
          name="initiative"
          classStarter="init"
        ></ExtraStat>
        <ExtraStat
          methods={props.methods}
          label="Armor Class"
          name="armorClass"
          classStarter="ac"
        ></ExtraStat>
        <ExtraStat
          methods={props.methods}
          label="Move Speed"
          name="moveSpeed"
          classStarter="move"
        ></ExtraStat>
      </div>
      <HealthBar methods={props.methods}></HealthBar>
      <div className="table-container">
        <Table
          className="table-attack"
          dataSource={attackTableData}
          columns={options}
          pagination={false}
          rowKey={(obj, index) => `${obj.id}`}
        ></Table>
      </div>

      <Button
        className="attack-add-button"
        onClick={() => {
          props.methods.setValue("attacks", [
            ...watchAttackData,
            {
              method: "",
              toHit: "",
              damage: "",
            },
          ]);
        }}
      >
        Add Attack
      </Button>
      <Button
        className="attack-remove-button"
        onClick={() => {
          if (watchAttackData.length > 0) {
            let newData = [...watchAttackData];
            newData.pop();
            props.methods.setValue("attacks", newData);
          }
        }}
      >
        Remove Attack
      </Button>
    </div>
  );
}
