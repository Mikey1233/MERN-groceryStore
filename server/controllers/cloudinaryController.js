const cloudinary = require("cloudinary").v2

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // no NEXT_PUBLIC prefix on backend
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signedUpload = async (req, res) => {
  try {
    const { paramsToSign } = req.body;
    console.log(paramsToSign)

    if (!paramsToSign) {
      return res.status(400).json({ error: "paramsToSign is required" });
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({ signature });
  } catch (error) {
    console.error("Error generating signature:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = signedUpload

