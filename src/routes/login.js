
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");


router.get("/", loginController.signin);
router.post("/authi",loginController.verify);
module.exports = router;
