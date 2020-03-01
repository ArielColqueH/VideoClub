const express = require("express");
const router = express.Router();

const prestamosController = require("../controllers/prestamosController");
const prestamosCarritoController = require("../controllers/prestamosCarritoController");

router.get("/", prestamosController.list);
router.get("/carrito", prestamosCarritoController.list);

module.exports = router;
