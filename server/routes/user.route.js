const express = require("express");
const router = express.Router();
const {getRegister, postRegister, postLogin, getVerify, sendMail} = require("../controllers/user.controller")
const {verify} = require("jsonwebtoken")

router.get("/sign-up", getRegister),
router.post("/sign-up", postRegister),
router.post("/login", postLogin),
router.get("/verify", getVerify),
router.get("/sendMail", sendMail),

module.exports = router
