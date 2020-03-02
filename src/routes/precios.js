const express = require("express");
const router = express.Router();

const preiosController = require("../controllers/preciosController");

router.get("/", preiosController.list);

module.exports = router;