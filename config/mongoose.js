const mongoose = require("mongoose");

// connect to database
mongoose.connect("mongodb://127.0.0.1:27017/Task");

//acquire the connection(to check if it is successful)
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));

//up and runnung then print this mssg
db.once("open", function () {
  console.log("Successfully connected to the database :: MongoDb");
});
module.exports = db;
