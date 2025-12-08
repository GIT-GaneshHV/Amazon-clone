import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * PLACE ORDER
 * POST /api/orders/place
 */
router.post("/place", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, totalAmount, addressId } = req.body;

    if (!addressId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
        total: totalAmount,   // FIXED
        items: {
          create: items.map((i) => ({
            productId: i.id,
            title: i.title,   // FIXED
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    res.json({ message: "Order placed", order });
  } catch (error) {
    console.error("Order place error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * USER ORDER LIST
 * GET /api/orders/my
 */
router.get("/my", authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      address: true,
    },
    orderBy: { id: "desc" },
  });

  res.json(orders);
});

export default router;
