import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";

const DoctorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    speciality: "",
    gender: "",
    background: "",
    birth_date: "",
    start_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );
    console.log(filteredFormData);
    console.log(formData);
    const apiUrl = "http://127.0.0.1:8000/api/doctor/update";
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(filteredFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update doctor details");
      }
      onSubmit();
    } catch (error) {
      console.error("Error updating doctor details:", error.message);
    }
  };

  const specialityOptions = [
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

  const genderOptions = [
    { value: "1", label: "Erkek" },
    { value: "2", label: "Kadın" },
  ];

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="custom-header">
        <h2>Doktor Profil Detayları</h2>
      </div>
      <div className="row mb-4">
        <FormInput
          label="Ad"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required={true}
        />
        <FormInput
          label="Soyad"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required={true}
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Uzmanlık Alanı"
          options={specialityOptions}
          onChange={(value) => handleSelectChange("speciality", value)}
        />
        <FormSelect
          label="Cinsiyet"
          options={genderOptions}
          onChange={(value) => handleSelectChange("gender", value)}
        />
      </div>
      <div className="row mb-4">
        <FormInput
          label="Doğum Tarihi"
          type="date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleInputChange}
        />
        <FormInput
          label="Başlama Tarihi"
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Özgeçmiş"
          name="background"
          id="background"
          rows="3"
          value={formData.background}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <div className="col">
          <button type="submit">Kaydet</button>
        </div>
      </div>
    </form>
  );
};

export default DoctorForm;
