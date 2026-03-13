const Application = require("../models/Application");
const adminEmailTemplate = require("../emails/adminEmailTemplate");
const sendEmail = require("../utils/sendEmail");

/**
 * ---------------------------------------------------------
 * This controller:
 * 1. Normalizes IndustrySegments input
 * 2. Handles "Other" industry logic safely
 * 3. Maps Google Cloud Storage file metadata
 * 4. Creates a new Application document in MongoDB
 * ---------------------------------------------------------
 */

const createApplication = async (req, res) => {
  try {
    // -------------------------------------------------
    // 1️. Normalize IndustrySegments
    // Ensures value is always an array (even if single value sent)
    // -------------------------------------------------
    let IndustrySegments = req.body.IndustrySegments || [];

    if (!Array.isArray(IndustrySegments)) {
      IndustrySegments = [IndustrySegments];
    }

    // Trim custom industry input (if provided)
    const otherIndustry = req.body.otherIndustry?.trim();

    // -------------------------------------------------
    // 2️. Handle "Other" Industry Selection
    // If user selects "Other", replace it with custom value
    // -------------------------------------------------
    if (IndustrySegments.includes("Other")) {
      IndustrySegments = IndustrySegments.filter(
        (segment) => segment !== "Other",
      );

      if (otherIndustry) {
        IndustrySegments.push(otherIndustry);
      }
    }

    // Remove duplicate values (data integrity)
    IndustrySegments = [...new Set(IndustrySegments)];

    // -------------------------------------------------
    // 3️. Map Google Cloud Storage File Metadata
    // Converts frontend file object into schema-compatible format
    // -------------------------------------------------

    const bucketName = process.env.GCS_BUCKET_NAME;

    /**
     * Maps frontend file structure to gcsFileSchema
     *  - File metadata received from frontend
     */
    const mapFile = (file) => {
      if (!file) return null;

      return {
        bucket: bucketName, // GCS bucket name
        objectName: file.fileName, // Unique object path in GCS
        fileName: file.originalName, // Original uploaded file name
        fileUrl: file.fileUrl, // Public file link
        contentType: file.type, // MIME type
        size: file.size, // File size in bytes
      };
    };

    // -------------------------------------------------
    // 4️. Create Application Document
    // Only metadata is saved (files already uploaded to GCS)
    // -------------------------------------------------
    const application = await Application.create({
      // Applicant Information
      fullName: req.body.fullName,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,

      // Company Information
      companyName: req.body.companyName,
      organization: req.body.organization,
      yearOfStart: Number(req.body.yearOfStart),
      companyAddress: req.body.companyAddress,
      IndustrySegments,
      companyWebURL: req.body.companyWebURL,
      linkedinURL: req.body.linkedinURL,

      // Google Cloud File Metadata
      transactionProof: mapFile(req.body.transactionProof),
      threeDFile: (req.body.threeDFile || []).map(mapFile),
      twoDPlan: (req.body.twoDPlan || []).map(mapFile),
    });

    // -------------------------------------------------
    // 5️. Send Emails to Admin
    // -------------------------------------------------

    const adminHtml = adminEmailTemplate(application);

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Application Received",
      adminHtml,
    );

    // -------------------------------------------------
    // 6. Success Response
    // -------------------------------------------------
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    // -------------------------------------------------
    // 7. Error Handling
    // -------------------------------------------------
    console.error("Application Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createApplication,
};
