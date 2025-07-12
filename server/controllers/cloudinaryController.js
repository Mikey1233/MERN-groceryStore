const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // no NEXT_PUBLIC prefix on backend
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signedUpload = async (req, res) => {
  try {
    const { folder } = req.body;

    if (!folder) {
      return res.status(400).json({ error: "folder is required" });
    }

    // ✅ Use server time for timestamp
    const timestamp = Math.floor(Date.now() / 1000); // current UNIX time in seconds

    const paramsToSign = {
      folder,
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    // ✅ Return signature + timestamp to frontend
    res.status(200).json({
      signature,
      timestamp,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUpload = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ error: "publicId is required" });
    }
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ message: "Image deleted successfully" });
    if (result.result !== "ok") {
      return res
        .status(500)
        .json({ error: "Failed to delete image from Cloudinary" });
    }
  } catch (err) {
    console.error("Cloudinary deletion error:", err);
    res.status(500).json({ error: "Server error while deleting image" });
  }
};
module.exports = { signedUpload, deleteUpload };
