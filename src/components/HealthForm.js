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
    heart_disease: "",
    skin_cancer: "",
    other_cancer: "",
    depression: "",
    diabetes: "",
    arthritis: "",
    sex: "",
    age_category: "",
    bmi: "",
    smoking_history: "",
    alcohol_consumption: "",
    fruit_consumption: "",
    green_vegetable_consumption: "",
    fried_potato_consumption: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          name="age_category"
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
