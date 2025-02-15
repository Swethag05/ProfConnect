const express = require("express");
const router = express.Router();
const { loginFaculty, getFacultyProfile, addCourse, getMyCourses } = require("../controllers/facultyController");

// Faculty login
router.post("/login", loginFaculty);

// Get Faculty Profile
router.get("/:facultyId", getFacultyProfile);

// Add Course (Faculty selects course)
router.post("/:facultyId/add-course", addCourse);

// View Faculty's Courses
router.get("/:facultyId/my-courses", getMyCourses);

module.exports = router;
router.post("/login", (req, res) => {
    console.log("Login route hit! Request body:", req.body);
    res.json({ message: "Login route working!" });
});
