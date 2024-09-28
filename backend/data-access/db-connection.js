const mysql = require("mysql2");

// Create the connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "adev",
  database: "e-commerce",
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
