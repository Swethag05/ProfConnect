const db = require("../db");
const util = require("util");

// Convert db.query to use Promises
const query = util.promisify(db.query).bind(db);

// Faculty Login
const loginFaculty = async (req, res) => {
    try {
        const { reg_no, dob } = req.body;

        if (!reg_no || !dob) {
            return res.status(400).json({ success: false, message: "Registration number and DOB are required!" });
        }

        // Check if faculty exists
        const sql = "SELECT * FROM Faculty WHERE reg_no = ?";
        const result = await query(sql, [reg_no]);

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        const faculty = result[0];

        // Ensure the DOB format matches the database
        if (faculty.dob !== dob) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        return res.json({
            success: true,
            message: "Login Successful ✅",
            faculty: {
                id: faculty.id,
                name: faculty.name,
                reg_no: faculty.reg_no,
                email: faculty.email,
                phone: faculty.phone,
                department: faculty.department,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Get Faculty Profile
const getFacultyProfile = async (req, res) => {
    try {
        const { facultyId } = req.params;

        if (!facultyId) {
            return res.status(400).json({ success: false, message: "Faculty ID is required!" });
        }

        const sql = "SELECT * FROM Faculty WHERE id = ?";
        const result = await query(sql, [facultyId]);

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Faculty not found!" });
        }

        return res.json({
            success: true,
            faculty: result[0],
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getFilteredCourses = async (req, res) => {
    try {
        const { batch } = req.params;
        const { department, semester } = req.query; // Get query parameters

        let sql = "SELECT * FROM Courses WHERE batch = ? AND faculty_id IS NULL";
        let values = [batch];

        if (department) {
            sql += " AND department = ?";
            values.push(department);
        }

        if (semester) {
            sql += " AND semester = ?";
            values.push(semester);
        }

        const courses = await query(sql, values);

        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const assignCourseToFaculty = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { facultyId } = req.body;

        if (!facultyId) {
            return res.status(400).json({ success: false, message: "Faculty ID is required!" });
        }

        // Assign the faculty to the course
        const sql = "UPDATE Courses SET faculty_id = ? WHERE id = ?";
        await query(sql, [facultyId, courseId]);

        return res.json({ success: true, message: "Course assigned successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};





const getMyCourses = async (req, res) => {
    try {
        const { facultyId } = req.params;

        if (!facultyId) {
            return res.status(400).json({ success: false, message: "Faculty ID is required!" });
        }

        const sql = "SELECT * FROM courses WHERE faculty_id = ?";
        
        const courses = await query(sql, [facultyId]);

        return res.json({ success: true, courses });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
const getEnrolledStudents = async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.status(400).json({ success: false, message: "Course ID is required." });
    }

    try {
        const query = `
            SELECT students.reg_no, students.name
            FROM enrollments
            JOIN students ON enrollments.student_id = students.id
            WHERE enrollments.course_id = ?;
        `;

        db.query(query, [courseId], (err, results) => {
            if (err) {
                console.error("Error fetching enrolled students:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            res.status(200).json({ success: true, students: results });
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const enrollStudentInCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { reg_no } = req.body;

        if (!reg_no) {
            return res.status(400).json({ success: false, message: "Student registration number is required!" });
        }

        // Check if the student exists
        const studentQuery = "SELECT * FROM students WHERE reg_no = ?";
        const students = await query(studentQuery, [reg_no]);

        if (students.length === 0) {
            return res.status(404).json({ success: false, message: "Student not found!" });
        }

        const studentId = students[0].id;

        // Check if the student is already enrolled
        const checkEnrollmentQuery = "SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?";
        const enrollmentResult = await query(checkEnrollmentQuery, [studentId, courseId]);

        if (enrollmentResult.length > 0) {
            return res.status(400).json({ success: false, message: "Student is already enrolled in this course!" });
        }

        // Enroll the student in the course
        const enrollQuery = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
        await query(enrollQuery, [studentId, courseId]);

        return res.json({ success: true, message: "Student enrolled successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { loginFaculty, getFacultyProfile, getFilteredCourses, getMyCourses ,assignCourseToFaculty,getEnrolledStudents,enrollStudentInCourse};

