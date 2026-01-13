import express from "express";
import { createBid,getBidsForGig,hireBid,getMyBids } from "../controllers/bid.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBid);
router.get("/me", authMiddleware, getMyBids);
router.get("/:gigId", authMiddleware, getBidsForGig);
router.patch("/:bidId/hire", authMiddleware, hireBid);


export default router;
