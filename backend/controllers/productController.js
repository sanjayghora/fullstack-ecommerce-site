const Product = require("../models/productModle");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");

//Create Product ---admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all product
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({ success: true, products });
});

//Get product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update Product --admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // await product.Remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Sucessfully",
  });
});
