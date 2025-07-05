const User = require("../models/User");
const bcrypt = require("bcryptjs");
const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImage, adminToken } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let role = "customer";
    if (adminToken && adminToken === process.env.ADMIN_TOKEN) {
      role = "admin";
    }
    //hash pwd before storing in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    ///create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPwd,
      profileImage,
      role,
    });

    res.status(200).json(
        {
         _id : newUser._id,
         name : newUser.name,
         email : newUser.email,
         role : newUser.role,
         profileImage : newUser.profileImage,
         token : generateToken(newUser._id)
        }
    )
  } catch (error) {}
};

const loginUser = async (req, res) => {};

const getUser = async (req, res) => {};
