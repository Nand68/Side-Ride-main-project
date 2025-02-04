const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  messages:{type: [String]}

});
module.exports = mongoose.model("User", userSchema);
