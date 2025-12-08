import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * ADD NEW ADDRESS
 * POST /api/address/add
 */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, phone, pincode, line1, line2, city, state } = req.body;

    const address = await prisma.address.create({
      data: {
        fullName,
        phone,
        pincode,
        line1,
        line2,
        city,
        state,
        userId,
      },
    });

    res.json({ message: "Address added", address });
  } catch (error) {
    console.error("Address add error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET ALL ADDRESSES OF USER
 * GET /api/address/list
 */
router.get("/list", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    res.json(addresses);
  } catch (error) {
    console.error("Address list error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
