import { Input } from "antd";
import { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export function StatBlock(props: {
  statName: string;
  methods: UseFormReturn<ICharacter, any, undefined>;
}) {
  const watchStat = props.methods.watch(
    `abilityScores.${props.statName.toLowerCase()}`
  );
  useEffect(() => {
    const statNameLeft = `${1.2 * -props.statName.length + 39}px`;
    let statObj = document.getElementById(props.statName);
    if (statObj) {
      statObj.style.left = statNameLeft;
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="stat-parent-div">
      <img className="stat-image" alt="Example" />
      <div id={props.statName} className="stat-name">
        {props.statName}
      </div>

      <div className="input-container">
        <Controller
          name={`abilityScores.${props.statName.toLowerCase()}`}
          {...props.methods}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              className="stat-input"
              onChange={(value) => {
                if (value.target.value === "") {
                  props.methods.setValue(value.target.name, 0);
                } else {
                  props.methods.setValue(
                    value.target.name,
                    value.target.valueAsNumber
                  );
                }
              }}
            />
          )}
        />
      </div>
      <div className="small-input-container">
        <Input
          type="number"
          className="small-stat-input"
          value={Math.floor((watchStat - 10) / 2)}
        />
      </div>
    </div>
  );
}

export default StatBlock;
