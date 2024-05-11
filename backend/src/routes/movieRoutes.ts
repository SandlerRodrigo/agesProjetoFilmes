import express from "express";

import {
  createMovie,
  getMovieById,
  getMovies,
  updateMovie,
  deleteMovie,
  getMovieReviews,
  getMovieReviewsByTitle
} from "../controllers/movieController";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies/:id/reviews", getMovieReviews);
router.get("/movies/reviews/:title", getMovieReviewsByTitle);
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
