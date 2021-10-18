const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    avatar: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

dataSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 12, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

dataSchema.methods.generateToken = function () {
  try {
    const user = this;
    const userObject = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    };
    const secretKey = process.env.JWT_SECRET;
    const jwtOptions = { expiresIn: process.env.JWT_EXPIRY };
    const token = jwt.sign(userObject, secretKey, jwtOptions);

    return token;
  } catch (err) {
    console.log(err);
  }
};

const People = new mongoose.model("People", dataSchema);

module.exports = People;
