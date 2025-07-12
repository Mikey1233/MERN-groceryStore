const express = require("express")
const ConnectDB = require("./configs/db")
const authRoutes = require("./routes/authRoute")
const imageUploadRoutes = require("./routes/cloudinaryRoute")
const app = express()
const cors = require("cors")
const corsOptions = {
  origin: ['https://big-cart-cyan.vercel.app','http://localhost:3000'], // frontend URL
   methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // allow cookies or authorization headers
};

app.use(cors(corsOptions));
app.use(express.json())
//connect db
ConnectDB()

///routes
app.use("/api/auth", authRoutes);
app.use("/api/uploadImage",imageUploadRoutes)
//auth route


module.exports = app