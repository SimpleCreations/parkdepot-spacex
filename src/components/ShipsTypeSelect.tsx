import React, { memo, PropsWithChildren } from "react";
import FormSelect from "react-bootstrap/FormSelect";

const ShipsTypeSelect = ({
  options,
  value,
  onChange,
}: PropsWithChildren<{
  options: string[];
  value?: string | null;
  onChange: (value?: string) => void;
}>) => (
  <FormSelect
    className="w-auto"
    value={value ?? ""}
    onChange={({ target }) =>
      onChange(target.value !== "" ? target.value : undefined)
    }
  >
    <option value="">Any type</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </FormSelect>
);

export default memo(ShipsTypeSelect);
