import { Input } from "antd";
import { Controller } from "react-hook-form";

export function ExtraStat(props: {
  classStarter: string;
  label: string;
  name: string;
  methods: any;
}) {
  return (
    <div className="extra-stat-parent-div">
      <div className={`${props.classStarter}-name`}>{props.label}</div>

      <img className={`${props.classStarter}-image`} alt="Example" />
      <div className={`${props.classStarter}-input-container`}>
        <Controller
          name={props.name}
          {...props.methods}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              className={`${props.classStarter}-input`}
            />
          )}
        />
      </div>
    </div>
  );
}

export default ExtraStat;
