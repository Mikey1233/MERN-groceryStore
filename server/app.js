const express = require("express")
const ConnectDB = require("./configs/db")
const app = express()
//connect db
ConnectDB()

module.exports = app