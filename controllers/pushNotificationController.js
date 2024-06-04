const axios = require("axios");

const pushNotificationController = async (req, res) => {
  const { expoPushToken, message } = req.body;

  if (!expoPushToken || !message) {
    return res
      .status(400)
      .json({ error: "expoPushToken and message are required" });
  }

  try {
    const response = await axios.post("https://exp.host/--/api/v2/push/send", {
      to: expoPushToken,
      sound: "default",
      body: message,
    });

    if (response.status === 200) {
      res.status(200).json({ success: true, data: response.data });
    } else {
      res.status(response.status).json({ error: response.data });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to send push notification",
      details: error.message,
    });
  }
};

module.exports = pushNotificationController;
