const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    min: "2",
    max: "100",
  },
  email: {
    type: "string",
    required: true,
    max: "50",
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    min: "5",
  },
  city: String,
  state: String,
  country: String,
  occupation: String,
  phoneNumber: String,
  transaction: String,
  role: {
    type: "string",
    enum: ["user", "admin", "superadmin"],
    default: "admin",
  },
}, {timestamps: true});


const User = mongoose.model("User", userSchema);

module.exports = User;