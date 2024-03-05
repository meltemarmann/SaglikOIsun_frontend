import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";

const DoctorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    specialty: "",
    background: "",
    start_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name, selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const specialtyOptions = [
    { value: "1", label: "Dermatologist" },
    { value: "2", label: "Cardiologist" },
    { value: "3", label: "Psychiatrist" },
    { value: "4", label: "Neurologist" },
    { value: "5", label: "Gynecologist" },
    { value: "6", label: "Oncologist" },
    { value: "7", label: "Pediatrician" },
    { value: "8", label: "Endocrinologist" },
    { value: "9", label: "Gastroenterologist" },
    { value: "10", label: "Urologist" },
    { value: "11", label: "Orthopedist" },
    { value: "12", label: "Ophthalmologist" },
    { value: "13", label: "Otolaryngologist" },
    { value: "14", label: "Pulmonologist" },
    { value: "15", label: "Rheumatologist" },
    { value: "16", label: "Nephrologist" },
    { value: "17", label: "Hematologist" },
    { value: "18", label: "Infectious Disease Specialist" },
    { value: "19", label: "Allergist" },
    { value: "20", label: "Anesthesiologist" },
    { value: "21", label: "Radiologist" },
    { value: "22", label: "Pathologist" },
    { value: "23", label: "Emergency Medicine Specialist" },
  ];

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="custom-header">
        <h2>Profil Detayları</h2>
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Specialty"
          options={specialtyOptions}
          onChange={(value) => handleSelectChange("specialty", value)}
        />
        <FormTextArea
          label="Background"
          name="background"
          id="background"
          rows="5"
          value={formData.background}
          onChange={handleInputChange}
        />
        <FormInput
          label="Start Date"
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <div className="col">
          <button type="submit">
            Kaydet
          </button>
        </div>
      </div>
    </form>
  );
};

export default DoctorForm;
