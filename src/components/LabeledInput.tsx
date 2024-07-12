import { AutoComplete, Input } from "antd";
import { memo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

const LabeledInput = memo(function LabeledInput(props: {
  labelName: string;
  className?: string;
  name: string;
  type: string;
  methods: UseFormReturn<ICharacter, any, undefined>;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <div className="input-with-label">
      <label>{props.labelName}</label>
      <Controller
        name={props.name}
        {...props.methods}
        render={({ field }) => (
          <Input
            {...field}
            type={props.type}
            className={props.className ? props.className : undefined}
            spellCheck={false}
            onChange={(e) => {
              if (props.onChange) {
                props.onChange(e);
              }
              props.methods.setValue(props.name, e.target.value);
            }}
          ></Input>
        )}
      />
    </div>
  );
});

export default LabeledInput;
