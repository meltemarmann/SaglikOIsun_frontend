import { useState, useEffect } from "react";
import ResponsiveAppBar from "../mui-components/ResponsiveAppBar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import FetchHeartDiseaseButton from "../mui-components/FetchHeartDiseaseButton";
import Chat from "../chat-components/Chat";
import MyDoctors from "./MyDoctors";
import PatientProfile from "./PatientProfile";

const PatientDashboard = ({ handleLogout }) => {
  const [patientData, setPatientData] = useState(null);
  const [showMyDoctors, setShowMyDoctors] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchPatientData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/patient/dashboard/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPatientData(data);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, []);

  const handleMyDoctorsClick = () => {
    setShowMyDoctors(true);
    setShowProfile(false); // Hide profile when showing doctors
  }

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowMyDoctors(false); // Hide doctors when showing profile
  }

  return (
    <div>
      {patientData && (
        <>
          <ResponsiveAppBar
            first_name={patientData.user.first_name}
            last_name={patientData.user.last_name}
            handleLogout={handleLogout}
            handleMyDoctorsClick={handleMyDoctorsClick}
            handleProfileClick={handleProfileClick}
            handleSaglikOlsunClick={() => {
              setShowMyDoctors(false)
              setShowProfile(false)
            }}

          />
          {showProfile && !showMyDoctors && (<PatientProfile />)}
          {showMyDoctors && !showProfile && (<MyDoctors />)}
          {!showProfile && !showMyDoctors && ( 
            <div
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h2
                style={{
                  background: "#F4D03F",
                  fontSize: "30px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {patientData.user.first_name} {patientData.user.last_name}
              </h2>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px 0 #000",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`Boy: ${patientData.height} cm`}
                    style={{
                      background: "#425BA9",
                      color: "white",
                      fontSize: "1.2rem",
                      padding: "12px",
                    }}
                  />
                  <Chip
                    label={`Kilo: ${patientData.weight} kg`}
                    style={{
                      background: "#7C42A9",
                      color: "white",
                      fontSize: "1.2rem",
                      padding: "12px",
                    }}
                  />
                  <Chip
                    label={`Vücut Kitle Endeksi: ${patientData.bmi}`}
                    style={{
                      background: "#31CF24",
                      fontSize: "1.2rem",
                      padding: "12px",
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`Kan Grubu: ${patientData.blood_type}`}
                    style={{
                      background: "#A20C0C",
                      color: "white",
                      fontSize: "1.2rem",
                      padding: "12px",
                    }}
                  />
                  <Chip
                    label={`Cinsiyet: ${patientData.user.gender}`}
                    style={{
                      background: "#BBDB4E",
                      fontSize: "1.2rem",
                      padding: "12px",
                    }}
                  />
                  <Chip
                    label={`Yaş: ${patientData.age_category}`}
                    style={{
                      background: "#10B2CF",
                      color: "white",
                      fontSize: "1.2rem",
                      padding: "12px",
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={10}>
                  <FetchHeartDiseaseButton />
                  <Chat />
                  <FetchHeartDiseaseButton />
                </Stack>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PatientDashboard;
