"use strict";

const Category = require("../models/category");
const CategoryRepo = require("../data-access/category-repository");

exports.getAllCategories = async (_req, res) => {
  try {
    const categories = await CategoryRepo.findAll();
    res.status(200).json(categories[0]);
  } catch (error) {
    console.error("Error executing MySQL query: " + error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
