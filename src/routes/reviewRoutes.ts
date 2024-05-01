import express from "express";

import { getReviews, getReviewsById, createReview, updateReview, deleteReview } from "../controllers/reviewController";

const router = express.Router();

router.get("/reviews", getReviews);
router.get("/reviews/:id", getReviewsById);
router.post("/reviews", createReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

module.exports = router;