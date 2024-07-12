import { Input, InputRef } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

export function Suggestions(props: {
  options: string[];
  inputValue: string;
  className?: string;
  onSelect: (value: string) => void;
  filterFunction: (value: string) => void;
  enterFunction?: (e: React.KeyboardEvent<HTMLInputElement>) => boolean;
  methods: UseFormReturn<ICharacter, any, undefined>;
  shouldCapHeight?: boolean;
  name?: string;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<InputRef>(null);

  return (
    <>
      <Input
        className={props.className ? props.className : undefined}
        ref={inputRef}
        onFocus={(e) => setShowSuggestions(true)}
        onBlur={(e) => {
          if (props.name) props.methods.setValue("class", e.target.value);
          if (!(e.relatedTarget?.tagName.toLowerCase() === "li")) {
            setShowSuggestions(false);
          }
        }}
        onClick={(e) => {
          props.filterFunction(e.currentTarget.value);

          setShowSuggestions(true);
        }}
        value={props.inputValue}
        onChange={(e) => {
          props.filterFunction(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === "enter") {
            if (props.enterFunction) {
              setShowSuggestions(props.enterFunction(e));
            } else setShowSuggestions(false);
          }
        }}
      ></Input>

      {showSuggestions && (
        <ul
          className={props.shouldCapHeight ? "suggestions-max" : "suggestions"}
        >
          {props.options.map((suggestion) => {
            return (
              <li
                tabIndex={0}
                key={suggestion}
                onClick={(e) => {
                  props.onSelect(e.currentTarget.innerText);
                  inputRef.current?.focus();
                }}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Suggestions;
