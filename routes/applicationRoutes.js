const express = require("express");
const { createApplication, getApplications, deleteApplication } = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", createApplication);
router.get("/get-applications", protect, getApplications);
router.delete("/delete-application/:id", protect, deleteApplication);

module.exports = router;
