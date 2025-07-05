const User = require("../models/User")
const getUser = async(req,res)=>{
    try{
     const getUser = await User.findById(req.params)
     if (!getUser) return res.status(400).json({message: "User not found"})
     return res.status(200).json({user : getUser})
    }catch(error){
        return res.status(500).json({message : error})
    }
}

module.exports = getUser