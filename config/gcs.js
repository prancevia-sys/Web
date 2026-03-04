const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "config/gcs-key.json",
});

const bucketName = "clientdatainvien";

const bucket = storage.bucket(bucketName);

module.exports = bucket;
