import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  serialNumber: { type: String },
  umei_1: {type: String },
  umei_2: {type: String },
  sku: {type: String}
});

const Product = mongoose.model("Product", productSchema);

export default Product;