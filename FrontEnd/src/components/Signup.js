import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/signup', {
        username,
        email,
        password,
      });

      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response?.data);
      alert('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Registration Page</h2>
        <form className="register-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <p className="message">
            Already registered? <a href="/">LogIn</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
