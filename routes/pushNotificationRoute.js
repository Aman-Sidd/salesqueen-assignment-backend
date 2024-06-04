const express = require("express");
const pushNotificationController = require("../controllers/pushNotificationController");

const router = express.Router();

router.post("/push-notification", pushNotificationController);

module.exports = router;
