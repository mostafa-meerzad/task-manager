const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/taskmanager");
    console.log("connected to DB");
  } catch (e) {
    console.log("something went wrong > ", e);
  }
};
