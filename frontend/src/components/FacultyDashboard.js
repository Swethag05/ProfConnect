import React, { useEffect,useState } from "react";

import { useNavigate } from "react-router-dom";
import "../css/FacultyDashboard.css";

const Fac = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [showSemester, setShowSemester] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);

  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    // Retrieve faculty details from localStorage
    const storedFaculty = localStorage.getItem("faculty");
    if (storedFaculty) {
      setFaculty(JSON.parse(storedFaculty));
    } else {
      // If no faculty data, redirect to login
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("faculty"); // Clear session
    navigate("/"); // Redirect to login
  };

  return (
    <div className="container">
    {/* Sidebar */}
    <div className="sidebar">
      <div className="profile">
        <img 
          src={faculty?.photo ? `http://localhost:5000/uploads/${faculty.photo}` : "/default-profile.jpg"} 
          alt="Profile" 
          className="profile-img" 
        />
      </div>
      <p className="name">{faculty?.name || "Faculty Name"}</p>
      <p className="role">{faculty?.department || "Department"}</p>
    </div>
      
      {/* Main Section */}
      <div className="main">
        {/* Top Bar */}
        <div className="top-bar">
          <button className="add-course-btn" onClick={() => setShowDropdown(!showDropdown)}>
            Add Course
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Main Dropdown Menu */}
        {showDropdown && (
          <div className="dropdown">
            {/* Batch Dropdown */}
            <div className="dropdown-item" onClick={() => setShowBatch(!showBatch)}>
              Batch
            </div>
            {showBatch && (
              <div className="sub-dropdown">
                <div className="dropdown-item">2020-2024</div>
                <div className="dropdown-item">2021-2025</div>
                <div className="dropdown-item">2022-2026</div>
                <div className="dropdown-item">2023-2027</div>
                <div className="dropdown-item">2024-2028</div>
              </div>
            )}

            {/* Semester Dropdown */}
            <div className="dropdown-item" onClick={() => setShowSemester(!showSemester)}>
              Semester
            </div>
            {showSemester && (
              <div className="sub-dropdown">
                <div className="dropdown-item">I</div>
                <div className="dropdown-item">II</div>
                <div className="dropdown-item">III</div>
                <div className="dropdown-item">IV</div>
                <div className="dropdown-item">V</div>
                <div className="dropdown-item">VI</div>
                <div className="dropdown-item">VII</div>
                <div className="dropdown-item">VIII</div>
              </div>
            )}

            {/* Department Dropdown */}
            <div className="dropdown-item" onClick={() => setShowDepartment(!showDepartment)}>
              Department
            </div>
            {showDepartment && (
              <div className="sub-dropdown">
                <div className="dropdown-item">CSE</div>
                <div className="dropdown-item">EEE</div>
                <div className="dropdown-item">ECE</div>
                <div className="dropdown-item">MECH</div>
                <div className="dropdown-item">CIVIL</div>
                <div className="dropdown-item">IT</div>
              </div>
            )}
          </div>
        )
        }
        <button className="mycourse-btn">MY COURSE</button>

      </div>
    

    </div>
    
  );
};

export default Fac;