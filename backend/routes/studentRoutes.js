const express = require("express");
const router = express.Router();
const { loginStudent} = require("../controllers/studentController");



router.post("/login", loginStudent);

module.exports = router;