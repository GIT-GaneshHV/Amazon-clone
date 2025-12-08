import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 20;

    const products = await prisma.product.findMany({
      skip,
      take,
      orderBy: { id: "asc" },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});


// Get a single product
router.get("/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

// ADD NEW PRODUCT (Admin)
router.post("/", async (req, res) => {
  try {
    const { title, price, description, stock, image } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        stock,
        image,
      },
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error adding product" });
  }
});

router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query.toLowerCase();

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } }
        ]
      }
    });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;   // <--- LAST LINE
