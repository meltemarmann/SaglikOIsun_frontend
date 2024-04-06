import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";

const DoctorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    speciality: "",
    hospital: "",
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
    { value: "Dermatolog", label: "Dermatolog" },
    { value: "Kardiyolog", label: "Kardiyolog" },
    { value: "Nörolog", label: "Nörolog" },
    { value: "Psikiyatrist", label: "Psikiyatrist" },
    { value: "Ortopedist", label: "Ortopedist" },
    { value: "Pediatri", label: "Pediatri" },
    { value: "Göz Hastalıkları Uzmanı", label: "Göz Hastalıkları Uzmanı" },
    { value: "Jinekolog", label: "Jinekolog" },
    { value: "Ürolog", label: "Ürolog" },
    { value: "Onkolog", label: "Onkolog" },
    { value: "Endokrinolog", label: "Endokrinolog" },
    { value: "Gastroenterolog", label: "Gastroenterolog" },
    { value: "Nefrolog", label: "Nefrolog" },
    { value: "Pulmonolog", label: "Pulmonolog" },
    { value: "Romatolog", label: "Romatolog" },
    { value: "Hematolog", label: "Hematolog" },
    { value: "Alerji Uzmanı", label: "Alerji Uzmanı" },
    { value: "Anestezi Uzmanı", label: "Anestezi Uzmanı" },
    { value: "Radyolog", label: "Radyolog" },
    { value: "Patolog", label: "Patolog" },
    { value: "Pratisyen Hekim", label: "Pratisyen Hekim" },
    { value: "Cerrah", label: "Cerrah" },
    { value: "İç Hastalıkları Uzmanı", label: "İç Hastalıkları Uzmanı" },
    { value: "Aile Hekimi", label: "Aile Hekimi" },
    { value: "Diğer", label: "Diğer" },
  ];

  const genderOptions = [
    { value: "Erkek", label: "Erkek" },
    { value: "Kadın", label: "Kadın" },
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
        <FormInput
          label="Hastane"
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleInputChange}
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
