import { Select } from "antd";
import React from "react";

const InputCustom = ({
  id,
  label,
  placeholder,
  className = "",
  name,
  onChange,
  error,
  touched,
  onBlur,
  readOnly,
  options,
  setFieldValue,
  value
}) => {
  return (
    <div className="flex">
      <label
        htmlFor={id}
        className="block mb-2 mt-2 text-sm font-medium text-gray-900 w-1/4 text-right pr-5"
      >
        {label}
      </label>
      <div className="w-full">
        <Select
          defaultValue={value}
          style={{
            width: "50%",
          }}
          options={options}
          // value={value}
          onSelect={(value) => {
            setFieldValue(name, value);
          }}
        />

        {error && touched ? (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default InputCustom;
