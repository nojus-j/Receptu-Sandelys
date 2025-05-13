import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      setSuccess(true);
      setError("");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data || "Registration failed");
      setSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="login-title">Registracija</h2>
      {error && <p className="error">{error}</p>}
      {success && (
        <p className="success">
          Registration successful! Redirecting to login...
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label></label>
          <input
            type="text"
            value={username}
            placeholder="Vartotojo vardas"
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
            value={password}
            placeholder="Slaptažodis"
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
        <button className="violet-button" type="submit">Registruotis</button>
      </form>
    </div>
  );
}

export default Register;
