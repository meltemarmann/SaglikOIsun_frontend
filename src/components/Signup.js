import React, { useState } from 'react';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('hasta'); 

  const handleSignup = (e) => {
    e.preventDefault();
    onSignup(username, userType); 
  };

  return (
    <div>
      <h2>Kayıt</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="signup-username">Kullanıcı Adı:</label>
          <input
            type="text"
            id="signup-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-password">Parola:</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="signup-usertype">Kullanıcı Rolü:</label>
          <div>
            <label>
              <input
                type="radio"
                value="doktor"
                checked={userType === 'doktor'}
                onChange={() => setUserType('doktor')}
              />
              Doktor
            </label>
            <label>
              <input
                type="radio"
                value="hasta"
                checked={userType === 'hasta'}
                onChange={() => setUserType('hasta')}
              />
              Hasta
            </label>
          </div>
        </div>
        <div>
          <button type="submit">Kayıt Ol</button>
        </div>
      </form>
      <p>
        Hesabınız var mı?{' '}
        <button onClick={onSwitchToLogin}>Giriş Yap</button>
      </p>
    </div>
  );
};

export default Signup;
