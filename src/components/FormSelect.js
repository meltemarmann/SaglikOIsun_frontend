import React from "react";

const FormSelect = ({ label, options, onChange }) => {
  return (
    <div className="col">
      <div className="form-group">
        <select
          onChange={(e) => onChange(e.target.value)}
          className="form-select"
          defaultValue=""
        >
          <option disabled value="">
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormSelect;
