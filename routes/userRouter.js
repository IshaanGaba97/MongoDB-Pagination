const express = require("express");
const router = express.Router();
const findUsers = require('../controllers/userController')
const {GET_USERS_ENDPOINT} = require('../constants/constants')
router.get(GET_USERS_ENDPOINT, findUsers);

module.exports = router;

