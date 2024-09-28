"use strict";

const db = require("../data-access/db-connection");
const dbTableName = "category";

/**
 * Function to get all categories
 */
exports.findAll = async () => {
  const sql = `SELECT * FROM ${dbTableName}`;
  try {
    const results = await db.promise().query(sql);
    return results;
  } catch (error) {
    throw error;
  }
};
