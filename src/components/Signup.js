import React, { useState } from "react";
import "./Signup.css";

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Parolalar eşleşmiyor.");
      return;
    }

    const user = {
      username,
      email,
      password,
      password2: confirmPassword,
    };

    try {
      const signupUrl =
        userType === "doctor"
          ? "http://127.0.0.1:8000/api/signup/doctor"
          : "http://127.0.0.1:8000/api/signup/patient";

      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        onSignup(username, data.token, userType);
        onSwitchToLogin();
      } else {
        const data = await response.json();
        if (data.username) {
          setError("Bu kullanıcı adı zaten alınmış.");
        } else if (data.email) {
          setError("Bu email adresi zaten alınmış.");
        } else {
          setError("Hesap oluşturulurken bir hata oluştu.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div>
      <h2 className="header2">Kayıt</h2>
      <form onSubmit={handleSignup}>
        <div className="flex-column">
          <label htmlFor="signup-username" className="login-label">
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            className="text-input"
            id="signup-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label htmlFor="signup-email" className="login-label">
            Email:
          </label>
          <input
            type="email"
            className="text-input"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
        <div className="password-container">
          <label htmlFor="signup-password" className="login-label">
            Parola:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="text-input"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </div>
        </div>
        </div>
        <div className="flex-column">
          <div className="password-container">
            <label htmlFor="signup-confirm-password" className="login-label">
              Parolayı Onayla:
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="text-input"
              id="signup-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="password-toggle"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </div>
          </div>
        </div>
        <div className="flex-column">
          <label htmlFor="account-type" className="login-label">
            Hesap Türü:
          </label>
          <select
            id="account-type"
            className="text-input"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="patient">Hasta</option>
            <option value="doctor">Doktor</option>
          </select>
        </div>
        <div className="flex-column">
          <button type="submit">Kayıt Ol</button>
        </div>
      </form>
      {error && <p style={{ color: "red", whiteSpace: "nowrap" }}>{error}</p>}
      <p>
        Hesabınız var mı?{" "}
        <button className="link-button" onClick={onSwitchToLogin}>
          Giriş Yap
        </button>
      </p>
    </div>
  );
};

export default Signup;
