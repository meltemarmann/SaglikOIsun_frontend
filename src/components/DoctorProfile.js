import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Authentication token not found");
        }
        const response = await fetch(
          "http://127.0.0.1:8000/api/doctor/dashboard/",
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
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Doktor Profili
      </Typography>

      {profileData ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5">
                Kullanıcı Adı: {profileData.user.username}
              </Typography>
              <Typography variant="h5">
                E-posta: {profileData.user.email}
              </Typography>
              <Typography variant="h5">
                Ad: {profileData.user.first_name}
              </Typography>
              <Typography variant="h5">
                Soyad: {profileData.user.last_name}
              </Typography>
              <Typography variant="h5">
                Uzmanlık Alanı: {profileData.speciality}
              </Typography>
              <Typography variant="h5">
                Hastane: {profileData.hospital}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Profil verileri yükleniyor...</Typography>
      )}
    </Container>
  );
};

export default DoctorProfile;
