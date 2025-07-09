const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
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
      cart: []
    });

    res.status(200).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage,
        // cart: [],
        token: generateToken(newUser._id, newUser.role)
      }
    });
  } catch (error) {}
};

//  const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User"); // Adjust path if needed

const loginUser = async (req, res) => {
  try {
    const { email, password, guestCart } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    // 3. Merge guestCart with user's existing cart if provided
    if (guestCart && Array.isArray(guestCart) && guestCart.length > 0) {
      // Assuming user's cart is an array of items
      const mergedCart = [...user.cart];

      guestCart.forEach((itemFromGuest) => {
        const existingItemIndex = mergedCart.findIndex(
          (item) => item.productId === itemFromGuest.productId
        );

        if (existingItemIndex !== -1) {
          // If item exists, update quantity
          mergedCart[existingItemIndex].quantity += itemFromGuest.quantity;
        } else {
          // Else, add new item
          mergedCart.push(itemFromGuest);
        }
      });

      user.cart = mergedCart;
      await user.save();
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Respond with user data
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage || null,
        cart: user.cart || [],
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error." });
  }
};


module.exports = {registerUser,loginUser}