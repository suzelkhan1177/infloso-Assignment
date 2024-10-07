import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/css/login.css';

function ResetPassword() {
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      const errorMessage = 'Password and confirm password do not match.';
      setMessage(errorMessage);
      alert(errorMessage);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/resetPassword/${token}`, {
        newPassword,
        confirmPassword,
      });
      setMessage(response.data.message);
      alert('Password reset successful!');
      navigate('/');
    } catch (error) {
      console.error('Error during password reset:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      setMessage(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <h2>Reset Password</h2>
        <form className="login-form" onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
