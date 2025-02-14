// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());

// const API_KEY = process.env.NEWS_API_KEY;
// const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
// console.log("key: ", API_KEY, " ", NEWS_API_URL);

// app.get("/news", async (req, res) => {
//   try {
//     const { country, category } = req.query;
//     console.log("country: ", country, "category: ", category);
//     const response = await axios.get(NEWS_API_URL, {
//       params: {
//         country: country || "us",
//         category: category || "general",
//         apiKey: API_KEY,
//       },
//     });
//     console.log("Response: ", response);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch news" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send({ API_KEY });
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on port http://localhost:${PORT}`)
// );

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const NewsAPI = require("newsapi");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://news-website-1-l8x5.onrender.com",
      "http://localhost:3000",
    ],
  })
);

if (!process.env.NEWS_API_KEY) {
  console.error("❌ Missing NEWS_API_KEY in environment variables");
  process.exit(1);
}

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
console.log("News API: ", newsapi);
// Middleware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Hello Everyone");
});

// Route to get top headlines
app.get("/api/top-headlines", async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({
      sources: "bbc-news,the-verge",
      category: "business",
      language: "en",
      country: "us",
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching headlines" });
  }
});

// Route to get everything about a topic
app.get("/api/everything", async (req, res) => {
  try {
    const { query } = req.query; // Get query from request parameters
    if (!query)
      return res.status(400).json({ error: "Query parameter is required" });

    const response = await newsapi.v2.everything({
      q: query,
      domains: "bbc.co.uk,techcrunch.com",
      language: "en",
      sortBy: "relevancy",
      page: 1,
    });
    console.log("Respone Data: ", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

// Route to get sources
app.get("/api/sources", async (req, res) => {
  try {
    const response = await newsapi.v2.sources({
      category: "technology",
      language: "en",
      country: "us",
    });
    console.log("Fetch data: ", response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sources" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
