import { Alert, Button, Input, Modal, Space, Typography } from "antd";
import StatBlock from "../components/StatBlock";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  charactersSlice,
  fetchCharacters,
  selectCharacters,
  selectSpecificCharacter,
} from "../store/Characters";
import { useSelector } from "react-redux";
import { RootState, store, useAppDispatch } from "../store/store";
import LabeledInput from "../components/LabeledInput";
import ROUTES from "../constants/routes";
import { emptyCharacter } from "../store/Characters/reducers";

import TextArea from "antd/es/input/TextArea";
import { Proficiency } from "../components/Proficiency";

import React, { useEffect, useState } from "react";
import { ExtraInfo } from "../components/ExtraInfo";
import { useSelectSpells } from "../store/Spells";

import CharacterSpellsGrid from "../components/CharacterSpellsGrid";
import { selectClasses } from "../store/Classes";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Suggestions from "../components/Suggestions";
import { ExportOutlined } from "@ant-design/icons";

export function Character(props: {
  characters: { [key: string]: ICharacter };
}) {
  const DIRECTORY = "./saved/characters";

  const params: { id?: string } = useParams();

  const fs = window.require("fs");
  const navigate = useNavigate();

  const character = params.id ? props.characters[params.id] : undefined;

  const initialCharacter = {
    ...emptyCharacter,
    ...character,
  };

  const methods = useForm<ICharacter>({ reValidateMode: "onSubmit" });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    watch,
  } = methods;

  useEffect(() => {
    let initialCharacter = {
      ...emptyCharacter,
      ...character,
    };
    reset(initialCharacter);
  }, [character, emptyCharacter, reset]);

  const onSubmit = handleSubmit((data) => {
    if (!data.id) {
      while (data.id === undefined || data.id in props.characters) {
        data.id = Math.ceil(Math.random() * 10000000).toString();
      }
    }
    if (!fs.existsSync(DIRECTORY)) {
      fs.mkdirSync(DIRECTORY, { recursive: true });
    }
    fs.writeFileSync(
      `./saved/characters/${data.id}.json`,
      JSON.stringify(data)
    );
    navigate(`${ROUTES.character}/${data.id}`);
    dispatch(fetchCharacters())
      .unwrap()
      .catch(async (e) => {
        return true;
      });
  });

  const deleteCharacter = (id: string) => {
    fs.unlinkSync(`./saved/characters/${id}.json`);
    dispatch(charactersSlice.actions.removeCharacter(id));
  };

  const watchHasSpells = watch("hasSpells");
  const watchClass = watch("class");

  const spells = useSelectSpells();
  const [spellOptions] = React.useState(
    () => store.getState().spells.spellOptions
  );
  const classes = useSelector(selectClasses);
  const [classOptions, setClassOptions] = useState<string[]>([]);
  const [currClass, setCurrClass] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useAppDispatch();

  //This complex class control flow exists because without it, the
  //input component is laggy.
  const onClassSelect = (value: string) => {
    setCurrClass(value);
    setClassOptions(
      Object.keys(classes).filter(
        (classItem) => classItem.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    );
  };

  useEffect(() => {
    setCurrClass(watchClass);
    if (watchClass) {
      setClassOptions(
        Object.keys(classes).filter(
          (classItem) =>
            classItem.toLowerCase().indexOf(watchClass.toLowerCase()) > -1
        )
      );
    }
  }, [watchClass]);

  return (
    <div className="page-container">
      <div className="name-level-container">
        <LabeledInput
          methods={methods}
          type="string"
          labelName="Character Name"
          name="name"
          className="name-input"
        ></LabeledInput>
        <div className="input-with-label">
          <div className="class-link-container">
            <label>Class</label>
            <Link
              to={`${ROUTES.classInfo}/${classes[
                getValues("class")
              ]?.name.toLowerCase()}`}
            >
              <Button
                type="text"
                disabled={
                  !Object.keys(classes).find(
                    (className) =>
                      classes[className].name.toLowerCase() ===
                      getValues("class")
                  )
                }
                size="small"
                icon={<ExportOutlined />}
              />
            </Link>
          </div>

          <div style={{ display: "block" }}>
            <Suggestions
              methods={methods}
              options={classOptions}
              inputValue={currClass}
              onSelect={onClassSelect}
              filterFunction={onClassSelect}
              className="class-input"
              name="class"
            ></Suggestions>
          </div>
        </div>
        <LabeledInput
          type="string"
          labelName="Race"
          name="race"
          className="class-input"
          methods={methods}
        ></LabeledInput>
        <LabeledInput
          type="number"
          labelName="Level"
          name="level"
          className="level-input"
          methods={methods}
          onChange={(e) => {
            setValue(
              "proficiencyBonus",
              Math.ceil(e.target.valueAsNumber / 4) + 1
            );
          }}
        ></LabeledInput>
        <div className="checkbox-with-label">
          <label>Toggle Spells</label>
          <Button
            className="add-spells-button"
            onClick={(e) => setValue("hasSpells", !getValues("hasSpells"))}
          >
            {watchHasSpells ? "Hide spells" : "Show spells"}
          </Button>
        </div>
      </div>
      <div className="middle-container">
        <div className="stat-block-container">
          <StatBlock methods={methods} statName="Strength"></StatBlock>
          <StatBlock methods={methods} statName="Dexterity"></StatBlock>
          <StatBlock methods={methods} statName="Constitution"></StatBlock>
          <StatBlock methods={methods} statName="Wisdom"></StatBlock>
          <StatBlock methods={methods} statName="Intelligence"></StatBlock>
          <StatBlock methods={methods} statName="Charisma"></StatBlock>
        </div>
        <Proficiency methods={methods}></Proficiency>
        <ExtraInfo
          methods={methods}
          initialCharacter={initialCharacter}
        ></ExtraInfo>

        <TextArea
          className="character-text"
          autoSize
          placeholder="Enter any character details"
        ></TextArea>
      </div>
      {watchHasSpells && (
        <CharacterSpellsGrid
          spells={spells}
          spellOptions={spellOptions}
          methods={methods}
          currClassName={getValues("class")}
        ></CharacterSpellsGrid>
      )}
      <Button
        className="char-submit-button"
        onClick={() => {
          onSubmit();
        }}
      >
        Save Character
      </Button>
      <Button
        className="char-delete-button"
        onClick={() => {
          if (!showDeleteModal) setShowDeleteModal(true);
        }}
      >
        Delete Character
      </Button>
      <Modal
        width={"600px"}
        title={`Are you sure you want to delete ${character?.name}?`}
        okText={<Typography.Text>Yes, destroy it</Typography.Text>}
        cancelText={<Typography.Text>No</Typography.Text>}
        open={showDeleteModal}
        onCancel={(e) => setShowDeleteModal(false)}
        onOk={(e) => {
          setShowDeleteModal(false);
          if (character && character.id) {
            deleteCharacter(character.id);
            navigate(`${ROUTES.character}`);
          } else alert("This character has not been saved yet!!!");
        }}
      ></Modal>
    </div>
  );
}

export default Character;
