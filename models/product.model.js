//Import the dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User schema and model
const ProductSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number
  },
  dropPrice: {
    type: Number
  }

});

//Export the schema
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
