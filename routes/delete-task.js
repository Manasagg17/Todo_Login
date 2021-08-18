const express = require("express");
const router = express.Router();
const deleteTask = require("../controllers/delete-task_controller");
router.get("/", deleteTask.delete);
module.exports = router;
