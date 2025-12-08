import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function importProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();

  const products = data.products;

  for (const p of products) {
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock || 20,
        image: p.thumbnail,
        category: p.category,
      },
    });
  }

  console.log("Products imported successfully!");
  process.exit();
}

importProducts();
