const express = require("express");
const dotenv = require("dotenv");
const User = require("./models/userModel");
require('./db/conn');

const app = express();

dotenv.config();


app.get("/users", async (req, res) => {
    try {
      const {
        skip = 0,
        limit = 10,
        selectionKeys,
        searchKeys,
      } = req.query;

      // const searchKeysArray = Array.isArray(searchKeys) ? searchKeys : [searchKeys];
      // const searchString = searchKeysArray.join("");
      const searchString = searchKeys;

      let selectionString;
      if(selectionKeys){
        selectionString = selectionKeys.split(',').join(" ");
      }

      const query = {};
  
      if (searchString.length > 0) {
        const regex = new RegExp(`^${searchString}`, "i");
        query.$or = [{ name: regex }, { email: regex }];
      }
      const users = await User.find(query).skip(parseInt(skip)).limit(parseInt(limit)).select(selectionString).exec();
  
      return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

