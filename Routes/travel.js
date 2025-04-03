const express = require("express");
const router = express.Router();
const travelController = require("../Controller/travel");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../helper/middleware");
const multer = require("multer");
const path = require("path");
const uploadFilePath = path.resolve(__dirname, "../", "public/uploads");
const upload = require("../helper/multer");

router.post(
  "/createTravle",
  upload.single("image"),
  travelController.createtravel,
);
router.post(
  "/travel_verify/:travelId",
  verifyAdmin,
  travelController.travel_verify,
);
router.put("/approve_travel/:id", travelController.approve_travel)
router.get("/search_travel", travelController.search_travel);
router.get("/travel/:id", travelController.findOne);
router.put(
  "/update_travel",
  verifyToken,
  upload.single("image"),
  travelController.update_travel,
);
router.delete("/delete_travel/:travelId", travelController.delete_travel);
module.exports = router;
