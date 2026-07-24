const express = require("express");
const {
  createApplication,
  getApplications,
  deleteApplication,
  getApplicantByID,
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/apply", createApplication);
router.get("/get-applications", protect, getApplications);
router.get("/get-applicant/:id", protect, getApplicantByID);
router.delete("/delete-application/:id", protect, deleteApplication);

module.exports = router;
