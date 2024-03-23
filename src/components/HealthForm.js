import React, { useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
    const apiUrl = "http://localhost:8000/api/patient/update";
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );
    const bmi = (
      filteredFormData.weight / Math.pow(filteredFormData.height / 100, 2)
    ).toFixed(2);
    filteredFormData.bmi = bmi;
    filteredFormData.gender = filteredFormData.sex;
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
        throw new Error("Failed to update patient details");
      }
      onSubmit();
    } catch (error) {
      console.error("Error updating patient details:", error.message);
    }
  };

  const bloodTypeOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "0+", label: "0+" },
    { value: "0-", label: "0-" },
  ];

  const genderOptions = [
    { value: "Erkek", label: "Erkek" },
    { value: "Kadın", label: "Kadın" },
  ];

  const generalHealthOptions = [
    { value: "Poor", label: "Kötü" },
    { value: "Fair", label: "Orta" },
    { value: "Good", label: "İyi" },
    { value: "Very Good", label: "Çok İyi" },
    { value: "Excellent", label: "Mükemmel" },
  ];

  const checkupOptions = [
    { value: "Never", label: "Hiç" },
    { value: "5 or more years ago", label: "5 veya daha fazla yıl önce" },
    { value: "Within the last 5 years", label: "Son 5 yıl içinde" },
    { value: "Within the last 2 year", label: "Son iki yıl içinde" },
    { value: "Within the past year", label: "Geçen yıl içinde" },
  ];

  const yesNoOptions = [
    { value: 1, label: "Evet" },
    { value: 0, label: "Hayır" },
  ];

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="custom-header">
        <h2>Hasta Profil Detayları</h2>
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
        <FormInput
          label="Boy(cm)"
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          min="0"
          required={true}
        />
        <FormInput
          label="Kilo(kg)"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          min="0"
          required={true}
        />
        <FormInput
          label="Yaş"
          type="number"
          name="age_category"
          value={formData.age}
          onChange={handleInputChange}
          min="0"
          required={true}
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
        <FormSelect
          label="Genel Sağlık Durumu"
          options={generalHealthOptions}
          onChange={(selectedValue) =>
            handleSelectChange("general_health", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Son Sağlık Kontrolü"
          options={checkupOptions}
          onChange={(selectedValue) =>
            handleSelectChange("checkup", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Egzersiz Yapıyor Musunuz?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("exercise", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Kalp Hastalığı Var Mı?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("heart_disease", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Cilt Kanseri Var Mı?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("skin_cancer", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Diğer Kanser Var Mı?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("other_cancer", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Depresyon Var Mı?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("depression", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Diyabet Var Mı?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("diabetes", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Artrit Var Mı?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("arthritis", selectedValue)
          }
        />
      </div>
      <div className="row mb-4">
        <FormSelect
          label="Sigara Tüketiyor Musunuz?"
          options={yesNoOptions}
          onChange={(selectedValue) =>
            handleSelectChange("smoking_history", selectedValue)
          }
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
