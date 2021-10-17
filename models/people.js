const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

const People = new mongoose.model("People", dataSchema);

module.exports = People;
