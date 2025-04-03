const express = require("express");
const club = require("../Controller/clubController");
const router = express.Router();
const upload = require("../helper/multer");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../helper/middleware");

router.post(
  "/create_club",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image", maxCount: 1000 * 1000 },
    { name: "video", maxCount: 1000 * 1000 },
  ]),
  club.create_club,
);
router.put("/approve_club/:id", club.approve_club);
router.put("/club_verify/:clubId", verifyAdmin, club.club_verify);
router.delete("/delete_club/:clubId", club.delete_club);
router.put(
  "/update_club/:clubId",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "image", maxCount: 1000 * 1000 },
    { name: "video", maxCount: 1000 * 1000 },
  ]),
  club.update_club,
);
router.get("/search_club", club.search_club);
router.get("/getClub/:id", club.getClub);
router.put("/bookingClub/:cludId", club.bookingClub);
router.post("/clubs/comment", club.postComments);
router.put("/clubs/comment/del", club.deleteComments);

module.exports = router;
