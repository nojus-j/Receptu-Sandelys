import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Verify token with backend
      axios.get("http://localhost:5000/api/protected", {
        headers: { "auth-token": token },
      }).catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {username}!</h2>
      <p>This is your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
