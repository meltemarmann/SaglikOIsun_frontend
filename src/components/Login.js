import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(
          username,
          data.token,
          data.user_id,
          data.email,
          data.is_patient,
          data.is_doctor
        );
      } else {
        setError("Kullanıcı adı veya parola hatalı");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div class="flex-column">
      <h2 className="header2">Giriş</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" className="login-label">
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            className="text-input"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password-container">
          <label htmlFor="password" className="login-label">
            Parola:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="text-input"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </div>
        </div>
        <div class="flex-column">
        <button type="submit">Giriş</button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Hesabın Yok Mu?{" "}
        <button className="link-button" onClick={onSwitchToSignup}>
          Kayıt Ol
        </button>
      </p>
    </div>
  );
};

export default Login;
