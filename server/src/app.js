import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Backend is working!");
});

app.use("/api/products", productRoutes);

export default app;
