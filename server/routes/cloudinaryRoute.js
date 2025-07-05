const express = require("express")

const route = express.Router()
const signedUpload = require("../controllers/cloudinaryController")

route.get("/get-signature",signedUpload)