import { Button, ConfigProvider, Input, List } from "antd";
import SpellDropdown from "./SpellDropdown";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import Suggestions from "./Suggestions";
import { useSelector } from "react-redux";
import { selectClasses } from "../store/Classes";

//Need to memo here because this compnent duplication CHUGS
const CharacterSpell = memo(function CharacterSpellFunc(props: {
  spellLevel: string;
  suffix: string;
  spells: {
    [id: string]: ISpell;
  };
  spellOptions: {
    value: string;
    label: string;
  }[];
  methods: UseFormReturn<ICharacter, any, undefined>;
  watchSpells: string[];
  onlyShowClassSpells: boolean;
  currClassName: string;
}) {
  const classes = useSelector(selectClasses);
  const spells = props.spells;
  const [filteredSpells, setFilteredSpells] = useState<string[]>([]);
  const [currSpellName, setCurrSpellName] = useState<string>("");
  const watchSpells = props.watchSpells;

  const onSpellchange = useCallback(
    (value: string) => {
      setFilteredSpells(
        Object.keys(spells).filter(
          (spell) =>
            spells[spell].level === props.spellLevel &&
            (!props.onlyShowClassSpells ||
              spells[spell].classes.includes(
                props.methods.getValues("class")
              ) ||
              !(props.methods.getValues("class").toLowerCase() in classes)) &&
            spell.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
      setCurrSpellName(value);
    },
    [
      classes,
      props.methods,
      props.onlyShowClassSpells,
      props.spellLevel,
      spells,
    ]
  );
  //Need this to refresh filtered spells before user clicks on dropdown
  //after toggling the checkbox
  useEffect(() => {
    onSpellchange(currSpellName);
  }, [props.onlyShowClassSpells, props.currClassName, currSpellName, onSpellchange]);

  //This is a massive if beneath a filter. It decides which spells we are showing in the
  //spells autocomplete for a character.

  const currSpells = useMemo(
    () =>
      watchSpells
        .filter((spell: string) => spells[spell].level === props.spellLevel)
        .map((spell: string) => {
          return spells[spell];
        }),
    [watchSpells, spells, props.spellLevel]
  );

  const enterFunction = (e: React.KeyboardEvent<HTMLInputElement>): boolean => {
    let value = e.currentTarget.value;
    if (
      value in props.spells &&
      spells[value].level === props.spellLevel &&
      !watchSpells.includes(value)
    ) {
      props.methods.setValue("spells", [...watchSpells, value]);

      setCurrSpellName("");
      return false;
    }
    return true;
  };

  return (
    <div className="char-spell-info-col-last">
      <label className="char-spell-info-label">
        {props.spellLevel === "0"
          ? "Cantrips"
          : `${props.spellLevel}${props.suffix} level spells`}
      </label>
      <div className="char-spell-row-totals">
        <div className="char-max-spell-container">
          <label className="spell-slots">Max Spell slots: </label>
          <Controller
            name={`spellSlots[${props.spellLevel}].max`}
            {...props.methods}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                className="char-spell-max-input"
              ></Input>
            )}
          />
        </div>
        <div className="char-max-spell-container">
          <label className="spell-slots">Current Spell slots: </label>
          <Controller
            name={`spellSlots[${props.spellLevel}].current`}
            {...props.methods}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                className="char-spell-max-input"
              ></Input>
            )}
          />
        </div>
      </div>
      <div className="char-add-new-spell">
        <label>Add Spell: </label>
        <div style={{ width: "73.5%" }}>
          <Suggestions
            filterFunction={onSpellchange}
            options={filteredSpells}
            inputValue={currSpellName}
            onSelect={onSpellchange}
            enterFunction={enterFunction}
            methods={props.methods}
            shouldCapHeight={true}
          ></Suggestions>
        </div>
        <Button
          className="char-add-spell-button"
          onMouseDown={(e) => {
            if (
              currSpellName in spells &&
              spells[currSpellName].level === props.spellLevel &&
              !watchSpells.includes(currSpellName)
            ) {
              props.methods.setValue("spells", [...watchSpells, currSpellName]);
              setCurrSpellName("");
            }
          }}
        >
          Add
        </Button>
      </div>
      <ConfigProvider renderEmpty={() => <></>}>
        <List
          dataSource={currSpells}
          renderItem={(item: ISpell) => (
            <SpellDropdown
              key={item.name}
              methods={props.methods}
              spell={item}
            ></SpellDropdown>
          )}
        ></List>
      </ConfigProvider>
    </div>
  );
});

export default CharacterSpell;
