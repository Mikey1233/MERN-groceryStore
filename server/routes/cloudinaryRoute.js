const express = require("express")

const router = express.Router()
// const signedUpload = require("../controllers/cloudinaryController")
const signedUpload = require("../controllers/cloudinaryController")

router.post("/upload",signedUpload)
module.exports = router 