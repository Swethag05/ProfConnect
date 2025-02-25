import React, { useState } from "react";
import "../css/student.css";

const Student = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [semester, setSemester] = useState("1"); // Default semester is 1

  // Student details (Normally fetched from an API, but hardcoded here)
  const student = {
    name: "Princy",
    reg_no: 71,
    batch: "22-26",
    semester: 6,
    department: "Computer Science",
    profilepic: "/princy.jpg", // Ensure the image is in the public folder
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Student Panel</h2>
        <button onClick={() => setSelected("Dashboard")}>
          <img src="/dashboard.png" alt="Dashboard" className="icon" /> Dashboard
        </button>
        <button onClick={() => setSelected("Attendance Details")}>
          <img src="/attendance.jpeg" alt="Attendance" className="icon" /> Attendance Details
        </button>
        <button onClick={() => setSelected("Mark Details")}>
          <img src="/markdetails.png" alt="Mark Details" className="icon" /> Mark Details
        </button>
        <button onClick={() => setSelected("Profile")}>
          <img src="/profile.jpeg" alt="Profile" className="icon" /> Profile
        </button>
        <button onClick={() => setSelected("Personal Details")}>
          <img src="/personaldetails.jpeg" alt="Personal Details" className="icon" /> Personal Details
        </button>
        <button onClick={() => setSelected("Timetable")}>
          <img src="/timetable.png" alt="Timetable" className="icon" /> Timetable
        </button>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>{selected}</h1>

        {/* Profile Section */}
        {selected === "Profile" ? (
          <div>
            <img
              src={student.profilepic}
              alt="Profile Pic"
              className="profile-pic"
              onError={(e) => (e.target.style.display = "none")} // Hide image if not found
              style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
            />
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Reg No:</strong> {student.reg_no}</p>
            <p><strong>Batch:</strong> {student.batch}</p>
            <p><strong>Semester:</strong> {student.semester}</p>
            <p><strong>Department:</strong> {student.department}</p>
          </div>
        ) : selected === "Timetable" ? (
          // Timetable Section
          <div>
            <label htmlFor="semester">Select Semester: </label>
            <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
              <option value="1">I</option>
              <option value="2">II</option>
              <option value="3">III</option>
              <option value="4">IV</option>
              <option value="5">V</option>
              <option value="6">VI</option>
              <option value="7">VII</option>
              <option value="8">VIII</option>
            </select>

            <p>Showing timetable for Semester {semester}:</p>
            <img
              src={`/sem${semester}.png`}
              alt={`Semester ${semester} Timetable`}
              style={{ width: "100%", height: "auto" }}
              onError={(e) => (e.target.style.display = "none")} // Hide if image not found
            />
          </div>
        ) : (
          <p>Welcome to the {selected} section.</p>
        )}
      </div>
    </div>
  );
};

export default Student;