import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/forgot_password/${email}`);
      setMessage(response.data.message);
      alert('Password reset email sent. Please check your inbox.');
      navigate('/');
    } catch (error) {
      console.error('Error during password reset request:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Enter valid email, this email does not exist. Please try again.';
      setMessage(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Forgot Password</h2>
        <form className="login-form" onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="message">
          Remembered your password? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
