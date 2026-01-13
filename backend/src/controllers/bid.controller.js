import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { getIO, getUserSocketId } from "../socket.js";


export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() === req.userId) {
      return res.status(403).json({ message: "You cannot bid on your own gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.userId,
      message,
      price,
    });

    return res.status(201).json(bid);
  } catch (error) {
    // Handle duplicate bid error
    if (error.code === 11000) {
      return res.status(409).json({ message: "You have already bid on this gig" });
    }

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const bids = await Bid.find({ gigId }).sort({ createdAt: -1 });

    return res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};




export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== req.userId) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Access denied" });
    }

    if (gig.status !== "open") {
      await session.abortTransaction();
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 1. Mark gig as assigned
    gig.status = "assigned";
    await gig.save({ session });

    // 2. Mark selected bid as hired
    bid.status = "hired";
    await bid.save({ session });

    // 3. Reject all other bids
    await Bid.updateMany(
      {
        gigId: gig._id,
        _id: { $ne: bid._id },
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Emit real-time notification to hired freelancer
    try {
    const io = getIO();
    const freelancerSocketId = getUserSocketId(bid.freelancerId.toString());

    if (freelancerSocketId) {
    io.to(freelancerSocketId).emit("hired", {
      gigId: gig._id,
      message: "You have been hired for a gig!",
    });
    }
    } catch (e) {
    // Socket failure should not break hiring
    console.error("Socket emit failed:", e.message);
   }


    return res.status(200).json({
      message: "Bid hired successfully",
      hiredBidId: bid._id,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.userId })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
