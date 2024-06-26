import { Button, Checkbox, List } from "antd";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { charactersSlice } from "../store/Characters";
import { useAppDispatch } from "../store/store";

export function SpellDropdown(props: {
  spell: ISpell;
  methods: UseFormReturn<ICharacter, any, undefined>;
}) {
  const dispatch = useAppDispatch();
  const [expandDropdown, setExpandDropdown] = useState(false);
  //Can probably pass this down from parent, but just to be safe I did it like this
  const watchSpells = props.methods.watch("spells");
  return (
    <div>
      <List.Item
        className="char-spell-list-item"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div className="char-spell-check-name">
          <Checkbox></Checkbox>

          <Button
            className="char-spell-list-item-button"
            onClick={(e) => setExpandDropdown(!expandDropdown)}
          >
            {props.spell.name}
          </Button>
          <Button
            className="char-spell-list-remove-button"
            onClick={(e) => {
              let char = props.methods.getValues();
              char.spells = watchSpells.filter(
                (spell) =>
                  spell.toLowerCase() !== props.spell.name.toLowerCase()
              );
              dispatch(charactersSlice.actions.addCharacter(char));
              props.methods.setValue("spells", char.spells);
            }}
          >
            X
          </Button>
        </div>
        {expandDropdown && (
          <p className="char-spell-desc">
            {props.spell.desc
              .replace(/{@.*? /g, "")
              .replace(/\|.*?}/g, "")
              .replace("}", "")}
          </p>
        )}
      </List.Item>
    </div>
  );
}

export default SpellDropdown;
