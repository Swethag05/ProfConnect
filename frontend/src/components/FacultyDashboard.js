import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FacultyDashboard.css";

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [myCourses, setMyCourses] = useState([]); // Faculty's own courses
  const [studentsl, setStudents] = useState([]);
const [selectedCourse, setSelectedCourse] = useState(null);
const [studentModalOpen, setStudentModalOpen] = useState(false);
const [searchRegNo, setSearchRegNo] = useState(""); // Store entered reg_no
const [addMessage, setAddMessage] = useState(""); // Store success/error message

 
  const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses
  const [batch, setBatch] = useState(""); // Batch filter
  const [semester, setSemester] = useState(""); // Semester filter
  const [department, setDepartment] = useState(""); 
  const [modalOpen, setModalOpen] = useState(false);// Department filter
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve faculty details from localStorage
    const storedFaculty = localStorage.getItem("faculty");
    if (storedFaculty) {
      const facultyData = JSON.parse(storedFaculty);
      setFaculty(facultyData);

      // Fetch faculty's own courses
      fetch(`http://localhost:5000/api/faculty/${facultyData.id}/my-courses`)
        .then((response) => response.json())
        .then((data) => setMyCourses(data.courses || []))
        .catch((error) => console.error("Error fetching my courses:", error));

     
    } else {
      navigate("/");
    }
  }, [navigate]);
  const handleFilterChange = () => {
    console.log("Batch:", batch, "Semester:", semester, "Department:", department);
    
    const queryParams = new URLSearchParams();
    if (department) queryParams.append("department", department);
    if (semester) queryParams.append("semester", semester);

    fetch(`http://localhost:5000/api/faculty/${batch}/filtered-courses?${queryParams.toString()}`)
        .then((response) => response.json())
        .then((data) => setFilteredCourses(data.courses || []))
        .catch((error) => console.error("Error fetching courses:", error));
};

const handleAddCourse = async (courseId) => {
  if (!faculty) {
    console.error("No faculty data found.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/faculty/assign-course/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facultyId: faculty.id }), // Send faculty ID
    });

    const data = await response.json();
    if (data.success) {
      alert("Course assigned successfully!");

      // Refresh faculty's assigned courses
      fetch(`http://localhost:5000/api/faculty/${faculty.id}/my-courses`)
        .then((response) => response.json())
        .then((data) => setMyCourses(data.courses || []))
        .catch((error) => console.error("Error fetching my courses:", error));
      
      // Remove the assigned course from the filteredCourses list
      setFilteredCourses(filteredCourses.filter((course) => course.id !== courseId));
    } else {
      alert("Failed to assign course!");
    }
  } catch (error) {
    console.error("Error assigning course:", error);
    alert("An error occurred while assigning the course.");
  }
};

const handleStudents = (courseId) => {
  setSelectedCourse(courseId);
  setStudentModalOpen(true);
  setAddMessage(""); // Reset message on modal open

  fetch(`http://localhost:5000/api/faculty/course/${courseId}/students`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setStudents(data.students);
      } else {
        setStudents([]);
      }
    })
    .catch((error) => console.error("Error fetching students:", error));
};
const handleAddStudent = () => {
 
  if (!searchRegNo) {
    setAddMessage("Please enter a registration number.");
    return;
  }

  fetch(`http://localhost:5000/api/faculty/course/${selectedCourse}/add-student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reg_no: searchRegNo }),
  })
    .then((response) => response.json())
    .then((data) => {
      setAddMessage(data.message); 
      // Clear input field after successful addition
      // Display message (success or error)
      
      if (data.success) {
        // Refresh students list
        handleStudents(selectedCourse);
        
      }
    })
    .catch((error) => console.error("Error adding student:", error));
};


  const handleLogout = () => {
    localStorage.removeItem("faculty");
    navigate("/");
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
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
  
        {/* My Courses Section */}
        <h2 className="courses-heading">My Courses</h2>
        <ul className="course-list">
          {myCourses.length > 0 ? (
            myCourses.map((course, index) => (
              <li key={index} className="course-item">
                {course.name}
                <button className="action-btn">Enter Attendance</button>
                <button className="action-btn">Enter Marks</button>
                <button className="action-btn" onClick={() => handleStudents(course.id)}>Manage Students</button>
              </li>
            ))
          ) : (
            <p className="no-courses">No courses</p>
          )}
        </ul>
  
        {/* Add Course Button */}
        <button className="add-course-btn" onClick={() => setModalOpen(true)}>Add Course</button>
  
        {/* Modal for Filtering Courses */}
        <div className={`modal ${modalOpen ? "active" : ""}`}>
          <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
          <h2>Filter Courses</h2>
          <div className="filters">
            <select onChange={(e) => setBatch(e.target.value)}>
              <option value="">Select Batch</option>
              <option value="19-22">19-22</option>
              <option value="23-27">23-27</option>
            </select>
  
            <select onChange={(e) => setSemester(e.target.value)}>
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
  
            <select onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
  
            <button className="apply-filter-btn" onClick={handleFilterChange}>Apply Filters</button>
          </div>
  
          <div className="filtered-courses-container">
            <h2 className="courses-heading">Filtered Courses</h2>
            <ul className="course-list">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <li key={index} className="course-item">
                    {course.name}
                    <button className="add-button" onClick={() => handleAddCourse(course.id)}>➕</button>
                  </li>
                ))
              ) : (
                <p className="no-courses">No courses available</p>
              )}
            </ul>
          </div>
        </div>
  
        {/* Enrolled Students Modal (Place this before closing .main div) */}
        {studentModalOpen && (
  <div className="modal active">
    <span className="close" onClick={() => setStudentModalOpen(false)}>&times;</span>
    <h2>Enrolled Students</h2>
    
    <ul className="student-list">
      {studentsl.length > 0 ? (
        studentsl.map((student) => (
          <li key={student.id} className="student-item">
            {student.name} ({student.reg_no}) 
          </li>
        ))
      ) : (
        <p className="no-students">No students enrolled</p>
      )}
    </ul>

    {/* Add Student Section */}
    <div className="add-student-container">
      <h3>Add Student</h3>
      <input
      id="ip"
        type="text"
        placeholder="Enter Student Reg No"
        value={searchRegNo}
        onChange={(e) => setSearchRegNo(e.target.value)}
        className="input-field"
      />
      <button className="add-student-btn" onClick={handleAddStudent}>Add</button>
      {addMessage && <p className="message">{addMessage}</p>} {/* Display message */}
     
    </div>
  </div>
)}

  
      </div> 
    </div> 
  );
      
};






export default FacultyDashboard;
