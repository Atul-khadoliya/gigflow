import express from "express";
import { createGig,getOpenGigs} from "../controllers/gig.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createGig);
router.get("/", getOpenGigs);

export default router;
