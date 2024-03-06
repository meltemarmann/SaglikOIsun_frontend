import React from 'react';

const FormInput = ({ label, type, name, value, onChange, step, min, required }) => {
  return (
    <div className="col">
        <label className="form-label">{label}:</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          step={step}
          min={min}
          required={required}
        />
    </div>
  );
};

export default FormInput;
