const express = require("express");
const bodyParser = require("body-parser");

// HTTP Server
const port = process.env.port || 80;
const ipAddress = "localhost";
const httpServer = `http://${ipAddress}:${port}`;

// Setup Express
const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

// Static file serving
server.use(express.static("./frontend"));

// Import and use routes
const routes = require("./routes/routes");
server.use("/", routes);

// Start the server
server.listen(port, ipAddress, () => {
  console.log(`Server Running: ${httpServer}`);
});
