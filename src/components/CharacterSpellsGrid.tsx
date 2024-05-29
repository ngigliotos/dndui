import { Button, Checkbox, Col, Row } from "antd";
import CharacterSpell from "./CharacterSpell";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

export function CharacterSpellsGrid(props: {
  spells: {
    [id: string]: ISpell;
  };
  spellOptions: {
    value: string;
    label: string;
  }[];
  methods: UseFormReturn<ICharacter, any, undefined>;
  currClassName: string;
}) {
  const watchSpells = props.methods.watch("spells");
  const [onlyShowClassSpells, setOnlyShowClassSpells] = useState<boolean>(true);

  return (
    <div style={{ paddingBottom: "175px" }}>
      <Checkbox
        className="spells-filter-checkbox"
        type="checkbox"
        checked={onlyShowClassSpells}
        onClick={(e) => {
          setOnlyShowClassSpells(!onlyShowClassSpells);
        }}
      >
        Only show spells for my class
      </Checkbox>

      <Row className="char-spell-row-container">
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="0"
            suffix=""
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="4"
            suffix="th"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="7"
            suffix="th"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
      </Row>
      <Row className="char-spell-row-container">
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="1"
            suffix="st"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="5"
            suffix="th"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="8"
            suffix="th"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
      </Row>
      <Row className="char-spell-row-container">
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="2"
            suffix="nd"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="6"
            suffix="th"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="9"
            suffix="th"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
      </Row>
      <Row className="char-spell-row-container">
        <Col span={8}>
          <CharacterSpell
            spellOptions={props.spellOptions}
            spells={props.spells}
            spellLevel="3"
            suffix="rd"
            methods={props.methods}
            watchSpells={watchSpells}
            onlyShowClassSpells={onlyShowClassSpells}
            currClassName={props.currClassName}
          ></CharacterSpell>
        </Col>
      </Row>
    </div>
  );
}

export default CharacterSpellsGrid;
