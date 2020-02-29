const express = require("express");
const router = express.Router();

const prestamosController = require("../controllers/prestamosController");

router.get("/", prestamosController.list);

module.exports = router;
