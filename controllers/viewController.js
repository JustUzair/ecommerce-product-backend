const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");
const User = require("./../models/userModel");
const Product = require("./../models/productModel");

const { readdir } = require("fs");
const crypto = require("crypto");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  //Renders all the users with role = artist
  console.log(req.params);
  const userId = req.params.id;
  const role = req.params.role;
  if (userId === undefined) {
    res.status(200).render("products", {
      title: "All Products",
      products: [],
    });
  }

  // check if userId exists
  if (userId) {
    // check current user role
    if (role !== "admin") {
      return new AppError("You are not the owner!!", 400);
    }
    // if admin, get data
    const products = role === "admin" && (await Product.find({}));

    // console.log(userId);
    // render template named `products.pug`
    res.status(200).render("products", {
      title: "All Products",
      products,
    });
  }
});
