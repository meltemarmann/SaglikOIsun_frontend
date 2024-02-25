import React, { useState } from "react";
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    blood_type: "",
    allergies: "",
    medications: "",
    general_health: "",
    checkup: "",
    exercise: "",
    heart_disease: false,
    skin_cancer: false,
    other_cancer: false,
    depression: false,
    diabetes: false,
    arthritis: false,
    sex: false,
    age_category: false,
    bmi: false,
    smoking_history: false,
    alcohol_consumption: false,
    fruit_consumption: false,
    green_vegetable_consumption: false,
    fried_potato_consumption: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any validation before calling the onSubmit callback
    onSubmit(formData);
  };

  const bloodTypeOptions = [
    { value: "1", label: "A+" },
    { value: "2", label: "A-" },
    { value: "3", label: "B+" },
    { value: "4", label: "B-" },
    { value: "5", label: "AB+" },
    { value: "6", label: "AB-" },
    { value: "7", label: "O+" },
    { value: "8", label: "O-" },
  ];

  const genderOptions = [
    { value: "1", label: "Erkek" },
    { value: "2", label: "Kadın" },
  ];

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="custom-header">
        <h2>Profil Detayları</h2>
      </div>
      <div className="row mb-4">
        <FormInput
          label="Boy(m)"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          step="0.01"
          min="0"
        />
        <FormInput
          label="Kilo(kg)"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          min="0"
        />
        <FormInput
          label="Yaş"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          min="0"
        />
      </div>
      <div className="row mb-4">
        <FormSelect label="Kan Grubu" options={bloodTypeOptions} />
        <FormSelect label="Cinsiyet" options={genderOptions} />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Alerjiler"
          type="text"
          name="allergies"
          id="allergies"
          rows="1"
          value={formData.allergies}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Kullandığınız İlaçlar"
          type="text"
          name="medications"
          id="medications"
          rows="1"
          value={formData.medications}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Genel Sağlık Durumu"
          type="text"
          name="general_health"
          id="general_health"
          rows="1"
          value={formData.general_health}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Son Kontrol"
          type="text"
          name="checkup"
          id="checkup"
          rows="1"
          value={formData.checkup}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Yapılan Egzersizler"
          type="text"
          name="exercise"
          id="exercise"
          rows="1"
          value={formData.exercise}
          onChange={handleInputChange}
        />
      </div>
      
      <button type="submit">Kaydet</button>
    </form>
  );
};

export default HealthForm;
