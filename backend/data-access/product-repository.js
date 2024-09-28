"use strict";

const db = require("../data-access/db-connection");
const Product = require("../models/product");

/**
 * Function to get all products
 */
exports.findAll = async () => {
  const sql = `SELECT * FROM product`;
  try {
    const results = await db.promise().query(sql);
    return results;
  } catch (error) {
    throw error;
  }
};
/**
 * Function to get a specific product by its primary key (`id`)
 */
exports.findByPk = async (id) => {
  const sql = `SELECT * FROM product WHERE id = ?`;
  const parameters = [id];

  try {
    const result = await db.promise().query(sql, parameters);
    return result;
  } catch (error) {
    throw error;
  }
};
/**
 * Function to get all products joined with the category name
 */
exports.findAllJoinCat = async () => {
  const sql = `
        SELECT 
            product.*, 
            category.name AS category_name 
        FROM 
            product 
        JOIN 
            category ON product.category_id = category.id
    `;
  try {
    const results = await db.promise().query(sql);
    return results;
  } catch (error) {
    throw error;
  }
};
/**
 * Function to create a new product
 *
 * @param {Product} data
 */
exports.add = async (data) => {
  const sql = `INSERT INTO product (name, description, price, category_id, picture) VALUES (?, ?, ?, ?, ?)`;
  const parameters = [
    data.name,
    data.description,
    data.price,
    data.categoryId,
    data.picture,
  ];

  try {
    const result = await db.promise().query(sql, parameters);
    return result;
  } catch (error) {
    throw error;
  }
};
/**
 * Function to update the details of a product
 */
exports.update = async (id, data) => {
  const sql = `UPDATE product SET name = ?, description = ?, price = ?, category_id = ?, picture = ? WHERE id = ?`;
  const parameters = [
    data.name,
    data.description,
    data.price,
    data.categoryId,
    data.picture,
    id,
  ];

  try {
    const result = await db.promise().query(sql, parameters);
    return result;
  } catch (error) {
    throw error;
  }
};
/**
 * Function to delete a product
 */
exports.delete = async (id) => {
  const sql = `DELETE FROM product WHERE id = ?`;
  const parameters = [id];

  try {
    const result = await db.promise().query(sql, parameters);
    return result;
  } catch (error) {
    throw error;
  }
};
