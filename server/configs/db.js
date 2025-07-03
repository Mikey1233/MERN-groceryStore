const mongoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI
//function to connect app to mongoDB
const ConnectDB = async()=>{
    try {
    await mongoose.connect(MONGO_URI,{})
    console.log("Database Connected Successfully")
    
    }catch(err){
    console.log("Database connection failed",err)
    process.exit(1)
    }
}
module.exports =ConnectDB