const express = require("express");
const router = express.Router();
const { loginFaculty, getFacultyProfile, getFilteredCourses, getMyCourses, assignCourseToFaculty,getEnrolledStudents,enrollStudentInCourse } = require("../controllers/facultyController");

// Faculty login
router.post("/login", loginFaculty);

// Get Faculty Profile
router.get("/:facultyId", getFacultyProfile);

// Get Filtered Courses (faculty_id must be NULL)
router.get("/:batch/filtered-courses", getFilteredCourses);

// Get Assigned Courses
router.get("/:facultyId/my-courses", getMyCourses);

// Assign Course to Faculty
router.put("/assign-course/:courseId", assignCourseToFaculty);
router.get("/course/:courseId/students", getEnrolledStudents);
router.post("/course/:courseId/add-student", enrollStudentInCourse);


module.exports = router;
