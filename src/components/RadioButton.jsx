import React from "react";
import { Radio } from "@material-tailwind/react";

const RadioButton = ({id, label, value, name, checked, defaultChecked, onChange}) => {
  return (
    <Radio
        id={id}
        icon={<div className="w-2 h-2 rounded-full bg-red"></div>}
        label={label}
        value={value}
        name={name}
        className="w-4 h-4 checked:border-red"
        containerProps={{ className: "p-2" }}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
    />
  );
};

export default RadioButton;
