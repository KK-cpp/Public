import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      });

      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      alert('Login successful');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        alert('Login failed: Invalid credentials');
      } else {
        alert('Login failed: Network or Server Error');
      }
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', marginTop: '80px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: '15px', padding: '10px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <button onClick={handleLogin} style={{ padding: '10px', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Login
      </button>
    </div>
  );
}

export default Login;


