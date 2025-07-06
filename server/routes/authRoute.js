const express = require('express');
const router  = express.Router();
const {registerUser,loginUser} = require("../controllers/AuthController")

// const { protect } = require('../middlewares/auth.middleware');

router.post('/register', registerUser);
router.post('/login',    loginUser);
// router.get('/me',protect, getMe);

module.exports = router;
