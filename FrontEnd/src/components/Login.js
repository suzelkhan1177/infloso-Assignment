import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', {
        usernameOrEmail,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);

      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Login Page</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
          <p className="message">
            <a href="/forgot_password">Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
