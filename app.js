const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const pushNotificationRoute = require("./routes/pushNotificationRoute");

const cors = require("cors");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", pushNotificationRoute);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("hello"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
