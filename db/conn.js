const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {MONGODB_SUCCESS} = require('../constants/constants');
dotenv.config();

const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log(MONGODB_SUCCESS.bgRed);
});
