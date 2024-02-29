import React from "react";

const FormTextArea = ({ label, name, id, rows, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea
        className="form-control"
        name={name}
        type="text"
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default FormTextArea;