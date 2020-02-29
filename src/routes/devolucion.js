const express = require("express");
const router = express.Router();

const devolucionesController = require("../controllers/devolucionesController");

router.get("/", devolucionesController.list);

module.exports = router;
