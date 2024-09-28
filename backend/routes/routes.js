"use strict";

const express = require("express");
const router = express.Router();
const path = require("path");
const productController = require("../controllers/product-controller");
const categoryController = require("../controllers/category-controller");

// * === HTML File Serving === *
// Homepage
router.get(["/", "/home"], (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/home.html"));
});

// Products page to view all
router.get("/products", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/products.html"));
});

// Products form page to add new
router.get("/products/add", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/add-product.html"));
});

// Categories page to view all
router.get("/categories", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/categories.html"));
});

router.get("/orders", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/orders.html"));
});

router.get("/customers", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/pages/customers.html"));
});

// * === DB Interaction === *
// Get all products
router.get("/api/products", (req, res) => {
  productController.getAllProducts(req, res);
});

router.get("/api/products/join", (req, res) => {
  productController.getProductsJoinCat(req, res);
});

// Get details of a specific product
router.get("/api/products/:id", (req, res) => {
  productController.getProduct(req, res);
});

// Add a new product
router.post("/api/products", (req, res) => {
  productController.createProduct(req, res);
});

// Edit an existing product
router.put("/api/products/:id", (req, res) => {
  productController.editProduct(req, res);
});

// Delete an existing product
router.delete("/api/products/:id", (req, res) => {
  productController.deleteProduct(req, res);
});

// Get all categories
router.get("/api/categories", (req, res) => {
  categoryController.getAllCategories(req, res);
});

module.exports = router;
