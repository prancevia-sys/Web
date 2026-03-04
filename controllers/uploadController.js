// Import configured Google Cloud Storage bucket instance
const bucket = require("../config/gcs");

// Import UUID generator to create unique file names
const { v4: uuidv4 } = require("uuid");

// ------------------------------------
// Generate Signed Upload URL Controller
// ------------------------------------
const generateUploadUrl = async (req, res) => {
  try {
    // Extract required fields from request body
    const { fileName, contentType, folder } = req.body;

    // Validate required fields
    if (!fileName || !contentType) {
      return res.status(400).json({
        success: false,
        message: "fileName and contentType are required",
      });
    }

    // Create a unique file path:
    // - Use provided folder or default to "applications"
    // - Prefix original filename with UUID to avoid name collisions
    const uniqueFileName = `${folder || "applications"}/${uuidv4()}-${fileName}`;

    // Reference the file inside the bucket
    const file = bucket.file(uniqueFileName);

    // Generate a V4 signed URL that allows client to upload (write) directly to GCS
    // The URL will expire in 15 minutes for security reasons
    const [signedUrl] = await file.getSignedUrl({
      version: "v4", // Use V4 signing (recommended)
      action: "write", // Allow upload (PUT request)
      expires: Date.now() + 60 * 60 * 1000, // 1hr expiration
      contentType, // Restrict upload to this content type
    });

    // Construct public file URL
    // This will work only if the bucket or object is public
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;

    // Send signed upload URL and file reference back to client
    return res.status(200).json({
      success: true,
      uploadUrl: signedUrl, // Client will use this URL to upload file
      fileUrl, // Public access URL (if bucket is public)
      fileName: uniqueFileName, // Store this in database for later access
    });
  } catch (error) {
    // Log detailed error for debugging
    console.error("Signed URL Error:", error);

    // Send generic error response to client
    return res.status(500).json({
      success: false,
      message: "Failed to generate upload URL",
    });
  }
};

// Export controller function
module.exports = {
  generateUploadUrl,
};
