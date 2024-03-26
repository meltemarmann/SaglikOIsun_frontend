import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import FormSelect from "./FormSelect";

const PatientProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }
        const response = await fetch(
          "http://127.0.0.1:8000/api/patient/dashboard/",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
        setEditableData({
          ...data.user,
          height: data.height,
          weight: data.weight,
          blood_type: data.blood_type,
          allergies: data.allergies,
          medications: data.medications,
          general_health: data.general_health,
          checkup: data.checkup,
          exercise: data.exercise,
          skin_cancer: data.skin_cancer,
          other_cancer: data.other_cancer,
          depression: data.depression,
          diabetes: data.diabetes,
          arthritis: data.arthritis,
          age_category: data.age_category,
          smoking_history: data.smoking_history,
          alcohol_consumption: data.alcohol_consumption,
          fruit_consumption: data.fruit_consumption,
          green_vegetable_consumption: data.green_vegetable_consumption,
          fried_potato_consumption: data.fried_potato_consumption,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Authentication token not found");
      }
      const bmi = (
        editableData.weight / Math.pow(editableData.height / 100, 2)
      ).toFixed(2);
      editableData.bmi = bmi;
      const response = await fetch("http://127.0.0.1:8000/api/patient/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(editableData),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      setUpdateSuccess(true);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Hasta Profili
      </Typography>

      {editableData ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Kullanıcı Bilgileri
              </Typography>
              <Typography variant="body1">
                Kullanıcı Adı: {profileData.user.username}
              </Typography>
              <Typography variant="body1">
                E-posta: {profileData.user.email}
              </Typography>
              <Typography variant="body1">
                Ad: {profileData.user.first_name}
              </Typography>
              <Typography variant="body1">
                Soyad: {profileData.user.last_name}
              </Typography>
              <Typography variant="body1">
                Cinsiyet: {profileData.user.gender}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5" gutterBottom>
                Sağlık Bilgileri
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Boy"
                name="height"
                type="number"
                value={editableData.height}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Kilo"
                name="weight"
                type="number"
                value={editableData.weight}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Yaş"
                name="age_category"
                type="number"
                value={editableData.age_category}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Alerjiler"
                name="allergies"
                value={editableData.allergies}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Kullandığınız İlaçlar"
                name="medications"
                value={editableData.medications}
                onChange={handleInputChange}
              />
              <div className="row mb-4">
                Kan Grubu:
                <FormSelect
                  label="Kan Grubu"
                  options={bloodTypeOptions}
                  value={editableData.blood_type}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "blood_type", value } })
                  }
                />
                Genel Sağlık Durumu:
                <FormSelect
                  label="Genel Sağlık Durumu"
                  options={generalHealthOptions}
                  value={editableData.general_health}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "general_health", value },
                    })
                  }
                />
                Checkup:
                <FormSelect
                  label="Checkup"
                  options={checkupOptions}
                  value={editableData.checkup}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "checkup", value } })
                  }
                />
              </div>
              <div className="row mb-4">
                Egzersiz:
                <FormSelect
                  label="Egzersiz"
                  options={yesNoOptions}
                  value={editableData.exercise}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "exercise", value } })
                  }
                />
                Cilt Kanseri:
                <FormSelect
                  label="Cilt Kanseri"
                  options={yesNoOptions}
                  value={editableData.skin_cancer}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "skin_cancer", value },
                    })
                  }
                />
                Diğer Kanserler:
                <FormSelect
                  label="Diğer Kanserler"
                  options={yesNoOptions}
                  value={editableData.other_cancer}
                  onChange={(value) =>
                    handleInputChange({
                      target: { name: "other_cancer", value },
                    })
                  }
                />
              </div>
              <div className="row mb-4">
                Depresyon:
                <FormSelect
                  label="Depresyon"
                  options={yesNoOptions}
                  value={editableData.depression}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "depression", value } })
                  }
                />
                Diyabet:
                <FormSelect
                  label="Diyabet"
                  options={yesNoOptions}
                  value={editableData.diabetes}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "diabetes", value } })
                  }
                />
                Artrit:
                <FormSelect
                  label="Artrit"
                  options={yesNoOptions}
                  value={editableData.arthritis}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "arthritis", value } })
                  }
                />
              </div>
            </Paper>
          </Grid>

          {updateSuccess && (
            <Alert severity="success" onClose={() => setUpdateSuccess(false)}>
              Profil başarıyla güncellendi.
            </Alert>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              type="submit"
            >
              Profili Güncelle
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Profil verileri yükleniyor...</Typography>
      )}
    </Container>
  );
};

export default PatientProfile;
