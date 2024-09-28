"use strict";

const Product = require("../models/product");
const ProductRepo = require("../data-access/product-repository");

exports.getAllProducts = async (_req, res) => {
  try {
    const products = await ProductRepo.findAll();
    res.status(200).json(products[0]);
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await ProductRepo.findByPk(req.params.id);
    if (product[0].length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product[0]);
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProductsJoinCat = async (_req, res) => {
  try {
    const products = await ProductRepo.findAllJoinCat();
    res.status(200).json(products[0]);
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, picture } = req.body;
    const newProduct = new Product(name, description, price, category, picture);
    await ProductRepo.add(newProduct);
    res.redirect("/products");
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, picture } = req.body;
    const editedProduct = new Product(
      name,
      description,
      price,
      category_id,
      picture
    );
    await ProductRepo.update(id, editedProduct);
    if (editedProduct[0].length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(editedProduct[0]);
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductRepo.delete(req.params.id);
    res.status(200).json(product[0]);
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
