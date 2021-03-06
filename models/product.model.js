//Import the dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create User schema and model
const ProductSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Cannot fetch product name.'
  },
  currentPrice: {
    type: Number
  },
  site: {
    type: String,
    required: true
  }

});

//Export the schema
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
