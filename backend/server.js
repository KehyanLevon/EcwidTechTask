const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// 1. API endpoint
app.get("/api/reviews", async (req, res) => {
  try {
    const mockReviews = [
      {
        id: 1,
        product: "Entire Store",
        rating: 5,
        review: "Great shopping experience!",
        reviewerInfo: { name: "Anna K." },
        createDate: "2025-07-01",
      },
      {
        id: 2,
        product: "Theta Store",
        rating: 4,
        review: "Smooth checkout. Recommend!",
        reviewerInfo: { name: "James T." },
        createDate: "2025-07-05",
      },
      {
        id: 3,
        product: "Customer Service",
        rating: 5,
        review: "Support helped quickly.",
        reviewerInfo: { name: "Maria S." },
        createDate: "2025-07-08",
      },
    ];
    res.json(mockReviews);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch reviews" });
  }
});

// 2. Serve built Vue frontend
const distPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(distPath));

// 3. Wildcard route for Vue SPA (fix!)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
