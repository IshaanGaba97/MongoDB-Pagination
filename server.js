const express = require("express");
const dotenv = require("dotenv");
const router = require('./routes/userRouter');
const colors = require('colors');
require('./db/conn');

const app = express();

app.use(express.json());
app.use(router);

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgCyan);
});

