import React from "react";
import Select from "react-select";

const selectStyles = {
  control: (base) => ({
    ...base,
    direction: "rtl",
    textAlign: "right",
  }),
  menu: (base) => ({
    ...base,
    direction: "rtl",
    textAlign: "right",
    zIndex: 9999,
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#d0e9ff",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#003f7f",
  }),
};

const SelectBox = ({ options, value, onChange, placeholder, isMulti = false, isClearable = true, ...props }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      isClearable={isClearable}
      placeholder={placeholder}
      noOptionsMessage={() => "موردی یافت نشد"}
      classNamePrefix="react-select"
      styles={selectStyles}
      {...props}
    />
  );
};

export default SelectBox;
