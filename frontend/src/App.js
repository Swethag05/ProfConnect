import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/HOME/Login";
import FacultyDashboard from "./components/FacultyDashboard"; // Faculty Dashboard
import Student from "./components/student";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student-dashboard" element={<Student />} />
      </Routes>
    </Router>
  );
};

export default App;
