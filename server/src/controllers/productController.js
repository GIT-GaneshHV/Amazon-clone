import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};
