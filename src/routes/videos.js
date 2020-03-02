const express = require("express");
const router = express.Router();

const videoController = require("../controllers/videoController");
//const prestamosCarritoController = require("../controllers/prestamosCarritoController");

router.get("/", videoController.list);
//router.get("/carrito", prestamosCarritoController.list);
//router.get("/agregar_carrito/:id", prestamosCarritoController.list);
module.exports = router;