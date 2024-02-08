import React from "react";

const CustomSelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
     className="flex flex-col flex-wrap w-full cursor-default border-gray-300 rounded"
      value={JSON.stringify(value)}
      onChange={(e) => onChange(JSON.parse(e.target.value))}
    >
      {/* <option disabled selected value="">{defaultValue}</option> */}
      {options.map((option) => (
        <option key={option.key} value={JSON.stringify(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
