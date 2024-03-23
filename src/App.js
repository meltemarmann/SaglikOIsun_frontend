import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HealthForm from "./components/HealthForm";
import DoctorForm from "./components/DoctorForm";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isPatient, setIsPatient] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        setUser("authenticated user");

        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/is-patient/",
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
            if (data.is_patient) {
              setIsPatient(true);
            }
          } else {
            console.error("Failed to check if user is a patient");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (
    username,
    token,
    userId,
    email,
    isPatient,
    isDoctor
  ) => {
    setUser(username);
    setIsPatient(isPatient);
    localStorage.setItem("authToken", token);
  };

  const handleSignup = (username, authToken, userType) => {
    setUser(username);
    localStorage.setItem("authToken", authToken);
    if (userType === "patient") {
      setIsPatient(true);
      setShowHealthForm(true);
    } else if (userType === "doctor") {
      setShowDoctorForm(true);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await fetch("http://127.0.0.1:8000/api/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        });

        if (response.ok) {
          setUser(null);
          localStorage.removeItem("authToken");
        } else {
          console.error("Logout request failed");
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  const handleHealthFormSubmit = () => {
    setShowHealthForm(false);
    setIsPatient(true);
  };

  const handleDoctorFormSubmit = () => {
    setShowDoctorForm(false);
    setIsPatient(false);
  };

  return user ? (
    showHealthForm ? (
      <div className="app-container">
        <div className="app-header">
          <h1>SAĞLIK OLSUN</h1>
        </div>
        <HealthForm onSubmit={handleHealthFormSubmit} />
      </div>
    ) : showDoctorForm ? (
      <div className="app-container">
        <div className="app-header">
          <h1>SAĞLIK OLSUN</h1>
        </div>
        <DoctorForm onSubmit={handleDoctorFormSubmit} />
      </div>
    ) : isPatient ? (
      <PatientDashboard handleLogout={handleLogout} />
    ) : (
      <DoctorDashboard />
    )
  ) : (
    <div className="app-container">
      <div className="app-header">
        <h1>SAĞLIK OLSUN</h1>
      </div>
      <div
        className="flex-column"
        style={{
          backgroundColor: "#f8f9fa",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {showLogin ? (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={handleSwitchToSignup}
          />
        ) : (
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </div>
    </div>
  );
}

export default App;
