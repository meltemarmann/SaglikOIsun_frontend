import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HealthForm from "./components/HealthForm";
import DoctorForm from "./components/DoctorForm";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const handleLogin = async (
    username,
    token,
    userId,
    email,
    isPatient,
    isDoctor
  ) => {
    setUser(username);
    localStorage.setItem("authToken", token);
  };

  const handleSignup = (username, authToken, userType) => {
    setUser(username);
    localStorage.setItem("authToken", authToken);
    if (userType === "patient") {
      setShowHealthForm(true);
    } else if (userType === "doctor") {
      setShowDoctorForm(true);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    try {
      const authToken = localStorage.getItem("authToken");
      console.log(authToken);
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

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>SAĞLIK OLSUN</h1>
      </div>
      {user ? (
        <div className="flex-column">
          {showHealthForm ? (
            <HealthForm onSubmit={(formData) => console.log(formData)} />
          ) : showDoctorForm ? (
            <DoctorForm onSubmit={(formData) => console.log(formData)} />
          ) : (
            <div className="flex-column">
              <p>Merhaba, {user}!</p>
              <button onClick={handleLogout}>Çıkış Yap</button>
            </div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default App;
