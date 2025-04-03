const express = require("express");
const router = express.Router();
const resort = require("../Controller/resort");

router.get("/get_resorts", resort.get_resorts);
router.get("/get_resort/:id", resort.get_resort_by_id);
router.post("/create_resort", resort.create_resort);
router.post("/update_resort/:id", resort.update_resort);
router.delete("/delete_resort/:id", resort.delete_resort);

module.exports = router;
