const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// 👇 ВАЖНО: этот маршрут должен идти первым!
app.get("/api/reviews", async (req, res) => {
  try {
    const mockReviews = [
      {
        id: 1,
        product: "Entire Store",
        rating: 5,
        review:
          "Great shopping experience! The website is fast and easy to use.",
        reviewerInfo: { name: "Anna K." },
        createDate: "2025-07-01",
      },
      {
        id: 2,
        product: "Theta Store",
        rating: 4,
        review: "Loved the design and smooth checkout. Would recommend!",
        reviewerInfo: { name: "James T." },
        createDate: "2025-07-05",
      },
      {
        id: 3,
        product: "Customer Service",
        rating: 5,
        review: "Support team helped me quickly. Very satisfied!",
        reviewerInfo: { name: "Maria S." },
        createDate: "2025-07-08",
      },
      {
        id: 4,
        product: "Customer Service",
        rating: 5,
        review: "Good store, thanks!",
        reviewerInfo: { name: "John L." },
        createDate: "2025-07-04",
      },
    ];

    res.json(mockReviews);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to fetch reviews" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Landing page running on http://localhost:${PORT}`);
});
