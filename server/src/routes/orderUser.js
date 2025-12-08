import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/orders/my
 * Fetch all orders of the logged-in user
 */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        address: true, // only if your schema has address relation
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ orders });
  } catch (error) {
    console.error("Get my orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
