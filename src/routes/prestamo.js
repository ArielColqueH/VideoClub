const express = require("express");
const router = express.Router();

const prestamosController = require("../controllers/prestamosController");
const prestamosCarritoController = require("../controllers/prestamosCarritoController");
const prestamosCarritoFacturaController = require("../controllers/prestamosCarritoFacturaController");

router.get("/", prestamosController.list);
//router.get("/",prestamosController.ddwGenre);
router.get("/carrito", prestamosCarritoController.listCart);
router.get("/carrito/total", prestamosCarritoController.total);
router.get("/carrito/calcularFactura", prestamosCarritoController.calculosFactura);
router.get("/carrito/factura", prestamosCarritoFacturaController.list);
router.post("/searchWord", prestamosController.search);
router.get("/:genre", prestamosController.searchByGenre);
router.get("/carrito/eliminar/:id", prestamosCarritoController.eliminar);
router.get("/carrito/add/:id", prestamosController.addCarrito);
//router.get("/eliminar/:id", prestamosCarritoController.eliminar);
//router.get("/agregar_carrito/:id", prestamosCarritoController.list);
//router.get("/carrito/:id", prestamosController.add_card);
//router.post('/add_card/:id',prestamosController.add_card);
module.exports = router;
