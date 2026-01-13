import express from "express";
import { createGig,getOpenGigs,getMyGigs} from "../controllers/gig.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();



router.get("/me", authMiddleware, getMyGigs);

router.post("/", authMiddleware, createGig);
router.get("/", getOpenGigs);

export default router;
