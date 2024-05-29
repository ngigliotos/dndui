import { Button, Input, Table, Typography } from "antd";
import { fetchSpells } from "../store/Spells/slice";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { ColumnProps } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import { text } from "stream/consumers";
import { Tuple } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { classes } from "../constants/classes";
import { useSelectSpells } from "../store/Spells";

export function Spells() {
  const PAGELIMIT = 15;
  const dispatch = useAppDispatch();
  const spells = useSelectSpells();
  const [filteredWord, setFilteredWord] = useState("");

  const filteredSpells = () => {
    return Object.values(spells).filter((spell) =>
      spell.name.toLowerCase().includes(filteredWord.toLowerCase())
    );
  };

  const options: ColumnProps<ISpell>[] = [
    {
      title: <Typography.Text className="spell-title">Level</Typography.Text>,
      dataIndex: "",
      key: "level",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => Number(a.level) - Number(b.level),
        multiple: 2,
      },
      render: (text, record) => (record.level === "0" ? "Cantrip" : text),
      filters: [
        { text: "Cantrip", value: "0" },
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
        { text: "5", value: "5" },
        { text: "6", value: "6" },
        { text: "7", value: "7" },
        { text: "8", value: "8" },
        { text: "9", value: "9" },
      ],
      onFilter: (value, record) => {
        return record.level === value;
      },
    },
    {
      title: <Typography.Text className="spell-title">Name</Typography.Text>,
      dataIndex: "name",
      key: "name",
      defaultSortOrder: "ascend",
      sorter: { compare: (a, b) => a.name.localeCompare(b.name), multiple: 1 },
    },
    {
      title: (
        <Typography.Text className="spell-title">Duration</Typography.Text>
      ),
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: (
        <Typography.Text className="spell-title">Concentration</Typography.Text>
      ),
      dataIndex: "requires_concentration",
      key: "concentration",
      render: (text, record) =>
        record.concentration ? "Concentration" : "Not Concentration",
    },
    {
      title: <Typography.Text className="spell-title">Range</Typography.Text>,
      dataIndex: "range",
      key: "range",
    },
    {
      title: (
        <Typography.Text className="spell-title">Casting Time</Typography.Text>
      ),
      dataIndex: "casting_time",
      key: "casting_time",
      render: (text, record) =>
        record.casting_time.unit === "bonus"
          ? "Bonus Action"
          : `${record.casting_time.unit
              .charAt(0)
              .toUpperCase()}${record.casting_time.unit.slice(1)}`,
    },
    {
      title: <Typography.Text className="spell-title">Ritual</Typography.Text>,
      dataIndex: "ritual",
      key: "ritual",
      render: (text, record) =>
        record.ritual ? "Ritual" : "Cannot be a ritual",
    },
    {
      title: <Typography.Text className="spell-title">School</Typography.Text>,
      dataIndex: "school",
      key: "school",
      render: (text, record) => record.school,
    },
    {
      title: <Typography.Text className="spell-title">Classes</Typography.Text>,
      dataIndex: "dnd_class",
      key: "classes",
      render: (text, record) => record.classes.join(", "),
      filters: classes,
      onFilter: (value, record) => {
        return record.classes.includes(value as ClassNames);
      },
    },
    {
      title: <Typography.Text className="spell-title">Damage</Typography.Text>,
      dataIndex: "damage",
      key: "damage",
    },
  ];
  const replaceDamage = (desc: string) => {
    let splitdesc = desc.split(/{([^}]*)}/);
    let parsedDesc: (JSX.Element | string)[] = [];
    splitdesc.forEach((value) => {
      if (value.startsWith("@damage ")) {
        let damageStr = value.split(" ")[1];
        parsedDesc.push(<a className="stand-out-text">{damageStr}</a>);
      } else {
        parsedDesc.push(value);
      }
    });
    return (
      <p className="spell-dropdown">
        {parsedDesc.map((ele) => {
          return ele;
        })}
      </p>
    );
  };
  return (
    <div className="page-container">
      <Input
        className="spell-filter-input"
        value={filteredWord}
        onChange={(e) => setFilteredWord(e.target.value)}
        placeholder="Type spell name"
      ></Input>
      <Table
        className="spell-table"
        rowKey={(record) => record.name}
        columns={options}
        dataSource={filteredSpells()}
        pagination={{ pageSize: 15 }}
        expandable={{
          expandedRowRender: (record) => replaceDamage(record.desc),
          expandRowByClick: true,
        }}
      ></Table>
    </div>
  );
}
