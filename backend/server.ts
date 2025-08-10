import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { utils, writeFile } from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/api/reviews", (_req: Request, res: Response) => {
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

app.use(express.json({ limit: "2mb" }));

app.post("/api/export", (req: Request, res: Response) => {
  try {
    const products = req.body.products;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }

    const sheet = utils.json_to_sheet(
      products.map((p) => ({
        ID: p.id,
        Name: p.name,
        Price: p.price,
        SKU: p.sku,
      }))
    );

    const wb = utils.book_new();
    utils.book_append_sheet(wb, sheet, "Products");

    const filePath = join(tmpdir(), `export-${Date.now()}.xlsx`);
    writeFile(wb, filePath);

    res.download(filePath, "selected-products.xlsx", (err) => {
      if (!err) unlinkSync(filePath);
    });
  } catch (err) {
    console.error("Export failed", err);
    res.status(500).json({ error: "Failed to export" });
  }
});


const distPath = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(distPath));

app.get(/^\/(?!api|$).*/, (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
