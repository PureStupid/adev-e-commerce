const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// Create the connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test DB Connection
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(`Connected to MySQL Database: ${connection.config.database}`);
});

// Export the connection so that it can be used by other scripts
module.exports = connection;
