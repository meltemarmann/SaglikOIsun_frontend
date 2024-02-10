import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css'; 


function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleSignup = (username) => {
    setUser(username);
    setShowLogin(true);
  };

  const handleLogout = () => {
    setUser(null);
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
        <div>
          <p>Welcome, {user}!</p>
          <button onClick={handleLogout}>Logout</button>
          {
            //main
          }
        </div>
      ) : (
        <div>
          {showLogin ? (
            <Login onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />
          ) : (
            <Signup onSignup={handleSignup} onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
