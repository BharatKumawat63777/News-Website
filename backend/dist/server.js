require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
const API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
console.log("key: ", API_KEY, " ", NEWS_API_URL);
app.get("/news", async (req, res) => {
  try {
    const {
      country,
      category
    } = req.query;
    const response = await axios.get(NEWS_API_URL, {
      params: {
        country: country || "us",
        category: category || "general",
        apiKey: API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch news"
    });
  }
});
app.get("/", (req, res) => {
  res.send("hey complete");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));