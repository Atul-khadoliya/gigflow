import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";

const app = express();

/**
 * ✅ CORS — must be FIRST
 * This alone handles OPTIONS preflight correctly
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/**
 * Middlewares
 */
app.use(express.json());
app.use(cookieParser());

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

export default app;
