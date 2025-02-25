const express = require("express");
const cors = require("cors");
const facultyRoutes = require("./routes/facultyRoutes"); // ✅ Correct import
const studentRoutes = require("./routes/studentRoutes"); // ✅ Correct import

const app = express();
app.use(cors());
app.use(express.json());

// Use the faculty routes correctly
app.use("/api/faculty", facultyRoutes); 

app.use("/api/student", studentRoutes); 

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
