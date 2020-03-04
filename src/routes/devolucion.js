const express = require("express");
const router = express.Router();

const devolucionesController = require("../controllers/devolucionesController");

router.get("/", devolucionesController.list);
router.post("/searchWord", devolucionesController.search);

module.exports = router;
