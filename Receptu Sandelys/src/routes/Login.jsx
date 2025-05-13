import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Prisijungimas</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "1rem" }}>
          <label></label>
          <input
            type="text"
            placeholder="Vartotojo vardas"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              border: "2px solid black",
              borderRadius: "6px",
              padding: "0.5rem",
              fontSize: "1rem",
              outline: "none"
            }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label></label>
          <input
            type="password"
            placeholder="Slaptažodis"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              border: "2px solid black",
              borderRadius: "6px",
              padding: "0.5rem",
              fontSize: "1rem",
              outline: "none"
            }}
          />
        </div>
        <button type="submit" className="violet-button">Prisijungti</button>
      </form>
    </div>
  );
}

export default Login;

