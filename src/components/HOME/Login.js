import React, { useState } from "react";
import "../../css/Login.css";


const Login = () => {
  const [role, setRole] = useState(""); // Role selection
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset errors

    if (!role || !rollNumber || !password) {
      setError("All fields are required!");
      return;
    }

    // Validate Password (DOB should be exactly 6 digits)
    if (!/^\d{6}$/.test(password)) {
      setError("Password must be DOB in DDMMYY format (6 digits)");
      return;
    }

    // Simple role-based validation (Can be replaced with backend API)
    if (role === "Faculty" && rollNumber.startsWith("F")) {
      alert("Faculty Login Successful ✅");
    } else if (role === "Student" && rollNumber.startsWith("S")) {
      alert("Student Login Successful ✅");
    } else {
      setError("Invalid credentials or role mismatch!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
        </select>

        <label>Roll Number:</label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
        />

        <label>Password (DOB - DDMMYY):</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter DOB (DDMMYY)"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
