const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require('../config')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: (email) => {
      if (!email.includes("@")) {
        res.send({ message: "Not correct email" });
      }
    },
  },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: {type: String},
});

UserSchema.method("isPasswordValid", async function (password) {
  return bcrypt.compare(password, this.password);
});

UserSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 5);

  return next();
});

UserSchema.method("generateToken", function() {
    const date = new Date()

    date.setHours(date.getHours() + 1)

    return jwt.sign({_id: this._id, expiresIn: date}, config.secret_key, {
      expiresIn: "1h"
    })
})

UserSchema.static("isTokenValid",  function(token) {
    try {
       jwt.verify(token, config.secret_key)
        return true

    } catch (e) {
        console.warn("Validation error", e);
        return false
    }
})

module.exports = mongoose.model("user", UserSchema);
