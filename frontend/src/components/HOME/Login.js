import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";

const Login = () => {
  const [role, setRole] = useState(""); // Role selection
  const [regNo, setRegNo] = useState(""); // Changed from rollNumber
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors

    if (!role || !regNo || !dob) {
      setError("All fields are required!");
      return;
    }

 

    try {
      if (role === "Faculty") {
        const response = await fetch("http://localhost:5000/api/faculty/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reg_no: regNo, dob }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Faculty Login Successful ✅");
          localStorage.setItem("faculty", JSON.stringify(data));
          navigate("/faculty-dashboard"); // Redirect to faculty dashboard
        } else {
          setError(data.message || "Invalid credentials!");
        }
      } else if (role === "Student") {
        const response=await fetch("http://localhost:5000/api/student/login",{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reg_no: regNo, dob }),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Student Login Successful ✅");
          localStorage.setItem("student", JSON.stringify(data));
          navigate("/student-dashboard"); // Redirect to faculty dashboard
        } else {
          setError(data.message || "Invalid credentials!");
        }

      }
    } catch (err) {
      setError("Network error! Please try again later.");
    }
  };

  return (
    <div className="login-page">
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
  
          <label>Registration Number:</label>
          <input
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter Registration Number"
          />
  
          <label>Password (DOB - DDMMYY):</label>
          <input
            type="password"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter DOB (DDMMYY)"
          />
  
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
  
};

export default Login;