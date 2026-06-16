const mongoose = require("mongoose");

const gcsFileSchema = new mongoose.Schema(
  {
    bucket: {
      type: String,
      required: true,
    },
    objectName: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  { _id: false },
);

const applicationSchema = new mongoose.Schema(
  {
    // Applicant Info
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },

    // Company Info
    companyName: { type: String, required: true },
    yearOfStart: { type: Number, required: true },
    companyAddress: { type: String, required: true },
    IndustrySegments: [{ type: String, required: true }],
    otherIndustry: { type: String },
    companyWebURL: { type: String },
    linkedinURL: { type: String, required: true },

    // Files (Google Cloud)
    // transactionProof: {
    //   type: gcsFileSchema,
    //   required: true,
    // },
    threeDFile: {
      type: [gcsFileSchema],
      default: [],
    },
    twoDPlan: {
      type: [gcsFileSchema],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
