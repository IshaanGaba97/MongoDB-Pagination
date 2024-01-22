const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userSchema = require("./models/userModel");

const app = express();
const port = process.env.port || 3000;

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

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
  try {
    const {
      skip = 0,
      limit = 10,
      selectionKeys = [],
      searchKeys = [],
    } = req.query;

    const selectionKeysArray = Array.isArray(selectionKeys) ? selectionKeys : [selectionKeys];
    const searchKeysArray = Array.isArray(searchKeys) ? searchKeys : [searchKeys];

    const searchString = searchKeysArray.join("");

    const query = {};

    if (searchString.length > 0) {
      // For name and email, perform a regex search on the concatenated string
      const regex = new RegExp(`^${searchString}`, "i");
      query.$or = [{ name: regex }, { email: regex }];
    }

    const users = await User.find(query).skip(parseInt(skip)).limit(parseInt(limit)).select(selectionKeysArray.join(" ")).exec();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  return res.send("Hey server");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

