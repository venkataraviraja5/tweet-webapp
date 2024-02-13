const express = require("express")
const router = express.Router()
const auth = require("../controllers/auth")
const {check} = require("express-validator")

router.post("/signup",[
    check('email').isEmail().withMessage("Enter EmailId")
],auth.signup)
router.post("/login",[
    check('email').isEmail().withMessage("Enter EmailId")
],auth.login)

module.exports = router