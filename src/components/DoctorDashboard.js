import { useEffect, useState } from "react";
import ResponsiveAppBarForDoctor from "../mui-components/ResponsiveAppBarForDoctor";
import DoctorProfile from "./DoctorProfile";
import AddPatient from "./AddPatient";
import MyPatiens from "./MyPatients";
import { Stack } from "@mui/material";

const DoctorDashboard = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddPatient, setAddPatient] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/doctor/dashboard/",
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
          setDoctorData(data);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctorData();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  }

  const handleProfileClick = () => {
    setShowProfile(true);
    setAddPatient(false);
  }

  const handleAddPatientClick = () => {
    setAddPatient(true);
    setShowProfile(false);
  }

  
  return (
    <div>
      {doctorData && (
        <>
          <ResponsiveAppBarForDoctor
            first_name={doctorData.user.first_name}
            last_name={doctorData.user.last_name}
            handleLogout={handleLogout}
            handleAddPatientClick={handleAddPatientClick}
            handleProfileClick={handleProfileClick}
            handleSaglikOlsunClick={() => {
              setShowProfile(false);
              setAddPatient(false);
            }}

          />
          {showProfile && !showAddPatient && (
            <DoctorProfile
              doctorData={doctorData}
              setDoctorData={setDoctorData}
            />
          )}
          {showAddPatient && !showProfile && (
            <AddPatient />
          )}
          {!showProfile && !showAddPatient && ( 
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
                {doctorData.user.first_name} {doctorData.user.last_name}
              </h2>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
              </Stack>
              <MyPatiens />
            </div>
          )}
        </>
      )}
    </div>
  );
  
};

export default DoctorDashboard;
