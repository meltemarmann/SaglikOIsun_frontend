import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";

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
    smoking_history: "",
    alcohol_consumption: "",
    fruit_consumption: "",
    green_vegetable_consumption: "",
    fried_potato_consumption: "",
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
          label="Boy(cm)"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
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
        <FormSelect
          label="Kan Grubu"
          options={bloodTypeOptions}
          onChange={(selectedValue) =>
            handleSelectChange("blood_type", selectedValue)
          }
        />
        <FormSelect
          label="Cinsiyet"
          options={genderOptions}
          onChange={(selectedValue) => handleSelectChange("sex", selectedValue)}
        />
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
      <div className="row mb-4">
        <FormTextArea
          label="Kalp Hastalığı"
          name="heart_disease"
          id="heart_disease"
          rows="1"
          value={formData.heart_disease}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Cilt Kanseri"
          name="skin_cancer"
          id="skin_cancer"
          rows="1"
          value={formData.skin_cancer}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Diğer Kanser"
          name="other_cancer"
          id="other_cancer"
          rows="1"
          value={formData.other_cancer}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Depresyon"
          name="depression"
          id="depression"
          rows="1"
          value={formData.depression}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Diyabet"
          name="diabetes"
          id="diabetes"
          rows="1"
          value={formData.diabetes}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Artrit"
          name="arthritis"
          id="arthritis"
          rows="1"
          value={formData.arthritis}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormTextArea
          label="Sigara Tüketimi"
          name="smoking_history"
          id="smoking_history"
          rows="1"
          value={formData.smoking_history}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <FormInput
          label="Alkol Tüketimi"
          type="number"
          name="alcohol_consumption"
          value={formData.alcohol_consumption}
          onChange={handleInputChange}
          min="0"
        />
        <FormInput
          label="Meyve Tüketimi"
          type="number"
          name="fruit_consumption"
          value={formData.fruit_consumption}
          onChange={handleInputChange}
          min="0"
        />
      </div>
      <div className="row mb-4">
        <FormInput
          label="Yeşil Sebze Tüketimi"
          type="number"
          name="green_vegetable_consumption"
          value={formData.green_vegetable_consumption}
          onChange={handleInputChange}
          min="0"
        />
        <FormInput
          label="Kızartma Tüketimi"
          type="number"
          name="fried_potato_consumption"
          value={formData.fried_potato_consumption}
          onChange={handleInputChange}
          min="0"
        />
      </div>
      <button type="submit">Kaydet</button>
    </form>
  );
};

export default HealthForm;
