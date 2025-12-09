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
    const { items, total, addressId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!addressId) {
      return res.status(400).json({ message: "Address required" });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
        total: Number(total),
        status: "PENDING",
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            title: item.title,
            price: Number(item.price),
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true, address: true },
    });

    return res.json({ message: "Order placed", order });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

/**
 * GET USER ORDERS
 * GET /api/orders/my
 */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(orders);
  } catch (err) {
    console.error("ORDER FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * CANCEL ORDER
 * PUT /api/orders/cancel/:id
 */
router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const orderId = Number(req.params.id);
    const userId = req.user.userId;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.userId !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    res.json({ message: "Order cancelled", order: updated });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
