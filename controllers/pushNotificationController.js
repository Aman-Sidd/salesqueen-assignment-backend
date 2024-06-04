const axios = require("axios");

const pushNotificationController = async (req, res) => {
  const { requestObject } = req.body;

  if (!requestObject) {
    return res.status(400).json({ error: "requestObject is required" });
  }

  try {
    const pushTokenConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      requestObject,
      pushTokenConfig
    );

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
