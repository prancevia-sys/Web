const express = require("express");
const { generateUploadUrl } = require("../controllers/uploadController");

const router = express.Router();

router.post("/generate-upload-url", generateUploadUrl);

module.exports = router;
