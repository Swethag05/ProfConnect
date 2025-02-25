const db = require("../db");
const util = require("util");

// Convert db.query to use Promises
const query = util.promisify(db.query).bind(db);

// Faculty Login
const loginStudent = async (req, res) => {
    try {
        const { reg_no, dob } = req.body;

        if (!reg_no || !dob) {
            return res.status(400).json({ success: false, message: "Registration number and DOB are required!" });
        }

        // Check if faculty exists
        const sql = "SELECT * FROM Students WHERE reg_no = ?";
        const result = await query(sql, [reg_no]);

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        const student= result[0];

        // Ensure the DOB format matches the database
        if (student.dob !== dob) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" });
        }

        return res.json({
            success: true,
            message: "Login Successful ✅",
            student: {
                id: student.id,
                name: student.name,
                reg_no: student.reg_no,
                batch: student.batch,
                semester: student.semester,
                department: student.department,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { loginStudent};