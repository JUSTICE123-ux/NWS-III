const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secret = process.env.SECRET;

const getRegister = (req, res) => {
  res.send("Registration page");
  console.log("Registration page");
};

const postRegister = async (req, res) => {
  try {
    const { password } = req.body;
    const maggie = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password, maggie);
    const bread = new userModel({ ...req.body, password: hPassword });
    await bread.save();
    sendMail(req,res);
    console.log(bread);
    // return res.status(200).json({ message: "Registration successful", bread });
  } catch (error) {
    console.log(error);
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const userLogin = await userModel.findOne({ email });
    if (!userLogin) {
      console.log("User not found");
      res.status(400).json({ message: "User not found" });
    }

    const comparePass = await bcrypt.compare(password, userLogin.password);
    if (!comparePass) {
      console.log("Incorrect password");
      res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userLogin: userLogin.id }, secret, {
      expiresIn: "1h",
    });
    if (token) {
      console.log("Login successful");
      res.status(201).json({
        message: "Login successful",
        status: true,
        token: token,
      });
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const getVerify = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      console.log(decoded);
      res.status(200).json({
        message: "User checked",
        status: true,
        user: decoded,
      });
    }
  });
};

const sendMail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let emailTemplate = ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h6>Registration successful by my oga</h6>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: "justiceogbonna349@gmail.com",
    subject: "Registration welcome",
    text: "Welcome to justice blah blah",
    html: emailTemplate
  }

  transporter.sendMail(mailOptions).then((info)=>{
    console.log(info);
    return res.status(200).json({message: "Email successfully sent"})
  })
  .catch((error)=>{
    console.log(error);
    
  })
};

module.exports = { getRegister, postRegister, postLogin, getVerify, sendMail };
