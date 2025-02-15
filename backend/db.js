const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gswetha@2005",
    database: "sam",
});

// Check Connection
db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to MySQL Database!");
  });
  
  module.exports = db;
