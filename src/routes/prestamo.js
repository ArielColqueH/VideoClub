const express = require("express");
const router = express.Router();

const prestamosController = require("../controllers/prestamosController");
const prestamosCarritoController =require("../controllers/prestamosCarritoController");

router.get("/", prestamosController.list);
router.get("/carrito", prestamosCarritoController.list);
router.post("/searchWord", prestamosController.search);
//router.get("/agregar_carrito/:id", prestamosCarritoController.list);
router.get("/agregar_carrito/:id", prestamosController.add_card);
//router.post('/add_card/:id',prestamosController.add_card);
module.exports = router;
