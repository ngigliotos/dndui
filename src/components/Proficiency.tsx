import { Checkbox, Input } from "antd";
import {
  savingThrowProficiencies,
  skillProficiencyObjs,
} from "../constants/proficiencies";
import { Controller, UseFormReturn } from "react-hook-form";

export function Proficiency(props: {
  methods: UseFormReturn<ICharacter, any, undefined>;
}) {
  return (
    <div>
      <div className="prof-num-container">
        <Controller
          name="proficiencyBonus"
          {...props.methods}
          render={({ field }) => (
            <Input {...field} type="number" className="prof-num-input" />
          )}
        />
        <div className="prof-num-label">Proficiency Bonus</div>
      </div>
      <label className="prof-label">Saving Throws</label>
      <div className="prof-checkbox-container">
        {savingThrowProficiencies.map((prof) => (
          <Controller
            key={`savingThrowProfs.${prof}`}
            name={`savingThrowProfs.${prof}`}
            {...props.methods}
            render={({ field }) => (
              <Checkbox
                {...field}
                key={`prof-chekbox-${prof}`}
                className="prof-checkboxes"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              >
                {prof.charAt(0).toUpperCase() + prof.slice(1, prof.length)}
              </Checkbox>
            )}
          />
        ))}
      </div>
      <label className="prof-label">Proficiencies</label>

      <div className="prof-checkbox-container" tabIndex={0}>
        {skillProficiencyObjs.map((prof) => (
          <Controller
            key={`skillProfs.${prof.value}`}
            name={`skillProfs.${prof.value}`}
            {...props.methods}
            render={({ field }) => (
              <Checkbox
                {...field}
                tabIndex={0}
                key={`prof-chekbox-${prof.value}`}
                className="prof-checkboxes"
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              >
                {prof.label}
              </Checkbox>
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default Proficiency;
