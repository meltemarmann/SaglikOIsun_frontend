import React from 'react';

const FormSelect = ({ label, options }) => {
  return (
    <div className="col">
      <div className="form-group">
        <select className="form-select" aria-label="Default select example">
          <option selected>{label}</option>
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
