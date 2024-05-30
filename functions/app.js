const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const serverless = require("serverless-http");

dotenv.config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

router.get("/", (req, res) => {
  res.send("App is running..");
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
