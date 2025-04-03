const express = require("express");
const admin = require("../Controller/admin.js");
const router = express.Router();
const upload = require("../helper/multer");

router.post("/login", admin.login)
router.post("/signup", admin.signup)
router.get("/adminUsers", admin.adminUsers)
router.post("/update_user/:id", admin.updateAdmin)
router.delete("/delete_user/:id", admin.deleteUsers)
router.get("/get_banners", admin.getBanners)
router.get("/get_banner_by_id/:id", admin.getBannerById)
router.get("/get_banner_by_page/:page", admin.getBannersByPage)
router.post("/create_banner", upload.single("image"), admin.create_banner)
router.post("/update_banner/:id", admin.update_banner)
router.delete("/delete_banner/:id", admin.deleteBanner)

module.exports = router;