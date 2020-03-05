const express = require("express");
const router = express.Router();

const clientsController = require("../controllers/clientsController");

router.get("/", clientsController.list);
router.get("/update/:id", clientsController.edit);
router.post("/update/:id", clientsController.update);

module.exports = router;
