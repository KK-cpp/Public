import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        email,
        password,
      });
      alert("Registration successful!");
    } catch (error) {
      alert("Error during registration.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;

