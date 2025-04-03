const multer = require("multer");
const path = require("path");
const uploadFilePath = path.resolve(__dirname, "../", "public/uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000 * 10000 * 100,
  },
});
module.exports = upload;
