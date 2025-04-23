const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("collection", userSchema);

module.exports = userModel;

