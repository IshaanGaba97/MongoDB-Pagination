const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const mongoURI = process.env.MONGO_URL;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
