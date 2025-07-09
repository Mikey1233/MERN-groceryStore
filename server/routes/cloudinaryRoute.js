const express = require("express")

const router = express.Router()
const {signedUpload,deleteUpload} = require("../controllers/cloudinaryController")

router.post("/upload",signedUpload)
router.post("/deleteImage",deleteUpload)
module.exports = router 