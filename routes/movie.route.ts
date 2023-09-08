import { Router } from "express";
import MovieController from "../controllers/Movie.controller";

// Create a new router instance
export const router = Router();

// Route for creating a new movie
router.route("/newMovie").post(MovieController.newMovie);
// Route for getting all movies
router.route("/").get(MovieController.getAllMovies)
// Route for getting movies by tag
router.route("/:tag").get(MovieController.getMoviesByTag)
// Route for getting movies by genre
router.route("/:genre").get(MovieController.getMoviesByGenre)

export default router;
