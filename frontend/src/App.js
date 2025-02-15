import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/HOME/Login";
import FacultyDashboard from "./components/FacultyDashboard"; // Faculty Dashboard

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
