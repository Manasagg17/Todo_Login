const express = require("express");
const router = express.Router();
const createTask = require("../controllers/create-task_controller");
const passport = require("passport");
router.post("/", createTask.create);
module.exports = router;
