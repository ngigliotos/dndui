import { Input } from "antd";
import { Controller, UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectClasses } from "../store/Classes";

export function HealthBar(props: {
  methods: UseFormReturn<ICharacter, any, undefined>;
}) {
  const watchCurrHealth = props.methods.watch("currHealth");
  const watchMaxHealth = props.methods.watch("maxHealth");
  const watchTempHealth = props.methods.watch("tempHealth");
  const classes = useSelector(selectClasses);
  const currClass: string | undefined = props.methods.getValues("class");
  const healthBarPercentageCalc = () => {
    let health =
      watchCurrHealth > 0 ? (watchCurrHealth / watchMaxHealth) * 100 : 0;
    if (health > 100) return 100;

    return health;
  };

  const updateHealth = (value: number, add: boolean = true) => {
    if (add) {
      if (watchCurrHealth + value > watchMaxHealth) {
        props.methods.setValue("currHealth", watchMaxHealth);
      } else {
        props.methods.setValue("currHealth", watchCurrHealth + value);
      }
    } else {
      if (watchTempHealth) {
        if (watchTempHealth >= value) {
          props.methods.setValue("tempHealth", watchTempHealth - value);
          return;
        }
        props.methods.setValue("tempHealth", 0);
        value = value - watchTempHealth;
      }
      props.methods.setValue("currHealth", watchCurrHealth - value);
    }
  };

  const healthBarPercentage = healthBarPercentageCalc();
  return (
    <div>
      <label className="prof-label">Health</label>
      <div className="hp-outer-container">
        <div className="hp-inner-container">
          Max HP
          <Controller
            name={"maxHealth"}
            {...props.methods}
            render={({ field }) => (
              <Input {...field} type="number" className="hp-input"></Input>
            )}
          />
        </div>
        <div className="hp-inner-container">
          Current HP
          <Controller
            name={"currHealth"}
            {...props.methods}
            render={({ field }) => (
              <Input {...field} type="number" className="hp-input"></Input>
            )}
          />
        </div>
        <div className="hp-inner-container">
          Temporary HP
          <Controller
            name={"tempHealth"}
            {...props.methods}
            render={({ field }) => (
              <Input {...field} type="number" className="hp-input"></Input>
            )}
          />
        </div>
      </div>
      <div className="hp-bar-container">
        <div className="outer-bar">
          <div
            className="inner-bar"
            style={{ width: `${healthBarPercentage}%` }}
          ></div>

          <div className="hp-percentage">
            {Math.round(healthBarPercentage * 10) / 10}%
          </div>
        </div>
      </div>
      <div className="hp-damage-calc-container">
        <div className="hp-damage-taken">
          Enter Damage Taken
          <Input
            type="number"
            className="hp-input"
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                updateHealth(Math.abs(e.currentTarget.valueAsNumber), false);
              }
            }}
          ></Input>
        </div>
        <div className="hp-hit-die-container">
          Remaining Hit Die{"\n"}{" "}
          <span className="hp-hit-die">
            {currClass && classes[currClass.toLowerCase()]
              ? `(d${classes[currClass.toLowerCase()].hdFace})`
              : ""}
          </span>
          <div>
            <Controller
              name={"remainingHitDie"}
              {...props.methods}
              render={({ field }) => (
                <Input {...field} className="hp-hit-die-input"></Input>
              )}
            />
          </div>
        </div>
        <div className="hp-healed">
          Enter Amount Healed
          <Input
            type="number"
            className="hp-input"
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                updateHealth(Math.abs(e.currentTarget.valueAsNumber), true);
              }
            }}
          ></Input>
        </div>
      </div>
    </div>
  );
}

export default HealthBar;
