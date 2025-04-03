const express = require("express");
const router = express.Router();
const eventController = require("../Controller/event");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../helper/middleware");
const upload = require("../helper/multer");
router.post(
  "/event_verify/:eventId",
  verifyAdmin,
  eventController.event_verify,
);
router.post(
  "/createEvent",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 1000 * 100 * 10 },
    { name: "videos", maxCount: 1000 * 100 * 10 },
  ]),
  eventController.createEvent,
);
router.get("/events", eventController.find);
router.get("/allevents", eventController.get_all_events);
router.get("/get_event/:eventId", eventController.get_event);
router.get("/get_participants/:eventId", eventController.get_participants_by_eventId);
//delete particular event's particepent
router.post("/delPart", eventController.delPart);
router.post("/approve_event/:id", eventController.verify_event);

router.put(
  "/update_event/:eventId",
  verifyToken,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "images", maxCount: 1000 * 100 * 10 },
    { name: "videos", maxCount: 1000 * 100 * 10 },
  ]),
  eventController.update_event,
);
router.delete("/delete_event/:eventId", eventController.delete_event);
router.post(
  "/events/:eventId/participants",
  verifyToken,
  eventController.requestParticipant,
);
router.post(
  "/events/:eventId/:userId",
  verifyToken,
  eventController.updateParticipantStatus,
);
router.post(
  "/events/comment",
  eventController.postComments
);
router.post(
  "/events/reply",
  eventController.postReply
);

module.exports = router;
