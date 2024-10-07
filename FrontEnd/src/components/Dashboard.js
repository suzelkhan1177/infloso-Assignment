import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/styles.css';

function Dashboard() {
  // const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); 
  };

  return (
    <div className="dashboard-card">
      <h2>Welcome to the  Infloso Assignment Dashboard</h2>
      <p>This is where users can see their account details and other important information.</p>
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
