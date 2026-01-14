import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import gigRoutes from "./routes/gig.routes.js";
import bidRoutes from "./routes/bid.routes.js";

import cookieParser from "cookie-parser";

const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);



export default app;
