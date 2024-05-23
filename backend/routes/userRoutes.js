const express = require("express");
const router = express.Router();
const { userRegister, userLogin, userProfile } = require("../controllers/userController");
const {auth} = require('../middlewares/authMiddleware')

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", auth, userProfile);

module.exports = router;