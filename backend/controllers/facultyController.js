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

// Faculty Adds Course
const addCourse = async (req, res) => {
    try {
        const { facultyId } = req.params;
        const { courseId } = req.body;

        if (!facultyId || !courseId) {
            return res.status(400).json({ success: false, message: "Faculty ID and Course ID are required!" });
        }

        const checkSql = "SELECT faculty_id FROM Courses WHERE id = ?";
        const existingCourse = await query(checkSql, [courseId]);

        if (existingCourse.length > 0 && existingCourse[0].faculty_id) {
            return res.status(400).json({ success: false, message: "Course already assigned to another faculty!" });
        }

        const updateSql = "UPDATE Courses SET faculty_id = ? WHERE id = ?";
        await query(updateSql, [facultyId, courseId]);

        return res.json({ success: true, message: "Course assigned successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Get Faculty's Courses
const getMyCourses = async (req, res) => {
    try {
        const { facultyId } = req.params;

        if (!facultyId) {
            return res.status(400).json({ success: false, message: "Faculty ID is required!" });
        }

        const sql = "SELECT * FROM Courses WHERE faculty_id = ?";
        const courses = await query(sql, [facultyId]);

        return res.json({ success: true, courses });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { loginFaculty, getFacultyProfile, addCourse, getMyCourses };
