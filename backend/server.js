const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath)); // отдаем стили и картинки

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/api/reviews", (req, res) => {
  res.json([
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
  ]);
});

const distPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(distPath));

app.get(/^\/(?!api|$).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
