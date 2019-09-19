//Import the dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User schema and model
const GoogleUserSchema = new Schema({
  googleID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name Field Is Required"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pic: {
    type: String
  }
});

//Export the schema
const User = mongoose.model("GoogleUser", GoogleUserSchema);
module.exports = User;
