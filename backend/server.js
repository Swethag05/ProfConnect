const express = require("express");
const cors = require("cors"); // Import CORS
const facultyRoutes = require("./routes/facultyRoutes"); // Import Faculty Routes

const app = express();
app.use(cors()); // Enable CORS to prevent frontend connection issues
app.use(express.json()); // Allow JSON body parsing

app.use("/api/faculty", facultyRoutes); // Mount faculty routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/uploads", express.static("uploads"));
