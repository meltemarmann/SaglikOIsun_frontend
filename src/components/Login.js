import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <div>
      <h2>Giriş</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Parola:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Giriş</button>
        </div>
      </form>
      <p>
        Hesabın Yok Mu?{' '}
        <button onClick={onSwitchToSignup}>Kayıt Ol</button>
      </p>
    </div>
  );
};

export default Login;
